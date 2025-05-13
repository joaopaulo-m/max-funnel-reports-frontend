import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
  password: z.string().max(191, "Máximo de caracteres já foi atingido"),
  password_not_defined: z.boolean()
})

export type LoginSchemaType = z.infer<typeof loginSchema>

export {
  loginSchema,
}