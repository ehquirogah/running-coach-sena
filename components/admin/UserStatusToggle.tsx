"use client";

import { useTransition } from "react";
import { toast } from "react-hot-toast";
import { toggleUsuarioActivo } from "@/actions/usuarioActions";
import { Loader2 } from "lucide-react";

interface Props {
  userId: string;
  initialValue: boolean;
}

export default function UserStatusToggle({ userId, initialValue }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleUsuarioActivo(userId);
      if (result.success) {
        toast.success(result.message || "Usuario actualizado");
      } else {
        toast.error(result.error || "Error al actualizar");
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
        initialValue ? "bg-emerald-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          initialValue ? "translate-x-6" : "translate-x-1"
        } flex items-center justify-center`}
      >
        {isPending && <Loader2 className="w-3 h-3 animate-spin text-slate-400" />}
      </span>
    </button>
  );
}
