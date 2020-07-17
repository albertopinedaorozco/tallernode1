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
        telephones: req.body.telephones,
        bmi: bmi(req.body.weight, req.body.height)
    }
    
    users.push(user);
    res.status(201).send(user);

})

app.get('/users/', (req,res)=>{
    res.status(200).send(users);
})

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    if(id>0 && id < users.length){
        res.status(200).send(users[id]);
    }else{
        res.status(400)send(`${id} no es una posición valida para el array de usuarios`);
    }
});

app.get('/users/lastname/:lastname', (req, res)=>{
    const lastname = req.params.lastname;
    if(validacion(lastname)==false){
        res.status(200).send(`Página del usuario ${lastName}`);
    }else{
        res.sendStatus(400);
    }
});

app.get('/users/gender/:gender', (req, res)=>{
    const gender = req.params.gender;
    if(validacion(gender)==false || gender == "Hombre" || gender == "Mujer"){
        res.status(200).send(`Página del usuario ${gender}`);
    }else{
        res.sendStatus(400);
    }
});


app.get('/users/telephone', (req, res)=>{
    const telephone = req.params.telephone;
    if(telephone>0){
        res.status(200).send(`${id}`);
    }else{
        res.sendStatus(400);
    }
});


app.get('/users/bmi/:id', (req, res)=>{
    const id = req.params.id;
    const bmi = req.params.bmi;
    if(id>0){
        res.status(200).send(`Indice de masa corporal del usuario ${id}: ${bmi}`);
    }else{
        res.sendStatus(400);
    }
});

app.get('/users/bmi/', (req, res)=>{
    const id = req.params.id;
    const bmi = req.params.bmi;
    if(id>0){
        res.status(200).send(`Indice de masa corporal del usuario ${id}: ${bmi}`);
    }else{
        res.sendStatus(400);
    }
});

app.get('/bmi/:weight/:height', (req, res)=>{
    const weight = req.params.weight;
    const height = req.params.height;
    const bmiResult = bmi(weight, height);
    bmiResult === -1 ?
        res.sendStatus(500)
    :    
        res.status(200).send(`bmi: ${bmiResult}`);
});



app.listen(3000, () => {
    console.log("Servidor iniciado");
   });

   function validacion(texto){
    for(i=0; i<texto.length; i++){
       if (numeros.indexOf(texto.charAt(i),0)!=-1){
          return true;
       }
    }
    return false;
 }
