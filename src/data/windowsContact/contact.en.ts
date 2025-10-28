import { ContactData } from "./contactTypes";

export const contactEn: ContactData = {
  title: "Contact",
  version: "v1.0",
  fields: {
    name: {
      label: "Name",
      hint: "what's your name",
      placeholder: "E.g: adrian alejos",
    },
    email: {
      label: "Email",
      hint: "enter your email",
      placeholder: "E.g: ada@example.com",
    },
    message: {
      label: "Message",
      hint: "Send me a contact message",
      placeholder: "Hi Adrian...",
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
