const express=require('express')
const MongoClient= require('mongodb')
const dotenv=require('dotenv')
dotenv.config()

router= express.Router();

router.post("/", function(req,res){ 
	MongoClient.connect(process.env.DB_URI,{useUnifiedTopology:true}, function(err, client) {
        if (err) throw err;
        const db = client.db('bank_database');
        db.collection('transactions').insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("Document inserted");
        });
      });
});

router.put("/", function(req,res){ 
	MongoClient.connect(process.env.DB_URI,{useUnifiedTopology:true}, function(err, client) {
        if (err) throw err;
        const db = client.db('bank_database');
        db.collection('users').updateOne({name: req.body.name}, {$set: {balance:req.body.balance}},function(err, res) {
          if (err) throw err;
          console.log("Document updated");
        });
      });
});


module.exports = router;