const ofxparse = require('ofx-js');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');
const UploadOfx = require('../models/UploadOfx');

module.exports = {
    async upload(req, res) {

        const { bankId } = req.body;
        const { originalname, key, size } = req.file;
        const { companyId } = req;

        try {
            let ofx = await UploadOfx.findOne({ where: { key } });

            if (ofx) 
                return res.status(httpStatus.BAD_REQUEST).json({ error: 'OFX key already exists!' });

            ofx = await UploadOfx.create({ name: originalname, key, size, companyId, bankId });

            const filePath = path.resolve(__dirname, '..', 'uploads', 'ofx', ofx.key);
            const file = fs.readFileSync(filePath, 'utf8');

            ofxparse.parse(file).then(data => {
                const transactions = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

                return res.json({ 'file': ofx, 'transactions': transactions });
            }).catch( (error) => {
                return res.status(httpStatus.BAD_REQUEST).json({ error: 'An error has occurred, check your OFX file!' });
            });

        } catch (error) {
            console.log(error);
            return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
        }
    },
};


