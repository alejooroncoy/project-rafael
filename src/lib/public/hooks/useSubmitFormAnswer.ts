import { useMutation } from '@tanstack/react-query';

interface SubmitFormAnswerData {
  formId: string;
  answers: Record<string, unknown>;
  createdBy?: string;
}

export function useSubmitFormAnswer() {
  return useMutation<void, Error, SubmitFormAnswerData>({
    mutationFn: async ({ formId, answers, createdBy }: SubmitFormAnswerData) => {
      const response = await fetch('/api/form-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          answers,
          createdBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar respuestas del formulario');
      }
    },
  });
} 