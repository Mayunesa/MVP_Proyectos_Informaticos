import { Router } from 'express'
import * as EventoProveedor from '../controllers/evento_proveedor.js'
import { validate } from '../middleware/validate.js'
import { createSchema, updateSchema } from '../models/evento_proveedor.js'

const router = Router()

router.get('/', EventoProveedor.getAll)
router.get('/:id', EventoProveedor.getById)
router.post('/', validate(createSchema), EventoProveedor.create)
router.put('/:id', validate(updateSchema), EventoProveedor.update)
router.delete('/:id', EventoProveedor.remove)

export default router
