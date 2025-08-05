import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { FormSubmitProvider } from "./form-submit";

const Form1 = lazy(() => import("./posibles/form-1"));

export default function FormChoose({ id }: { id: string }) {
  const forms = {
    "a1936205-ba01-4327-9732-27d919bdaa59": Form1,
  };

  const Form = forms[id as keyof typeof forms];

  return (
    <FormSubmitProvider formId={id}>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando formulario...</span>
        </div>
      </div>}>
        <Form />
      </Suspense>
    </FormSubmitProvider>
  )
}