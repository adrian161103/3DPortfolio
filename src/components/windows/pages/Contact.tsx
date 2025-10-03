import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { contactEs } from "../../../data/windowsContact/contact.es";
import { contactEn } from "../../../data/windowsContact/contact.en";
import { ContactData } from "../../../data/windowsContact/contactTypes";

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
  
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending" });

    // Simulación de envío (reemplaza con tu lógica / endpoint)
    await new Promise((r) => setTimeout(r, 800));

    // Demostración: alterna éxito siempre
    setState({ status: "success" });
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className="w-full p-0">
      <Win98Window
        title={contact.title}
        right={<span className="text-2xl opacity-90">{contact.version}</span>}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            id="name"
            label={contact.fields.name.label}
            required
            hint={contact.fields.name.hint}
          >
            <input
              id="name"
              name="name"
              required
              className="w-full bg-transparent outline-none text-[1.75rem]"
              placeholder={contact.fields.name.placeholder}
              autoComplete="name"
            />
          </Field>

          <Field
            id="email"
            label={contact.fields.email.label}
            required
            hint={contact.fields.email.hint}
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent outline-none text-[1.75rem]"
              placeholder={contact.fields.email.placeholder}
              autoComplete="email"
            />
          </Field>

          <Field
            id="message"
            label={contact.fields.message.label}
            required
            hint={contact.fields.message.hint}
          >
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full bg-transparent outline-none text-[1.75rem] resize-y"
              placeholder={contact.fields.message.placeholder}
            />
          </Field>

          <div className="flex items-center gap-4 pt-2">
            <Win98Button type="submit" disabled={state.status === "sending"}>
              {state.status === "sending" ? contact.buttons.sending : contact.buttons.send}
            </Win98Button>
            <Win98Button type="reset">{contact.buttons.clear}</Win98Button>
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
