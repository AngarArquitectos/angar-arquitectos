import axios from "axios";

export function sendEmail(data, objetoJSON) {
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

  axios.post("http://localhost:3000/send-email", mailBody).then(function (response) {
    console.log(response.data.message);
  }).catch(function (error) {
    console.error("Error al enviar el objeto:", error);
  });
}