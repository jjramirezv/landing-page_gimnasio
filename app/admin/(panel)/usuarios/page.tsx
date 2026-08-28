import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateUserRole, deleteUser } from "./actions";

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  RECEPCION: "Recepción",
  ENTRENADOR: "Entrenador",
  USUARIO: "Socio",
};

export default async function AdminUsersPage() {
  const [session, users] = await Promise.all([
    auth(),
    prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
  ]);
  const currentUserId = session?.user.id;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Usuarios</h1>
          <p className="mt-1 text-sm text-white/50">{users.length} cuentas registradas.</p>
        </div>
        <Link href="/admin/usuarios/new" className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          + Crear cuenta de personal
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Desde</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-semibold">
                  {u.name} {u.id === currentUserId && <span className="text-xs text-fuego">(tú)</span>}
                </td>
                <td className="px-4 py-3 text-white/60">{u.email}</td>
                <td className="px-4 py-3">
                  <form action={updateUserRole} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={u.id} />
                    <select
                      name="role"
                      defaultValue={u.role}
                      disabled={u.id === currentUserId}
                      className="rounded-lg border border-white/15 bg-negro-profundo px-3 py-1.5 text-xs outline-none focus:border-fuego disabled:opacity-50"
                    >
                      {Object.entries(roleLabels).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {u.id !== currentUserId && (
                      <button type="submit" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                        Guardar
                      </button>
                    )}
                  </form>
                </td>
                <td className="px-4 py-3 text-white/40">{new Date(u.createdAt).toLocaleDateString("es")}</td>
                <td className="px-4 py-3 text-right">
                  {u.id !== currentUserId && (
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button type="submit" className="rounded-lg border border-energia/40 px-3 py-1.5 text-xs font-semibold text-energia hover:bg-energia/10">
                        Eliminar
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
