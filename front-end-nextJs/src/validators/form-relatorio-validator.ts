import { z } from 'zod'

export const formSchema = z.object({
  status: z
    .string({
      required_error: 'status é obrigatório',
    }),
  agentes: z
    .string({
      required_error: 'E-mail é obrigatório',
    }),
  data1: z
    .string({
      required_error: 'Data inicial é obrigatória',
    }).min(10, {
      message: 'Data inválida',
    }),
  data2: z
    .string({
      required_error: 'Data final é obrigatória',
    }).min(10, {
      message: 'Data inválida',
    }), 
})
