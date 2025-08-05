"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useSetRole } from "@/lib/public/hooks/useSetRole";

const onboardingSchema = z.object({
  role: z.string().min(1, "Por favor selecciona un rol para continuar."),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { role: "" },
  });
  const router = useRouter();
  const { update } = useSession();
  const setRoleMutation = useSetRole();

  async function onSubmit(values: OnboardingValues) {
    try {
      await setRoleMutation.mutateAsync({ role: values.role });
      // Forzar refresh de sesión/token
      const session = await update({ role: values.role });
      if (session) {
        toast.success("¡Listo! Tu rol ha sido guardado. Ahora puedes comenzar a usar la aplicación.");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error inesperado. Por favor intenta más tarde.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-2">
            Selecciona tu Rol
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Elige el rol que mejor se adapte a tu perfil
          </p>
        </div>
        
        <Form {...form}>
          <form className="space-y-5 sm:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Rol</FormLabel>
                  <FormControl>
                    <Select 
                      required 
                      value={field.value} 
                      onValueChange={field.onChange} 
                      disabled={setRoleMutation.isPending}
                    >
                      <SelectTrigger className="w-full h-11 sm:h-12 text-base">
                        <SelectValue placeholder="Selecciona un rol..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OWNER">Socio</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {setRoleMutation.error && (
              <div className="text-red-600 text-sm sm:text-base text-center p-3 bg-red-50 rounded-lg">
                {setRoleMutation.error.message}
              </div>
            )}
            <button 
              type="submit" 
              disabled={setRoleMutation.isPending} 
              className="w-full h-11 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 mt-6 sm:mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {setRoleMutation.isPending ? "Guardando..." : "Continuar"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
} 