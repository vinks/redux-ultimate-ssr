import express from 'express'
import exampleRoutes from './example/example.routes'

const router = express.Router()

router.use('/ping', (req, res) => res.success('pong'))
router.use('/example', exampleRoutes)

export default router
