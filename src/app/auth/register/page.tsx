"use client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { useAuthMutation } from "@/lib/public/hooks/useAuthMutation";
import Link from "next/link";
import { toast } from "sonner";
import { User, Mail, Lock, Key, ArrowRight } from "lucide-react";

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
            Crear cuenta
          </h1>
          <p className="text-gray-500">
            Únete a nuestra plataforma profesional
          </p>
        </div>
        
        {/* Formulario */}
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Nombre completo
                  </FormLabel>
                  <FormControl>
                    <InputWithIcon 
                      icon={User} 
                      type="text" 
                      placeholder="Tu nombre completo"
                      disabled={signUp.isPending}
                      state={form.formState.errors.name ? "error" : undefined}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-danger text-sm" />
                </FormItem>
              )}
            />
            
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
                      disabled={signUp.isPending}
                      state={form.formState.errors.email ? "error" : undefined}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-danger text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <InputWithIcon 
                      icon={Lock} 
                      type="password" 
                      placeholder="Mínimo 6 caracteres"
                      disabled={signUp.isPending}
                      state={form.formState.errors.password ? "error" : undefined}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-danger text-sm" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="secretSignup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Código de registro
                  </FormLabel>
                  <FormControl>
                    <InputWithIcon 
                      icon={Key} 
                      type="text" 
                      placeholder="Ingresa el código proporcionado"
                      disabled={signUp.isPending}
                      state={form.formState.errors.secretSignup ? "error" : undefined}
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
              isLoading={signUp.isPending}
              loadingText="Creando cuenta..."
              rightIcon={<ArrowRight />}
              className="mt-2"
            >
              Crear cuenta
            </Button>
          </form>
        </Form>
        
        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <Link 
              href="/auth/login" 
              className="text-primary hover:opacity-80 font-medium transition-all"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
      
      {/* Pie de página corporativo */}
      <div className="mt-8 text-center text-gray-400 text-xs z-10">
        <p>&copy; {new Date().getFullYear()} WorkConnect. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}