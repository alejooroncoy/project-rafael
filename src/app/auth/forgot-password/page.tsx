"use client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "@/lib/public/hooks/useAuthMutation";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowLeft, SendHorizonal } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4"></div>
      </div>
      
      {/* Logo de la empresa */}
      <div className="mb-6 z-10">
        <h2 className="text-2xl font-bold text-primary">WorkConnect</h2>
      </div>
      
      {/* Contenedor principal */}
      <div className="w-full max-w-md z-10 bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Recuperar contraseña
          </h1>
          <p className="text-gray-500">
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
          </p>
        </div>
        
        {/* Formulario */}
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <InputWithIcon 
                      icon={Mail} 
                      type="email" 
                      placeholder="tu@empresa.com"
                      disabled={forgotPassword.isPending}
                      state={form.formState.errors.email ? "error" : undefined}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-danger text-sm" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              variant="default"
              size="lg"
              width="full"
              isLoading={forgotPassword.isPending}
              loadingText="Enviando enlace..."
              rightIcon={<SendHorizonal />}
              className="mt-2"
            >
              Enviar instrucciones
            </Button>
            
            <div className="mt-6 text-center">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center gap-2 text-primary hover:opacity-80 font-medium transition-all text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a iniciar sesión
              </Link>
            </div>
          </form>
        </Form>
      </div>
      
      {/* Pie de página corporativo */}
      <div className="mt-8 text-center text-gray-400 text-xs z-10">
        <p>&copy; {new Date().getFullYear()} WorkConnect. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}