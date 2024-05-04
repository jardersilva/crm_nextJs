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
  telefone: z
    .string({
      required_error: 'Telefone é obrigatória',
    })
    .min(6, {
      message: 'Senha deve ter no mínimo 6 caracteres',
    }),
  endereco: z
    .string({
      required_error: 'Endereço é obrigatório',
    })
    .min(3, {
      message: 'Endereço deve ter no mínimo 3 caracteres',
    }),
    status: z.string().optional(),
    valor: z.string().nullable().optional(), 
    id_agente: z.string().optional(), 
})
