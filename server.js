const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '123taca@gmail.com',
    pass: 'qjjw zxcf fzfu htix'
  }
});

app.post('/send-email', (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: '123taca@gmail.com',
    to: 'b.moises.meira@gmail.com',
    subject: 'E-Mail enviado pelo site.',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o email:', error);
      res.status(500).send('Erro ao enviar o email.');
    } else {
      console.log('Email enviado com sucesso!', info.response);
      res.status(200).send('Email enviado com sucesso!');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
