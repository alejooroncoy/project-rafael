"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { useAuthMutation } from "@/lib/public/hooks/useAuthMutation";
import Link from "next/link";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  secretSignup: z.string().min(1, "El código de registro es obligatorio"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", secretSignup: "" },
  });
  const router = useRouter();
  const { signUp } = useAuthMutation();

  async function onSubmit(values: RegisterValues) {
    signUp.mutate(values, {
      onSuccess: async (token) => {
        const res = await nextAuthSignIn("credentials", { token, redirect: false });
        if (res?.ok) {
          toast.success("¡Cuenta creada exitosamente! Ahora selecciona tu rol.");
          router.push("/auth/onboarding");
        } else {
          form.setError("email", { message: "No pudimos crear tu cuenta. Intenta de nuevo o revisa tus datos." });
        }
      },
      onError: () => {
        form.setError("email", { message: "No pudimos crear tu cuenta. Por favor revisa los datos e intenta nuevamente." });
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Únete a nuestra plataforma
          </p>
        </div>
        
        <Form {...form}>
          <form className="space-y-5 sm:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Nombre</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      {...field} 
                      disabled={signUp.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="Tu nombre completo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      disabled={signUp.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="tu@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Contraseña</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      {...field} 
                      disabled={signUp.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secretSignup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base font-medium">Código de Registro</FormLabel>
                  <FormControl>
                    <Input 
                      type="text" 
                      {...field} 
                      disabled={signUp.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="Ingresa el código de registro"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={signUp.isPending} 
              className="w-full h-11 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 mt-6 sm:mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signUp.isPending ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </Form>
        
        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link 
            href="/auth/login" 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
} 