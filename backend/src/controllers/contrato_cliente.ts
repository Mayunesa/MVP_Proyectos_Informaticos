import type { Request, Response, NextFunction } from 'express'
import * as ContratoCliente from '../models/contrato_cliente.js'

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ContratoCliente.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ContratoCliente.findById(req.params.id as string)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ContratoCliente.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ContratoCliente.update(req.params.id as string, req.body)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await ContratoCliente.remove(req.params.id as string)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
