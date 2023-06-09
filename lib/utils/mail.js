"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = sendEmail;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendEmail(data, objetoJSON) {
  var email = data.email,
      name = data.name,
      phone = data.phone,
      obsv = data.obsv,
      acabado = data.acabado;


  var output = JSON.stringify(objetoJSON);
  var mailBody = {
    email: email,
    name: name,
    phone: phone,
    obsv: obsv,
    acabado: acabado,
    jsonData: output
  };

  _axios2.default.post("http://localhost:3000/send-email", mailBody).then(function (response) {
    console.log(response.data.message);
  }).catch(function (error) {
    console.error("Error al enviar el objeto:", error);
  });
}