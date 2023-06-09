const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:9000" }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //servidor de prueba
  port: 587,
  secure: false,
  auth: {
    user: "autumn.runte@ethereal.email", //usuarios falsos de prueba
    pass: "cb4Q5XG2mqmDAYSrCU",
  },
});

app.post("/send-email", (req, res) => {
  const { email, name, phone, obsv, acabado, jsonData } = req.body;
  console.log(email, name, phone, obsv, acabado, jsonData);

  const fileName = "plano" + Date.now() + ".json";
  const file = "jsonfile.json";

  fs.writeFile(file, jsonData, (err) => {
    if (err) {
      console.error("Error al guardar el objeto:", err);
      res.status(500).json({ error: "Error al guardar el objeto" });
    } else {
      const mailOptions = {
        from: "angarplanner@merkinsio.com",
        to: email,
        subject: `Plano de ${name}\n`,
        text: `\Correo:${email}\nNombre: ${name}\nTeléfono: ${phone}\n\nAcabado elegido: ${acabado}\nObservaciones:\n ${obsv}\n`,
        attachments: [
          {
            filename: fileName,
            path: file,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        fs.unlink(file, (err) => {
          if (err) {
            console.error("Error al eliminar el archivo temporal:", err);
          }
        });

        if (error) {
          console.error("Error al enviar el correo electrónico:", error);
          res
            .status(500)
            .json({ error: "Error al enviar el correo electrónico" });
        } else {
          console.log("Correo electrónico enviado:", info.response);
          res.json({ message: "Correo electrónico enviado correctamente" });
        }
      });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor de email iniciado en el puerto ${PORT}`);
});
