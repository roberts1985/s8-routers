import express from 'express'
import fs from 'fs'

const router = express.Router() //Crea el router

router.get('/', async (request, response)=> {
    const dataFile = await fs.promises.readFile("./kodemia.json","utf8")
    const json = JSON.parse(dataFile)
    const mentors = json.mentors

    const { module, age, generation, x } = request.query

    let filteredMentors = mentors

    if(module){
        filteredMentors = filteredMentors.filter(mentor => mentor.module == module)
    }

    if(age) {
        filteredMentors = filteredMentors.filter(mentor=>mentor.age==age)
    }

    if(generation) {
        filteredMentors = filteredMentors.filter(mentor=>mentor.generations.includes(generation)===true)
    }

    if(x) {
        filteredMentors = filteredMentors.filter(mentor => mentor.age > parseInt(x))
    }

    response.json({
        sucess: true,
        data: {
            mentors: filteredMentors
        }
    })
})

router.get('/:id',async (request, response)=>{
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile)

    const id = parseInt(request.params.id)
    const result = json.mentors.find(item => item.id === id)
    response.json({
        sucess: true,
        data: {
            mentors:result
        }
    })
})

router.post('/',async (request, response)=> {
   
    const dataFile = await fs.promises.readFile("./kodemia.json","utf8")
    const json = JSON.parse(dataFile)
    const mentors = json.mentors

    const newMentor = request.body
    json.mentors.push(newMentor)

    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json, null, "  "), 'utf8')

    console.log(newMentor)
    const message = {
        sucess: true,
        message: "Se agregó un nuevo koder exitosamente..."
    }
    response.json(message)
})

router.patch('/:idMentor', async (request, response)=> {
    
    const id = request.params.idMentor
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile)
    const elementIndex = json.mentors.findIndex((obj => obj.id == id))

    const body = request.body
    Object.keys(body).forEach((key)=>{
        json.mentors[elementIndex][key] = body[key]
    })
    
    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json,null,2),'utf8')

    const message = {
        sucess: true,
        message: "Se actualizó el koder exitosamente..."
    }
    response.json(message)
})

router.delete('/:idMentor', async (request, response)=> {

    const id = request.params.idMentor
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile)
    const elementIndex = json.mentors.findIndex((obj => obj.id == id))
    console.log(elementIndex)
    json.mentors.splice(elementIndex,1)
    
    await fs.promises.writeFile('./kodemia.json',JSON.stringify(json,null,2),'utf8')

    const message = {
        sucess: true,
        message: "Se elimino koder exitosamente..."
    }
    response.json(message)
})

export default router