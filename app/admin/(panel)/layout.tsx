import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

const navByRole: Record<string, { href: string; label: string }[]> = {
  ADMIN: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/planes", label: "Planes" },
    { href: "/admin/servicios", label: "Servicios" },
    { href: "/admin/entrenadores", label: "Entrenadores" },
    { href: "/admin/galeria", label: "Galería" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/inventario", label: "Inventario" },
    { href: "/admin/correos", label: "Correos" },
    { href: "/admin/usuarios", label: "Usuarios" },
    { href: "/admin/historial", label: "Historial" },
  ],
  RECEPCION: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/inventario", label: "Inventario" },
  ],
  ENTRENADOR: [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/entrenadores", label: "Entrenadores" },
  ],
  USUARIO: [{ href: "/admin", label: "Dashboard" }],
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user.role ?? "USUARIO";
  const nav = navByRole[role] ?? navByRole.USUARIO;

  return (
    <div className="flex min-h-screen bg-negro-profundo text-white">
      <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-azul-oscuro/40 p-6 lg:block">
        <div className="font-heading text-lg font-bold text-fuego">Power Fitness</div>
        <div className="text-xs text-white/40">Panel interno</div>

        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-fuego"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-4">
          <p className="text-xs text-white/40">Sesión</p>
          <p className="truncate text-sm font-semibold">{session?.user.name}</p>
          <p className="text-xs text-white/40">{role}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="mt-3 w-full rounded-lg border border-white/15 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 hover:border-fuego hover:text-fuego"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
