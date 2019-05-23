

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://flagsuser:123mudar@ds048279.mlab.com:48279/flags');

//mongoose.connect('mongodb://localhost/rankingflag');
mongoose.Promise = Promise;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const rankingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'You must enter a first name'
    },
    lastName: {
        type: String,
        required: 'You must enter a last name'
    },
    points: {
        type: Number,
        required: 'The number of points is mandatory'
    },
    time: {
        type: Number,
        required: 'THe time is mandatory',
        default: 3000
    },
    created_date: {
      type: Date,
      default: Date.now
    }
    
});

const RankingFlag = mongoose.model('RankingFlag', rankingSchema);




// CREATE FAKE ENTRIES
var teste = {
    firstName: 'Fulano',
    lastName: 'de tal',
    points: 3,
    time: 30000
}


var teste2 = {
    firstName: 'Sicrano',
    lastName: 'da Silva',
    points: 3,
    time: 30000
}


  // RankingFlag.create(teste2)
  //     .then((newEntry)=>{console.log(newEntry)})
  //     .catch((err)=>{console.log(err)});

// RankingFlag.create(teste)
//      .then((newEntry)=>{console.log(newEntry)})
//      .catch((err)=>{console.log(err)});




// RankingFlag.create(teste)
//      .then((newEntry)=>{console.log(newEntry)})
//      .catch((err)=>{console.log(err)});


// RankingFlag.deleteMany({}, function (err, result) {

//         if (err) {

//             console.log("error query");

//         } else {

//             console.log(result);

//         }

//     });


app.get('/api', (req,res)=>{
        RankingFlag.find()
    .then(function(ranking){
        res.json(ranking);
    })
    .catch(function(err){
        res.send(err);
    });
});
 
 
 

app.post('/api', (req, res)=>{
        RankingFlag.create(req.body)
  .then(function(newRanking){
      res.status(201).json(newRanking);
  })
  .catch(function(err){
      res.send(err);
  })
});
    





app.listen(3005, ()=>{
    
    console.log("server on...")
});