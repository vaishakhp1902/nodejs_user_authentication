const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
app.use(express.json())

const users = [ 
    
]
app.get('/users',(req,res)=>{
    res.json(users)

})

app.post('/users',async (req,res)=>{
    //Authentication User
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send() 
        
    } catch  {
        res.status(500).send()
        
    }

    app.post('/users/login',async (req,res)=>{
        const user = users.find(user=> user.name === req.body.name)
        if(user == null){
            res.status(400).send('Cannot Find User')
        }

        try {
           if(await bcrypt.compare(req.body.password,user.password)){
               res.send('Success')
           } else {
               res.send('Not allowed')
           }
            
        } catch {
            res.status(500).send()
            
        }

    })

   

})

app.listen(3000)
