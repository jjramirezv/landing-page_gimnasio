"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { createLead } from "@/app/contacto/actions";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Ingresa tu nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Ingresa un email válido.";
  if (!/^[0-9+\s-]{7,}$/.test(values.phone)) errors.phone = "Ingresa un teléfono válido.";
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    try {
      await createLead(values);
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="bg-gradient-dark py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Contacto
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Empieza tu <span className="text-gradient">Transformación</span>
          </h2>
          <p className="mt-4 text-white/60">
            Escríbenos y un asesor te contactará para ayudarte a elegir el mejor plan.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-3xl border border-white/10 bg-azul-oscuro/60 p-8"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-white/80">
                  Nombre completo
                </label>
                <input
                  id="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  className="w-full rounded-xl border border-white/15 bg-negro-profundo/60 px-4 py-3 text-sm outline-none transition-colors focus:border-fuego"
                  placeholder="Tu nombre"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-energia">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white/80">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  className="w-full rounded-xl border border-white/15 bg-negro-profundo/60 px-4 py-3 text-sm outline-none transition-colors focus:border-fuego"
                  placeholder="tucorreo@ejemplo.com"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-energia">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white/80">
                  Teléfono
                </label>
                <input
                  id="phone"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  className="w-full rounded-xl border border-white/15 bg-negro-profundo/60 px-4 py-3 text-sm outline-none transition-colors focus:border-fuego"
                  placeholder="+51 999 999 999"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <p className="mt-1 text-xs text-energia">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-white/80">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange("message")}
                  className="w-full resize-none rounded-xl border border-white/15 bg-negro-profundo/60 px-4 py-3 text-sm outline-none transition-colors focus:border-fuego"
                  placeholder="Cuéntanos qué objetivo tienes en mente..."
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <p className="mt-1 text-xs text-energia">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-gradient-fuego py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-negro-profundo shadow-glow transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(155,255,59,0.55)] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-dorado">
                  ¡Gracias! Te contactaremos muy pronto.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-energia">
                  Ocurrió un error al enviar. Intenta nuevamente.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full min-h-[400px] overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="Ubicación Power Fitness Gym"
                src="https://www.google.com/maps?q=Av.+Principal+123&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
