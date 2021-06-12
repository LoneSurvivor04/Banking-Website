const express=require('express')
const MongoClient= require('mongodb')
const dotenv=require('dotenv')
dotenv.config()

router= express.Router();

router.get("/", function(req,res){ 
	MongoClient.connect(process.env.DB_URI,{
		useUnifiedTopology:true
	}, function(err,client){
		if(err) throw err;
		const db = client.db('bank_database'); 
		db.collection('users').find().toArray(function(err,objs){ 
			res.send(objs)
		});
	});
});

module.exports = router;