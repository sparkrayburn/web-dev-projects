const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
 
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })
    

    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });

    const Fruit = mongoose.model("Fruit", fruitSchema);

    const fruit = new Fruit ({
        name: "Apple",
        rating:4,
        review: "Pretty solid as a fruit"
    });

    // fruit.save();

    Fruit.updateOne({id:"6415bea62a7f6841a8a88d1f"}, {name: "peach"})
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })

    // Fruit.deleteOne({name: "Apple"})
    // .then(() => {
    //     console.log(`CONNECTED TO MONGO!`);
    // })
    // .catch((err) => {
    //     console.log(`OH NO! MONGO CONNECTION ERROR!`);
    //     console.log(err);
    // })







    const personSchema = new mongoose.Schema({
        name:String,
        age: Number,
        favouriteFruit: fruitSchema
    });

    const Person = mongoose.model("Person", personSchema);

    const pineapple = new Fruit({
        name: "Pineapple",
        rating: 4,
        review: "I dont like so much"
    });

        const tomato = new Fruit({
        name: "Tomato",
        rating: 9,
        review: "I like so much"
    });

    // tomato.save();
    // const person = new Person({
    //     name: "john",
    //     age: 37,
    //     favouriteFruit: tomato
    // });

    Person.updateOne({name:"john"}, {favouriteFruit: pineapple})
    .then(function () {
        console.log("added");
      })
      .catch(function (err) {
        console.log(err);
        });



    // person.save();

     //delete many at once
//   Person.deleteMany({ name: "john"})
//   .then(function(result) {
//     console.log("Successfully deleted the all people.");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });



    // person.save();

    // const kiwi = new Fruit ({
    //     name: "Kiwi",
    //     rating:10,
    //     review: "The best"
    // });
    // const orange = new Fruit ({
    //     name: "orange",
    //     rating:9,
    //     review: "Juicy"
    // });
    // const banana = new Fruit ({
    //     name: "banana",
    //     rating:9,
    //     review: "Easy to eat"
    // });

// Fruit.insertMany([kiwi, orange, banana])
//     .then(function(){
//         console.log("Data inserted");
//     }).catch(function(err){
//         console.log(err);
//     });



Fruit.find()
.then(function (fruits) {
    fruits.forEach(function(element) {

    console.log(element.name);    
    });
    
    setTimeout(function() { mongoose.connection.close();}, 1000);
  })
  .catch(function (err) {
    console.log(err);
    });













// //creating fruit schema
//     const fruitSchema = new mongoose.Schema({
//       name : String,
//       rating : Number,
//       review : String
//     });
//     //creating model
//     const Fruit = mongoose.model("Fruit", fruitSchema);
//     //creating documents (data)
//     const fruit = new Fruit({
//       name : "Apple",
//       rating : 7,
//       review : "Pretty solid as a fruit."
//     });
//     //storing data
//    // fruit.save();
//     //Creating Person schema
//    const personSchema = new mongoose.Schema({
//     name: String,
//     age : Number
//    });
//    //creating person model
//     const Person = mongoose.model("Person",personSchema);
//    //insert data
//    const person = new Person({
//     name: "John",
//     age : 37
//    });
//    //person.save();