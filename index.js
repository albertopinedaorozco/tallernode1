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

app.post('/users/', (req, res)=>{

    if (
        req.body.identification==undefined ||
        req.body.name==undefined ||
        req.body.lastName==undefined ||
        req.body.age==undefined ||
        req.body.gender==undefined  
        )
        return res.status(401).send("Existen  datos obligatorios que no fueron enviados.");
    
        console.log(req.body.gender)
        if (req.body.gender != 'F' && req.body.gender != 'M')
            return res.status(401).send("Genero incorrecto, debe ser 'F' o 'M'.");
        
        if (typeof(parseFloat(req.body.height))!="number")
            return res.status(401).send("Valor incorrecto para height, debe ser numerico");
        
        if (typeof(parseFloat(req.body.weight))!="number") 
          return res.status(401).send("Valor incorrecto para weight, debe ser numerico");

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
    hasUsers(res)
    res.status(200).send(users);
})

app.get('/users/:id', (req, res)=>{
    hasUsers(res)

    const id = req.params.id;
    if(id>=0 && id < users.length){
        
        res.status(200).send(users[id]);
    }else{
        res.status(400).send(`${id} no es una posición valida para el array de usuarios`);
    }
});

app.get('/users/lastname/:lastname', (req, res)=>{
    hasUsers(res)

    const lastname = req.params.lastname.toLowerCase();
    
    arrayfiltered = users.filter(user=>{
       return user.lastName.toLowerCase() == lastname 
    })
    
    if (arrayfiltered.length==0)
        res.status(404).send(`el apellido ${lastname} no existe`);

    res.status(200).send(arrayfiltered);
    
});

app.get('/users/gender/:gender', (req, res)=>{
    hasUsers(res)

    const gender = req.params.gender.toUpperCase();
    arrayGenderfiltered = users.filter(user=>{
        return user.gender.toUpperCase() == gender
     })
     
     if (arrayGenderfiltered.length==0)
         res.status(404).send(`el genero ${gender} no esta definido, las opciones son 'F' o 'M'`);
 
     res.status(200).send(arrayGenderfiltered);
      
});


app.get('/users/telephone/telephone/', (req, res)=>{
    
    hasUsers(res)
      
    arrayUserWithTelephone = users.filter(user=>{
        console.log(user.telephones)
        return user.telephones != undefined && user.telephones.length>0

     })
     
     if (arrayUserWithTelephone.length==0)
        res.status(404).send(`Los usuarios no tienen telefonos registrados`);
 
     res.status(200).send(arrayUserWithTelephone);

    
});


app.get('/users/bmi/:id', (req, res)=>{
    hasUsers(res)

    const id = req.params.id;
        
    if(id>=0 && id < users.length){
        const weight = parseFloat(users[id].weight)
        const height = parseFloat(users[id].height)
        const bmiResult = bmi(weight, height);

        bmiResult == -1 ? 
        res.status(200).send(`Error calculo bmi para ${users[id].name}`) : 
        res.status(200).send(`El resultado del bmi para ${users[id].name} es: ${bmiResult} `)
       
    }else
        res.status(400).send(`${id} no es una posición valida para el array de usuarios`);
    
});


app.get('/users/bmi/bmi/', (req, res)=>{
  hasUsers(res)



});

app.delete('/users/:id', (req, res)=>{

    hasUsers(res)
   

});


hasUsers = (res)=>{

   if (users == undefined || users.length == 0)
      res.status(404).send("No existen usuarios creados.");

}

app.listen(3000, () => {
    console.log("Servidor iniciado");
   });

   

   
