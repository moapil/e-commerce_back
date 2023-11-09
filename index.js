const express = require('express')
const app = express()
const conn = require ('./db/conn')
const Cliente = require('./models/Cliente')

const PORT = 3000
const hostname = 'localhost'

let log = false

//--express config

app.use(express.urlencoded({extends:true}))
app.use(express.json())
app.use(express.static('public'))

//--cabeçalho config

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-type, Accept' )
    next()
})

//--

app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    console.log(email,senha)
    const pesq = await Cliente.findOne(
        {raw: true, where: {email:email, senha:senha}}
        )

    console.log(pesq)
    if(pesq == null){
        console.log('user not found')
        res.status(200).redirect('/')
    }else if(pesq.email == email && pesq.senha == senha){
        console.log('user found')
        log = true
        res.render('index', {log})
    }else{
        res.status(200).redirect('/')
        console.log('user not found')
    }

})

//--

app.post('/dados', (req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    console.log(nome,email,senha)
    Cliente.create({nome,email,senha})
    res.status(201).send({message: "dados gravados"})
})


//--

conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
        console.log(`servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error("erro d conexao")
})
