require("dotenv").config();

const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendForgottenPassword = (req) => {
  const body = `Bonjour ${req.user.firstname} pour modifier votre mot de passe,  <a href="http://localhost:3000/api/resetpassword/${req.user.passwordToken}">cliquez ici !</a> `;
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "origins.digital.wcs@gmail.com",
          Name: "Origins digital",
        },
        To: [
          {
            Email: req.user.email,
            Name: req.user.firstname,
          },
        ],

        TextPart: body,
        HTMLPart: `<h3>${body}</h3>`,
      },
    ],
  });
  request
    .then(() => {})
    .catch((err) => {
      console.warn(err);
    });
};

module.exports = { sendForgottenPassword };
