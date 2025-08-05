"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useSubmitFormAnswer } from '@/lib/public/hooks/useSubmitFormAnswer'
import { toast } from 'sonner'

interface FormSubmitContextType {
  submitForm: (answers: Record<string, unknown>) => Promise<void>
  isSubmitting: boolean
}

const FormSubmitContext = createContext<FormSubmitContextType | undefined>(undefined)

interface FormSubmitProviderProps {
  children: ReactNode
  formId: string
  createdBy?: string
}

export function FormSubmitProvider({ children, formId, createdBy }: FormSubmitProviderProps) {
  const submitFormAnswerMutation = useSubmitFormAnswer()

  const submitForm = async (answers: Record<string, unknown>) => {
    try {
      await submitFormAnswerMutation.mutateAsync({
        formId,
        answers,
        createdBy,
      })
    } catch (error) {
      throw error
    }
  }

  return (
    <FormSubmitContext.Provider
      value={{
        submitForm,
        isSubmitting: submitFormAnswerMutation.isPending,
      }}
    >
      {children}
    </FormSubmitContext.Provider>
  )
}

export function useFormSubmit() {
  const context = useContext(FormSubmitContext)
  if (context === undefined) {
    throw new Error('useFormSubmit debe ser usado dentro de un FormSubmitProvider')
  }
  return context
} 