import { Router } from 'express'
import * as ContratoCliente from '../controllers/contrato_cliente.js'
import { validate } from '../middleware/validate.js'
import { createSchema, updateSchema } from '../models/contrato_cliente.js'

const router = Router()

router.get('/', ContratoCliente.getAll)
router.get('/:id', ContratoCliente.getById)
router.post('/', validate(createSchema), ContratoCliente.create)
router.put('/:id', validate(updateSchema), ContratoCliente.update)
router.delete('/:id', ContratoCliente.remove)

export default router
