import { z } from 'zod';

const updateCompanySchema = z.object({
  meta_account_id: z.string().max(400, "Máximo de caracteres excedido").optional(),
  meta_token: z.string().max(800, "Máximo de caracteres excedido").optional(),
  report_day_of_month: z.string().max(2, "Dia inválido").optional(),
  report_lookback_limit: z.string().max(3, "Dias inválidos").optional(),
})

export type UpdateCompanySchemaType = z.infer<typeof updateCompanySchema>

export {
  updateCompanySchema,
}