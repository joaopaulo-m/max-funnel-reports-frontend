import { z } from 'zod';

const createReportDaySchema = z.object({
  month_day: z.string().min(1, "O dia do mês é obrigatório").max(2, "Dia do mês inválido"),
})

export type CreateReportDaySchemaType = z.infer<typeof createReportDaySchema>

export {
  createReportDaySchema,
}