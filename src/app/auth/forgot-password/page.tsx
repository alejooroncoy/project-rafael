"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "@/lib/public/hooks/useAuthMutation";
import Link from "next/link";
import { toast } from "sonner";

const forgotSchema = z.object({
  email: z.string().email("Email inválido"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });
  const { forgotPassword } = useAuthMutation();

  async function onSubmit(values: ForgotValues) {
    forgotPassword.mutate(values, {
      onSuccess: () => toast.success("Te enviamos un correo para recuperar tu contraseña. Revisa tu bandeja de entrada o spam."),
      onError: () => form.setError("email", { message: "No pudimos enviar el correo de recuperación. Por favor revisa el correo ingresado." }),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-2">
            Recuperar Contraseña
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Ingresa tu email para recibir un enlace de recuperación
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
                      disabled={forgotPassword.isPending}
                      className="h-11 sm:h-12 text-base"
                      placeholder="tu@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button 
              type="submit" 
              disabled={forgotPassword.isPending} 
              className="w-full h-11 sm:h-12 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 mt-6 sm:mt-8 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {forgotPassword.isPending ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        </Form>
        
        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-600">
          <Link 
            href="/auth/login" 
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
} 