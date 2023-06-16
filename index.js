const express=require("express")
const app=express()
const file=require("fs")
const path=require("path")
const razorpay=require("razorpay")
const crypto=require("crypto")
const shortid = require("shortid")
var {OrderMail}=require("./Mail.js")
var {storeDataToGoogle,storeOrderToGoogle} = require("./Google.js")
var storedata=require("./store.json")

app.listen(3000,()=>{
	console.log("server started")
})

var razorpayinstance = new razorpay({
  key_id: process.env.keyId,
  key_secret: process.env.secretKey,
});



app.set('view-engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({ extended:false }));
app.use(express.json());


app.get('/',async(req,res)=>{
	  res.render("store.ejs",{storeData:storedata})
})


app.post('/payment',async(req,res)=>{
	var total=0;
	var pricedata={}

	try{
			await storedata.forEach(x=>{
					pricedata[x.quality]=x.price;
				})
	
			req.body.data.cartData.forEach(e=>{
				if(e.qty==500){
					total+=parseInt(pricedata[e.quality])
				}else{
					total+=parseInt(pricedata[e.quality])*(parseInt(e.qty)+1)
				}
			})

			total=total*100;
			var options = {
			  amount: total,
			  currency: "INR",
			  receipt: shortid.generate()
			};
			razorpayinstance.orders.create(options,async(err, order)=>{
					await res.json({"id":order.id})
					storeDataToGoogle(req.body.data,order.id)
			});
	}catch(err){
		res.sendStatus(400)
	}
		  
})


app.post('/payment/pod',(req,res)=>{
		try{
			OrderMail(req.body.data,"Cash on Delivery")
			storeOrderToGoogle(req.body.data,"cod","uuid")
			res.sendStatus(200)
		}catch(err){
			res.sendStatus(400)
		}
			
})



app.post('/payment/details',async(req,res)=>{
	try{
		let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
		var Signature = crypto.createHmac('sha256', process.env.secretKey).update(body.toString()).digest('hex');

	    if(Signature==req.body.response.razorpay_signature){
	    	OrderMail(req.body.data,"Pay with Razorpay",req.body.response)
	    	storeOrderToGoogle(req.body.data,"razorpay",req.body.response)
	    	await res.json({"payment":"success"})
	    }else{
	    	await res.json({"payment":"failed"})
	    }

	}catch(err){
		res.sendStatus(400)
	}
	

})



app.get("/:any",(req,res)=>{
	res.render("pageNotfound.ejs")
})
