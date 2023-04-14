import express from 'express'
import fs from 'fs'

const router = express.Router() //Crea el router

router.get('/', async (request, response)=> {
    const dataFile = await fs.promises.readFile("./kodemia.json","utf8")
    const json = JSON.parse(dataFile)
    const koders = json.koders

    response.json({
        sucess: true,
        data: {
            koders: koders
        }
    })
})

router.post('/',async (request, response)=> {
    /**
     * Leer archivo de koders
     * obtener los koders
     * obtener el nuevo desde el request.body
     * agregar el nuevo koder a la lista de koders
     * escribir en el a
     */
    const dataFile = await fs.promises.readFile("./kodemia.json","utf8")
    const json = JSON.parse(dataFile)
    const koders = json.koders

    const newKoder = request.body
    json.koders.push(newKoder)

    //json.koders = koders 
    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json, null, "  "), 'utf8')

    console.log(newKoder)
    const message = {
        sucess: true,
        message: "Se agregó un nuevo koder exitosamente..."
    }
    response.json(message)
    //response.json({message: "Aquí se crearan los koders..."})
})

router.patch('/:idKoder', async (request, response)=> {
    
    const id = request.params.idKoder
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile)
    const elementIndex = json.koders.findIndex((obj => obj.id == id))

    const body = request.body
    Object.keys(body).forEach((key)=>{
        json.koders[elementIndex][key] = body[key]
    })
    
    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json,null,2),'utf8')

    const message = {
        sucess: true,
        message: "Se actualizó el koder exitosamente..."
    }
    response.json(message)
})

router.delete('/:idKoder', async (request, response)=> {

    const id = request.params.idKoder
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile)
    const elementIndex = json.koders.findIndex((obj => obj.id == id))
    console.log(elementIndex)
    json.koders.splice(elementIndex,1)
    
    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json,null,2),'utf8')

    const message = {
        sucess: true,
        message: "Se elimino koder exitosamente..."
    }
    response.json(message)
})

export default router