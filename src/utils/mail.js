import axios from "axios";

export function sendEmail(data, objetoJSON) {
  const { email, name, phone, obsv, acabado } = data;

  let output = JSON.stringify(objetoJSON);
  const mailBody = {
    email: email,
    name: name,
    phone: phone,
    obsv: obsv,
    acabado: acabado,
    jsonData: output,
  };

  axios
    .post("http://localhost:3000/send-email", mailBody)
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error("Error al enviar el objeto:", error);
    });
}
