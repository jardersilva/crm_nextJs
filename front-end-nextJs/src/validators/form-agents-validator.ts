import { z } from 'zod'

export const formSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(3, {
      message: 'Nome deve ter no mínimo 3 caracteres',
    }),
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email({
      message: 'E-mail inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(6, {
      message: 'Senha deve ter no mínimo 6 caracteres',
    }),
  status: z
    .string({
      required_error: 'Status é obrigatório',
    })
    .min(3, {
      message: 'Status deve ter no mínimo 3 caracteres',
    }),
})
