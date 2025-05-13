import { z } from 'zod';

const forgetPasswordSchema = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
})

export type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>

export {
  forgetPasswordSchema,
}