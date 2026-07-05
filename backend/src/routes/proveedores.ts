import { Router } from 'express'
import * as Proveedor from '../controllers/proveedor.js'
import { validate } from '../middleware/validate.js'
import { createSchema, updateSchema } from '../models/proveedor.js'

const router = Router()

router.get('/', Proveedor.getAll)
router.get('/:id', Proveedor.getById)
router.post('/', validate(createSchema), Proveedor.create)
router.put('/:id', validate(updateSchema), Proveedor.update)
router.delete('/:id', Proveedor.remove)

export default router
