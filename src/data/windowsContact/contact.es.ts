import { ContactData } from "./contactTypes";

export const contactEs: ContactData = {
  title: "Contacto",
  version: "v1.0",
  fields: {
    name: {
      label: "Nombre",
      hint: "Cómo te gustaría que te llame.",
      placeholder: "Ej: Ada Lovelace",
    },
    email: {
      label: "Email",
      hint: "Nunca compartiremos tu correo.",
      placeholder: "Ej: ada@example.com",
    },
    message: {
      label: "Mensaje",
      hint: "Cuéntame sobre tu proyecto o idea.",
      placeholder: "Hola Adrián, me interesa trabajar en...",
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
