import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { contactEs } from "../../../data/windowsContact/contact.es";
import { contactEn } from "../../../data/windowsContact/contact.en";
import { ContactData } from "../../../data/windowsContact/contactTypes";

// Validaciones
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateName = (name: string) => {
  const onlyLetters = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lettersCount = (onlyLetters.match(/[A-Za-zÑñÁÉÍÓÚáéíóúÜü]/g) || [])
    .length;
  return lettersCount >= 3;
};

const ui = {
  surface: "bg-gray-300 text-gray-900",
  bevel:
    "border-t border-l border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600",
  inset:
    "shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] rounded-sm",
  titlebar:
    "bg-gradient-to-r from-blue-900 to-blue-500 text-white h-16 px-4 flex items-center justify-between select-none",
  content: "p-4 md:p-5",
  font: "font-sans [font-family:Tahoma,Segoe_UI,Arial,sans-serif]",
};

function Win98Window({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section
      className={`${ui.surface} ${ui.bevel} ${ui.font} rounded-[3px] overflow-hidden`}
      role="region"
      aria-label={title}
    >
      <header className={ui.titlebar}>
        <h2 className="text-[1.75rem] font-bold">{title}</h2>
        <div className="flex items-center gap-2">{right}</div>
      </header>
      <div className={ui.content}>{children}</div>
    </section>
  );
}

function Win98Button({
  children,
  className = "",
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type={type}
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-6 py-2 text-[1.75rem] leading-none active:translate-x-0.5 active:translate-y-0.5 ${className}`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  required,
  hint,
  id,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  id: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[1.75rem] font-bold">
        {label} {required ? "*" : null}
      </label>
      <div className={`${ui.surface} ${ui.bevel} ${ui.inset} p-2`}>
        {children}
      </div>
      {hint ? <p className="text-xl opacity-80">{hint}</p> : null}
    </div>
  );
}

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function Contact() {
  const { language } = useLanguage();
  const contact: ContactData = language === "es" ? contactEs : contactEn;
  //logica de formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-bot

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [state, setState] = useState<FormState>({ status: "idle" });

  // Email receptor desde variable de entorno
  const RECEIVER_EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL as
    | string
    | undefined;
  const FORMSUBMIT_URL = RECEIVER_EMAIL
    ? `https://formsubmit.co/ajax/${RECEIVER_EMAIL}`
    : null;

  const onBlur = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  // Errores de validación
  const nameError = touched.name && !validateName(name);
  const emailError = touched.email && !validateEmail(email);
  const messageError = touched.message && message.trim().length < 10;

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setHoneypot("");
    setTouched({ name: false, email: false, message: false });
  };
  //hasta aca

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
//validacion de form
    // Marcar todos como tocados
    setTouched({ name: true, email: true, message: true });

    // Validar
    const isValid =
      validateName(name) &&
      validateEmail(email) &&
      message.trim().length >= 10;

    // Honeypot: si está lleno, es un bot
    if (honeypot) {
      resetForm();
      setState({ status: "success" });
      return;
    }

    if (!isValid) {
      setState({
        status: "error",
        message: language === "es" 
          ? "Por favor, revisa los campos marcados en rojo." 
          : "Please check the fields marked in red.",
      });
      return;
    }

    if (!FORMSUBMIT_URL) {
      setState({
        status: "error",
        message: language === "es"
          ? "Error de configuración. Contacta al administrador."
          : "Configuration error. Contact the administrator.",
      });
      return;
    }

    setState({ status: "sending" });

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Mensaje de ${name} desde Portfolio`,
          _captcha: "false",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Error ${res.status}`);
      }

      await res.json().catch(() => ({}));
      setState({ status: "success" });
      resetForm();
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : language === "es"
            ? "No se pudo enviar el mensaje. Intenta más tarde."
            : "Could not send the message. Try again later.",
      });
    }
    //hasta aca
  }

  return (
    <div className="w-full p-0">
      <Win98Window
        title={contact.title}
        right={<span className="text-2xl opacity-90">{contact.version}</span>}
      >
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Honeypot anti-bot */}
          <input
            type="text"
            name="honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <Field
            id="name"
            label={contact.fields.name.label}
            required
            hint={
              nameError
                ? language === "es"
                  ? "El nombre debe tener al menos 3 letras."
                  : "Name must have at least 3 letters."
                : contact.fields.name.hint
            }
          >
            <input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => onBlur("name")}
              aria-invalid={nameError ? "true" : "false"}
              className={`w-full bg-transparent outline-none text-[1.75rem] ${
                nameError ? "text-red-600" : ""
              }`}
              placeholder={contact.fields.name.placeholder}
              autoComplete="name"
            />
          </Field>

          <Field
            id="email"
            label={contact.fields.email.label}
            required
            hint={
              emailError
                ? language === "es"
                  ? "Ingresa un correo válido."
                  : "Enter a valid email."
                : contact.fields.email.hint
            }
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => onBlur("email")}
              aria-invalid={emailError ? "true" : "false"}
              className={`w-full bg-transparent outline-none text-[1.75rem] ${
                emailError ? "text-red-600" : ""
              }`}
              placeholder={contact.fields.email.placeholder}
              autoComplete="email"
            />
          </Field>

          <Field
            id="message"
            label={contact.fields.message.label}
            required
            hint={
              messageError
                ? language === "es"
                  ? "El mensaje debe tener al menos 10 caracteres."
                  : "Message must have at least 10 characters."
                : contact.fields.message.hint
            }
          >
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => onBlur("message")}
              aria-invalid={messageError ? "true" : "false"}
              className={`w-full bg-transparent outline-none text-[1.75rem] resize-y ${
                messageError ? "text-red-600" : ""
              }`}
              placeholder={contact.fields.message.placeholder}
            />
          </Field>

          <div className="flex items-center gap-4 pt-2">
            <Win98Button type="submit" disabled={state.status === "sending"}>
              {state.status === "sending" ? contact.buttons.sending : contact.buttons.send}
            </Win98Button>
            <Win98Button type="reset" onClick={resetForm}>
              {contact.buttons.clear}
            </Win98Button>
          </div>

          {/* Barra de estado inferior */}
          <div
            className={`${ui.surface} ${ui.bevel} ${ui.inset} mt-6 p-4 text-2xl`}
            role="status"
          >
            {state.status === "idle" && contact.status.idle}
            {state.status === "sending" && contact.status.sending}
            {state.status === "success" && contact.status.success}
            {state.status === "error" && `${contact.status.error} ${state.message}`}
          </div>
        </form>
      </Win98Window>
    </div>
  );
}
