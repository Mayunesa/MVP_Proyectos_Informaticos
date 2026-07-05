import { z } from 'zod'
import { supabase } from '../config/supabase.js'

const TABLE = 'evento_proveedor'

export const createSchema = z.object({
  id_evento: z.string().uuid(),
  id_proveedor: z.string().uuid(),
  servicio_acordado: z.string().min(1),
  costo_acordado: z.number().min(0),
  porcentaje_penalidad_aplicado: z.number().min(0).default(0),
  estado_reserva: z.enum(['Pendiente', 'Reservado', 'Pagado', 'Cancelado']).default('Pendiente'),
})

export const updateSchema = createSchema.partial()

export async function findAll() {
  const { data, error } = await supabase.from(TABLE).select('*')
  if (error) throw error
  return data as unknown
}

export async function findById(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data as unknown
}

export async function create(payload: z.infer<typeof createSchema>) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
  if (error) throw error
  return data as unknown
}

export async function update(id: string, payload: z.infer<typeof updateSchema>) {
  const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single()
  if (error) throw error
  return data as unknown
}

export async function remove(id: string) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
