//importar express
const express = require('express');

//instanciando express en el objeto app
const app = express();


//importar modulo personalizado
const bmi = require('./bmi');

//modelos
const users = [];

//middleware


const logger = (req, res,next) =>{
   
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getDay()
    console.log(`${formatted_date} : ${req.method} : ${req.path} : ${req.headers['user-agent']} `);
    console.log(req.body)
    


    
    next();
}

app.use(logger);
app.use(express.json());

/* requests */
app.get('/', (req, res)=>{

    res.status(200).send("Todo bien!");
})

app.post('/users/', (req, res)=>{

    if (
        req.body.identification==undefined ||
        req.body.name==undefined ||
        req.body.lastName==undefined ||
        req.body.age==undefined ||
        req.body.gender==undefined 
        )
        return res.status(401).send("Existen  datos obligatorios que no fueron enviados.");
    
    
   const user = {
        identification : req.body.identification,
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        telephones: req.body.telephones
    }
    
    users.push(user);
    res.status(201).send(user);

})

app.get('/users/', (req,res)=>{
    res.status(200).send(users);
})



app.listen(3000, () => {
    console.log("Servidor iniciado");
   });