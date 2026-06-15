import { obtenerUsuariosPaginados } from "@/actions/usuarioActions";
import UserStatusToggle from "@/components/admin/UserStatusToggle";
import { Users, Search, Filter, ShieldCheck, Mail, Calendar } from "lucide-react";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsuariosAdminPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { usuarios, total } = await obtenerUsuariosPaginados(currentPage, 20);

  const getRoleBadge = (rol: string) => {
    switch (rol) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "ENTRENADOR":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Users className="w-8 h-8 text-emerald-600" />
             Gestión de Usuarios
          </h1>
          <p className="text-slate-500 font-medium">Audita permisos, roles y estados de acceso global.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
          <div className="px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-100 text-center min-w-[120px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="text-2xl font-black text-slate-900">{total}</p>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex justify-between items-center">
           <div className="relative group max-w-xs w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o documento..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
           </div>
           <Button variant="ghost" className="flex items-center gap-2 text-slate-500 font-bold">
              <Filter className="w-4 h-4" />
              Filtros Avanzados
           </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Usuario</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Identidad</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Rol</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuarios.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                        {user.nombre[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{user.nombre}</p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm">
                       <ShieldCheck className="w-4 h-4 text-slate-300" />
                       <span className="font-mono font-medium text-slate-600">ID: {user.documento}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-tighter ${getRoleBadge(user.rol)}`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center flex-col items-center gap-2">
                       <UserStatusToggle userId={user.id} initialValue={!!user.activo} />
                       <span className={`text-[9px] font-black uppercase tracking-tighter ${user.activo ? 'text-emerald-600' : 'text-slate-300'}`}>
                          {user.activo ? 'Activado' : 'Suspendido'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
                       <Calendar className="w-3.5 h-3.5" />
                       {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
