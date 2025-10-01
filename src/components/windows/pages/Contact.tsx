import React, { useState } from "react";

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
        title="Contact"
        right={<span className="text-xs opacity-90">v1.0</span>}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            id="name"
            label="Nombre"
            required
            hint="Cómo te gustaría que te llame."
          >
            <input
              id="name"
              name="name"
              required
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Ej: Ada Lovelace"
              autoComplete="name"
            />
          </Field>

          <Field
            id="email"
            label="Email"
            required
            hint="Nunca compartiremos tu correo."
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Ej: ada@example.com"
              autoComplete="email"
            />
          </Field>

          <Field
            id="message"
            label="Mensaje"
            required
            hint="Cuéntame sobre tu proyecto o idea."
          >
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full bg-transparent outline-none text-sm resize-y"
              placeholder="Hola Adrián, me interesa trabajar en..."
            />
          </Field>

          <div className="flex items-center gap-2 pt-1">
            <Win98Button type="submit" disabled={state.status === "sending"}>
              {state.status === "sending" ? "Enviando..." : "Enviar"}
            </Win98Button>
            <Win98Button type="reset">Limpiar</Win98Button>
          </div>

          {/* Barra de estado inferior */}
          <div
            className={`${ui.surface} ${ui.bevel} ${ui.inset} mt-3 p-2 text-[12px]`}
            role="status"
          >
            {state.status === "idle" && "Listo"}
            {state.status === "sending" && "Enviando — espere…"}
            {state.status === "success" && "Mensaje enviado. ¡Gracias!"}
            {state.status === "error" && `Error: ${state.message}`}
          </div>
        </form>
      </Win98Window>
    </div>
  );
}
