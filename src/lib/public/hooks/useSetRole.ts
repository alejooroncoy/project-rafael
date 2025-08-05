import { useMutation } from '@tanstack/react-query';

interface SetRoleParams {
  role: string;
}

interface SetRoleResponse {
  ok: boolean;
}

export function useSetRole() {
  return useMutation<SetRoleResponse, Error, SetRoleParams>({
    mutationFn: async ({ role }: SetRoleParams) => {
      const res = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'No se pudo actualizar el rol.');
      }
      
      return res.json();
    },
  });
} 