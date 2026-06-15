"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Activity, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userRole = (session?.user as any)?.rol;

  const NavLinks = () => {
    if (!session) {
      return (
        <>
          <Link href="/#features" className="hover:text-[#16A34A] transition-colors">Funciones</Link>
          <Link href="/#atleta" className="hover:text-[#16A34A] transition-colors">Atletas</Link>
          <Link href="/#coach" className="hover:text-[#16A34A] transition-colors">Coaches</Link>
        </>
      );
    }

    if (userRole === "ATLETA") {
      const athleteId = (session?.user as any)?.id;
      return (
        <>
          <Link href="/dashboard/atleta" className="hover:text-[#16A34A] transition-colors">Dashboard</Link>
          <Link href="/sesiones/nueva" className="hover:text-[#16A34A] transition-colors">Nueva Sesión</Link>
          <Link href={`/reportes/${athleteId}`} className="hover:text-[#16A34A] transition-colors">Mi Progreso</Link>
        </>
      );
    }

    if (userRole === "ENTRENADOR") {
      return (
        <>
          <Link href="/dashboard/entrenador" className="hover:text-[#16A34A] transition-colors">Panel Control</Link>
          <Link href="/atletas" className="hover:text-[#16A34A] transition-colors">Mis Atletas</Link>
          <Link href="/historial" className="hover:text-[#16A34A] transition-colors">Historial</Link>
          <Link href="/proyeccion" className="hover:text-[#16A34A] transition-colors">ProyecciÃ³n</Link>
          <Link href="/planes/nuevo" className="hover:text-[#16A34A] transition-colors">Crear Plan</Link>
        </>
      );
    }

    if (userRole === "ADMIN") {
      return (
        <>
          <Link href="/usuarios" className="hover:text-[#16A34A] transition-colors font-bold">Gestión Usuarios</Link>
        </>
      );
    }

    return null;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#16A34A] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
              <Activity size={24} />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Running <span className="text-[#16A34A]">Coach</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <NavLinks />
          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-none">{session.user?.name}</p>
                  <p className="text-xs text-[#16A34A] font-medium mt-1">{userRole}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Cerrar sesión"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#16A34A] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/registro"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803d] rounded-lg shadow-sm transition-all shadow-green-100"
                >
                  Registro
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-[#16A34A]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
          <div className="flex flex-col gap-4 text-sm font-medium text-gray-600">
            <NavLinks />
          </div>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            {!session && (
              <>
                <Link href="/login" className="w-full text-center py-2 text-gray-700">Login</Link>
                <Link href="/registro" className="w-full text-center py-2 bg-[#16A34A] text-white rounded-lg">Registro</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
