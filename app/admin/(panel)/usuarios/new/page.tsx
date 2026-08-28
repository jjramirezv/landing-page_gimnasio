import { createStaffUser } from "../actions";

export default function NewStaffUserPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Crear cuenta de personal</h1>
      <form action={createStaffUser} className="mt-6 max-w-xl space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Nombre completo</label>
          <input name="name" required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Correo</label>
          <input type="email" name="email" required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Contraseña temporal</label>
          <input type="password" name="password" required minLength={6} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Rol</label>
          <select name="role" defaultValue="RECEPCION" className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego">
            <option value="ADMIN">Administrador</option>
            <option value="RECEPCION">Recepción</option>
            <option value="ENTRENADOR">Entrenador</option>
          </select>
        </div>

        <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
