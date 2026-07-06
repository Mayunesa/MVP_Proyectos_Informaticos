import type { Request, Response, NextFunction } from 'express'
import * as EventoProveedor from '../models/evento_proveedor.js'

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await EventoProveedor.findAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await EventoProveedor.findById(req.params.id as string)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await EventoProveedor.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await EventoProveedor.update(req.params.id as string, req.body)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json(data)
  } catch (err) {
    next(err)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await EventoProveedor.remove(req.params.id as string)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}
