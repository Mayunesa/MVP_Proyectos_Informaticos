import { z } from 'zod'
import { supabase } from '../config/supabase.js'

const TABLE = 'contratos_cliente'

export const createSchema = z.object({
  id_evento: z.string().uuid(),
  fecha_firma: z.string().min(1),
  anticipo_pagado: z.number().min(0),
  url_documento_firmado: z.string().optional(),
  estado_contrato: z.enum(['Vigente', 'Cancelado', 'Reagendado']).default('Vigente'),
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
