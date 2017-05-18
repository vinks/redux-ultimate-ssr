import express from 'express'
import { getAllExamples, getExampleById } from './example.controller'

const router = express.Router()

router.route('/')
  .get(getAllExamples)

router.route('/:id')
  .get(getExampleById)

export default router
