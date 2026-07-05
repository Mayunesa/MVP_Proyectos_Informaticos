import { Router, type Request, type Response } from 'express'
import proveedores from './proveedores.js'
import eventos from './eventos.js'
import contratosCliente from './contratosCliente.js'
import eventosProveedores from './eventosProveedores.js'

const router = Router()

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.use('/proveedores', proveedores)
router.use('/eventos', eventos)
router.use('/contratos-cliente', contratosCliente)
router.use('/eventos-proveedores', eventosProveedores)

export default router
