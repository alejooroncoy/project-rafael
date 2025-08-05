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

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();
  const { signIn } = useAuthMutation();

  async function onSubmit(values: LoginValues) {
    signIn.mutate(values, {
      onSuccess: async (token) => {
        const res = await nextAuthSignIn("credentials", { token, redirect: false });
        if (res?.ok) {
          toast.success("¡Bienvenido! Has iniciado sesión correctamente.");
          router.push("/dashboard");
        } else {
          form.setError("email", { message: "No pudimos iniciar sesión. Por favor revisa tus datos." });
        }
      },
      onError: () => {
        form.setError("email", { message: "Correo o contraseña incorrectos. Intenta nuevamente." });
      },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>
        
        <Form {...form}>
          <form className="space-y-5 sm:space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                      disabled={signIn.isPending}
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
                      disabled={signIn.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={signIn.isPending} 
              className="w-full h-11 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 mt-6 sm:mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signIn.isPending ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </Form>
        
        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          <div className="text-center">
            <Link 
              href="/auth/forgot-password" 
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm sm:text-base transition-colors duration-200"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="text-center text-sm sm:text-base text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link 
              href="/auth/register" 
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 