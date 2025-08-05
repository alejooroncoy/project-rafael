import { useQuery } from '@tanstack/react-query';

interface Form {
  id: string;
  title: string;
  description?: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  answers: FormAnswer[];
}

interface FormAnswer {
  id: string;
  formId: string;
  answers: any;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export function useForms() {
  return useQuery<Form[], Error>({
    queryKey: ['forms'],
    queryFn: async () => {
      const response = await fetch('/api/forms');
      if (!response.ok) {
        throw new Error('Error al cargar formularios');
      }
      return response.json();
    },
  });
} 