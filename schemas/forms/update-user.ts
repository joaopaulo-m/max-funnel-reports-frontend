import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().max(191, "Máximo de caracteres excedido").optional(),
  email: z.string().max(191, "Máximo de caracteres excedido").email("E-mail inválido").optional(),
  permission_type: z.string().optional(),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>

export {
  updateUserSchema,
}