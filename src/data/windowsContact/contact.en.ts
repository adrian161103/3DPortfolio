import { ContactData } from "./contactTypes";

export const contactEn: ContactData = {
  title: "Contact",
  version: "v1.0",
  fields: {
    name: {
      label: "Name",
      hint: "How would you like me to call you.",
      placeholder: "E.g: Ada Lovelace",
    },
    email: {
      label: "Email",
      hint: "We'll never share your email.",
      placeholder: "E.g: ada@example.com",
    },
    message: {
      label: "Message",
      hint: "Tell me about your project or idea.",
      placeholder: "Hi Adrián, I'm interested in working on...",
    },
  },
  buttons: {
    send: "Send",
    sending: "Sending...",
    clear: "Clear",
  },
  status: {
    idle: "Ready",
    sending: "Sending — please wait…",
    success: "Message sent. Thank you!",
    error: "Error:",
  },
};
