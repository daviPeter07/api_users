import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient
const app = express()
const port = 3000

app.use(express.json())
app.post('/', async (req, res) => {
  //cria o usuario por meio do body do thunder e lança no banco de dados e retorna uma mensagem de confirmação
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.send("item enviado com sucesso")
})

app.get('/', async (req, res) => {
  //lista os usuarios do banco
  const users = await prisma.user.findMany()
  //retorna os usuarios em um arquivo json
  res.status(200).json(users)
  
})

app.put('/:id', async (req, res) => {
//atualiza o usuario conforme ID
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })

  res.send("Item atualizado com sucesso")
})

app.delete('/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.send("Item removido com sucesso")
})

app.listen(port)
