import React, { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { contactEs } from "../../../data/windowsContact/contact.es";
import { contactEn } from "../../../data/windowsContact/contact.en";
import { ContactData } from "../../../data/windowsContact/contactTypes";

const ui = {
  surface: "bg-[#c0c0c0] text-[#111]",
  bevel:
    "border-t border-l border-white border-b-2 border-r-2 border-b-[#7a7a7a] border-r-[#7a7a7a]",
  inset:
    "shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#7a7a7a] rounded-[2px]",
  titlebar:
    "bg-gradient-to-r from-[#000080] to-[#1b89d6] text-white h-8 px-2 flex items-center justify-between select-none",
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
        <h2 className="text-sm font-bold">{title}</h2>
        <div className="flex items-center gap-1">{right}</div>
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
      className={`${ui.surface} ${ui.bevel} ${ui.font} px-3 py-1 text-sm leading-none active:translate-x-[1px] active:translate-y-[1px] ${className}`}
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
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-bold">
        {label} {required ? "*" : null}
      </label>
      <div className={`${ui.surface} ${ui.bevel} ${ui.inset} p-1`}>
        {children}
      </div>
      {hint ? <p className="text-[11px] opacity-80">{hint}</p> : null}
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
    <div className="w-full h-full p-0">
      <Win98Window
        title={contact.title}
        right={<span className="text-xs opacity-90">{contact.version}</span>}
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
              className="w-full bg-transparent outline-none text-sm"
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
              className="w-full bg-transparent outline-none text-sm"
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
              className="w-full bg-transparent outline-none text-sm resize-y"
              placeholder={contact.fields.message.placeholder}
            />
          </Field>

          <div className="flex items-center gap-2 pt-1">
            <Win98Button type="submit" disabled={state.status === "sending"}>
              {state.status === "sending" ? contact.buttons.sending : contact.buttons.send}
            </Win98Button>
            <Win98Button type="reset">{contact.buttons.clear}</Win98Button>
          </div>

          {/* Barra de estado inferior */}
          <div
            className={`${ui.surface} ${ui.bevel} ${ui.inset} mt-3 p-2 text-[12px]`}
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
