const User = require('../models/User');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../controllers/mailerModule');
const authConfig = require('../configs/auth');

module.exports = {

  async authenticate(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Credênciais incorretas!' });

      if (password != user.password)
        return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Credênciais incorretas!' });

      //generate token JWT for authenticate
      const token = jwt.sign({ 
        id: user.id, 
        companyId: user.companyId, 
        type: user.type,
        name: user.name
      }, authConfig.secret, {
        expiresIn: 86400, //expires in one day (in seconds).
      });

      return res.status(httpStatus.OK).json({ user, token });
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao se autenticar! Por favor, tente mais tarde.' });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao se autenticar! Por favor, tente mais tarde.' });

      const tokenForResetPass = crypto.randomBytes(3).toString('hex'); //new token for recovery password. Ex: 12d3m3.

      const dateExpires = new Date();
      dateExpires.setMinutes(dateExpires.getMinutes() + 30); //30 minutes for new password.

      await user.update({
        passResetToken: tokenForResetPass,
        passResetExpires: dateExpires,
        where: { email },
      });

      mailer.sendMail({
        from: 'janis.glover27@ethereal.email',
        to: email,
        subject: 'Solicitação para redefinição de senha.',
        template: 'mail-forgot-password',
        context: {
          token: tokenForResetPass
        }
      }, (err) => {
        console.log(err);
        if (err)
          return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao enviar o e-mail de recuperação! Por favor, tente mais tarde.' });

        return res.send();
      });
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro na recuperação de senha! Por favor, tente mais tarde.' });
    }
  },

  async resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Credênciais incorretas! Por favor, insira um e-mail válido.' });

      if (token !== user.passResetToken)
        return res.staRs(httpStatus.BAD_EQUEST).json({ error: 'Credênciais incorretas! Seu token expirou, por favor, tente novamente.' });

      const now = new Date();

      if (now > user.passResetExpires)
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro na autenticação! Por favor, tente mais tarde.' });

      await user.update({
        password,
        passResetToken: null,
        passResetExpires: null,
        where: { email }
      });

      res.send();
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro na recuperação de senha! Por favor, tente mais tarde.' });
    }
  },
};