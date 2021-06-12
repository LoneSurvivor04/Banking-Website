const express=require('express')
const MongoClient= require('mongodb')
const dotenv=require('dotenv')
dotenv.config()

router= express.Router();

router.get("/:id", function(req,res){ 
	MongoClient.connect(process.env.DB_URI,{
		useUnifiedTopology:true
	}, function(err,client){
		if(err) throw err;
		const db = client.db('bank_database'); 
		db.collection('transactions').find({$and: [{$or:[{creditedTo:req.params.id},{debitedFrom:req.params.id}]}, { flag:'Transaction Successfull' }]}).toArray(function(err,objs){ 
			res.send(objs)
		});
	});
});
{}
module.exports = router;