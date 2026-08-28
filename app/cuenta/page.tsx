import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const STAFF_ROLES = new Set(["ADMIN", "RECEPCION", "ENTRENADOR"]);

export default async function CuentaPage() {
  const session = await auth();
  const user = session!.user;
  const isStaff = STAFF_ROLES.has(user.role);

  return (
    <main className="min-h-screen bg-negro-profundo px-4 pb-24 pt-32">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-azul-oscuro/60 p-8">
        <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">Mi Cuenta</span>
        <h1 className="mt-2 font-heading text-2xl font-black">{user.name}</h1>
        <p className="mt-1 text-white/60">{user.email}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-white/40">Rol: {user.role}</p>

        <div className="mt-8 rounded-xl border border-white/10 bg-negro-profundo/60 p-6">
          <p className="text-sm text-white/70">
            Próximamente podrás ver aquí tu membresía, clases reservadas y recordatorios.
          </p>
        </div>

        {isStaff && (
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center rounded-full bg-gradient-fuego px-6 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow"
          >
            Ir al Panel Administrativo
          </Link>
        )}

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white/70 hover:border-fuego hover:text-fuego"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  );
}
