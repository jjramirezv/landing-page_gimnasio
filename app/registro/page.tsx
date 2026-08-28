"use client";

import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { registerAction } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gradient-fuego py-3 font-heading text-sm font-bold uppercase tracking-wide text-negro-profundo shadow-glow transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
    >
      {pending ? "Creando cuenta..." : "Crear cuenta"}
    </button>
  );
}

export default function RegistroPage() {
  const [error, formAction] = useFormState(registerAction, undefined);

  return (
    <main className="grid min-h-screen place-items-center bg-negro-profundo px-4 pt-24">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-azul-oscuro/60 p-8">
        <div className="flex justify-center">
          <Image src="/images/logo.png" alt="Power Fitness Gym" width={72} height={72} className="h-16 w-16 object-contain" />
        </div>
        <h1 className="mt-4 text-center font-heading text-xl font-bold">Crear Cuenta</h1>
        <p className="mt-1 text-center text-sm text-white/50">Regístrate como socio de Power Fitness Gym</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Nombre completo</label>
            <input name="name" required className="w-full rounded-lg border border-white/15 bg-negro-profundo px-4 py-2.5 text-sm outline-none focus:border-fuego" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Correo</label>
            <input type="email" name="email" required className="w-full rounded-lg border border-white/15 bg-negro-profundo px-4 py-2.5 text-sm outline-none focus:border-fuego" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Contraseña</label>
            <input type="password" name="password" required minLength={6} className="w-full rounded-lg border border-white/15 bg-negro-profundo px-4 py-2.5 text-sm outline-none focus:border-fuego" />
          </div>

          {error && <p className="text-sm text-energia">{error}</p>}

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-fuego hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
