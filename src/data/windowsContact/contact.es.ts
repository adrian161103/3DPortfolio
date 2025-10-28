import { ContactData } from "./contactTypes";

export const contactEs: ContactData = {
  title: "Contacto",
  version: "v1.0",
  fields: {
    name: {
      label: "Nombre",
      hint: "como te llamas",
      placeholder: "Ej: adrian alejos",
    },
    email: {
      label: "Email",
      hint: "coloca tu correo",
      placeholder: "Ej: ada@example.com",
    },
    message: {
      label: "Mensaje",
      hint: "Enviame un mensaje de contacto",
      placeholder: "Hola Adrian...",
    },
  },
  buttons: {
    send: "Enviar",
    sending: "Enviando...",
    clear: "Limpiar",
  },
  status: {
    idle: "Listo",
    sending: "Enviando — espere…",
    success: "Mensaje enviado. ¡Gracias!",
    error: "Error:",
  },
};
