import express from 'express'
import db from '../config/db'
import 'dotenv/config'
import morgan from 'morgan'
import cors from 'cors'

import AuthRouter from './routes/AuthRoutes'
import categoryRouter from './routes/CategoryRouter'
import LinkRouter from './routes/LinkRouter'
import NotasRouter from './routes/NotasRoutes'


export const port = process.env.PORT || 3000
export const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db().then(() => console.log('Se conecto correctamente'))


app.use('/api/auth', AuthRouter)
app.use('/api/category', categoryRouter)
app.use('/api/link', LinkRouter)
app.use('/api/notas', NotasRouter)