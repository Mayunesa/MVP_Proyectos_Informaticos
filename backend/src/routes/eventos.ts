import { Router } from 'express'
import * as Evento from '../controllers/evento.js'
import { validate } from '../middleware/validate.js'
import { createSchema, updateSchema } from '../models/evento.js'

const router = Router()

router.get('/', Evento.getAll)
router.get('/:id', Evento.getById)
router.post('/', validate(createSchema), Evento.create)
router.put('/:id', validate(updateSchema), Evento.update)
router.delete('/:id', Evento.remove)

export default router
