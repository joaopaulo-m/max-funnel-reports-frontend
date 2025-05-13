import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(191, "Máximo de caracteres excedido"),
  email: z.string().min(1, "O nome é obrigatório").max(191, "Máximo de caracteres excedido").email("E-mail inválido"),
  permission_type: z.string().min(1, "A permissão é obrigatória"),
})

export type CreateUserSchemaType = z.infer<typeof createUserSchema>

export {
  createUserSchema,
}