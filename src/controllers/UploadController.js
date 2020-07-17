const ofxparse = require('ofx-js');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');

const Movement = require("../models/Movement");
const UploadOfx = require('../models/UploadOfx');

module.exports = {
    async upload(req, res) {

        const { billId } = req.body;
        const { originalname, key, size } = req.file;
        const { companyId } = req;

        try {
            let ofx = await UploadOfx.findOne({ where: { key } });

            if (ofx) 
                return res.status(httpStatus.BAD_REQUEST).json({ error: 'OFX key already exists!' });

            ofx = await UploadOfx.create({ name: originalname, key, size, companyId, billId });

            const filePath = path.resolve(__dirname, '..', 'uploads', 'ofx', ofx.key);
            const file = fs.readFileSync(filePath, 'utf8');

            ofxparse.parse(file).then(data => {
                const transactions = data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
                
                return res.json({ 'file': ofx, 'transactions': transactions });
            }).catch( (error) => {
                return res.status(httpStatus.BAD_REQUEST).json({ error: 'An error has occurred, check your OFX file!' });
            });

        } catch (error) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
        }
    },

    async confirm(req, res) {
        const { transactions, billId } = req.body;
        const { companyId } = req;

        transactions.map(async transaction => {
            
            const movementTypeId = (transaction.TRNTYPE == 'CREDIT' ? 2 : transaction.TRNTYPE == 'DEBIT' ? 1 : 3);
            const categoryId = 1;
            const name = transaction.MEMO;
            const value = parseFloat(transaction.TRNAMT.split(',').join('.'));
            const date = `${transaction.DTPOSTED.substring(0, 4)}-${transaction.DTPOSTED.substring(4, 6)}-${transaction.DTPOSTED.substring(6, 8)}`;
            const done = true;
            const dischargeDate = date;

            await Movement.create({    
                companyId,
                billId,
                movementTypeId,
                categoryId,
                name,
                value,
                date,
                done,
                dischargeDate
            });
            
        });

        return res.json({ transactions });
    },
};


