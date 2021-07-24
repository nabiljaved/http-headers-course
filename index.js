const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    //res.send({msg: 'message'})
    //res.send(req.header('host'))
    //res.send(req.header('user-agent'))
    res.send(req.rawHeaders)
})


app.post('/contact', (req, res) => {
    res.send(req.body)
})


app.post('/contact2', (req, res) => {
    //res.send(req.header('Content-Type'))
    //res.send(req.body)
    if(!req.body.name){
        return res.send("name is required")
    }
        
    res.status(201).send(`Thank You ${req.body.name}`)
})

//tokens 

app.post('/login', (req,res) => {
    if(!req.header('x-auth-token')){
        return res.status(400).send('No Token')
    }

    if(req.header('x-auth-token') !== '123456'){
        return res.status(401).send('Not Authorized')
    }

    res.send('Logged In !')


})

app.put('/post/:id', (req, res) => {
    res.json({
        id: req.params.id, 
        title: req.body.title    
    })
})

app.delete('/post/:id', (req, res) => {
    res.json({msg : `post with id : ${req.params.id} deleted`})
})

app.listen(5000, () => console.log("server started on port 5000"))