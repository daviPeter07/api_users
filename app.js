import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient
const app = express()
const port = process.env.PORT || 4000 

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
  try {
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
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao atualizar o item")
  }
})


app.delete('/:id', async (req, res) => {
  //nem te conto o que que esse faz
  try{
    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    })
  
    res.send("Item removido com sucesso")
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao deleter user")
  }
})

app.listen(port)
