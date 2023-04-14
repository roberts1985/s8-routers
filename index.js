import express from 'express'
import kodersRouter from './routers/koders.router.js'
import mentorRouter from './routers/mentors.router.js'

const server = express() //Crea nuestro servidor
const port = 8080

server.use(express.json())
server.use('/koders',kodersRouter)
server.use('/mentors',mentorRouter)

server.listen(port,()=>{
    console.log(`Servidor inicializado en el puerto ${port}`)
})