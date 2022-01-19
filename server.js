/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Maxim Nosov Student ID: 129458204 Date: _1/19/2022_______________
* Heroku Link: _______________________________________________________________
*
********************************************************************************/

const express=require('express');
const path=require('path');
const cors=require('cors');
const app=express();

const RestaurantDB=require('./modules/restaurantDB.js');
const db=new RestaurantDB();

app.use(cors());
app.use(express.json());
const port=process.env.port || 8080;

db.initialize("mongodb+srv://henry:makeitsimple.tu1@cluster0.sn2nx.mongodb.net/sample_restaurants?retryWrites=true&w=majority")
.then(()=>{
    app.listen(port, ()=>{
    console.log(`server listening on: ${port}`);
    });
   }).catch((err)=>{
    console.log(err);
   });
   

app.get('/',(req,res)=>{
    res.json({message:"API Listening"});
});

app.post('/api/restaurants',(req,res)=>{
    let restaurant = req.body.restaurant;
   db.addNewRestaurant(restaurant)
   .then((data)=>{
      res.status(200);
      res.json(data);
        
        })
   .catch((err)=>{
       res.status(400);
       res,json(err);
   });

});

// /:page/:perPage/:borough
app.get('/api/restaurants',(req,res)=>{
    let page=req.query.page;
    let perPage=req.query.perPage;
    let borough=req.query.borough;

    console.log(page,perPage,borough);
    
    db.getAllRestaurants(page,perPage,borough)
    .then((data)=>{
        res.status(200);
        res.json(data);
    })
    .catch((err)=>{
       res.status(400);
       res.json(err);
    })

});

app.get('/api/restaurants/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);

    db.getRestaurantById(id)
    
    .then((data)=>{
        res.status(200).json(data)
        .catch((err)=>{
           res.status(400);
           res.json(err);
        });
    })
});

app.put('/api/restaurants/:id',(req,res)=>{
    let data=req.body;
    let id=req.params.id;
    console.log(id);
    db.updateRestaurantById(data,id)
    .then(()=>{
        res.status(200);
        res.json(id+" is updated!");
    })
    .catch((err)=>{
        res.status(400);
        res.json(err);
    })


});

app.delete('/api/restaurants/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);

    db.deleteRestaurantById(id)
    .then(()=>{
        res.status(200);
        res.json(id+" is deleted!");
    })
    .catch((err)=>{
        res.status(400);
        res.json(err);
    });

});

app.get('*',(req,res)=>{
    res.status(404);
    res.json('Sorry I don\'t know that route');
})








 

