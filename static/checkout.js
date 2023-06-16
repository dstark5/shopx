var cartTotalcheckout=document.querySelector('span[id="carttotal"]')
var proceedtopaybtn=document.querySelector('button[class="btn btn-primary proceedtopay"]')
var email=document.querySelector('input[id="inputEmail"]')
var usrname=document.querySelector('input[id="inputName"]')
var phone=document.querySelector('input[id="phonenumber"]')
var address=document.querySelector('input[id="inputAddress"]')
var address2=document.querySelector('input[id="inputAddress2"]')
var city=document.querySelector('input[id="inputCity"]')
var state=document.querySelector('select[id="inputState"]')
var pincode=document.querySelector('input[id="inputZip"]')
var modalpayment=document.querySelector('div[class="modalpayment"]')
var modalcheckout=document.querySelector('div[class="modalcheckout"]')
var checkoutbtn=document.querySelector('button[id="checkoutbtn"]')
var podbtn=document.querySelector('button[class="btn btn-primary podbtn"]')
var paynowbtn=document.querySelector('button[class="btn btn-primary paynowbtn"]')
var Storage=window.sessionStorage


var loader=document.querySelector('div[class="modalLoader"]')
proceedtopaybtn.addEventListener("click",(event)=>{

	event.preventDefault()
	if(Storage.OrderData!=undefined && Storage.OrderData.length!=0){
		var data=JSON.parse(Storage.OrderData)
		var order={"cartData":[],"userData":undefined}
		var price=0;
		data.forEach(e=>{
			price+=e.price
			order.cartData.push(e)
		})
		cartTotalcheckout.innerText=price
		
		if(email.value.length>7 && usrname.value.length!=0 && phone.value.length==10 && address.value.length>15 && city.value.length>=3 && state.value.length!=0 && pincode.value.length>3){
			var x={"name":usrname.value,"email":email.value,"phone":phone.value,"address":address.value,"address2":address2.value,"city":city.value,"state":state.value,"pincode":pincode.value}
			order.userData=x;
			showloader(true)
			fetch("/payment", {
					method: 'POST',
				    mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body:JSON.stringify({"data":order})
				}).then(async(response) =>{
					if(response.status==200){
						var orderID=await response.json();
						showloader(false)
					  	showpayment(true)

						podbtn.addEventListener("click",()=>{
							showloader(true)
							fetch("/payment/pod", {
								method: 'POST',
							    mode: 'cors',
								headers: {
									'Content-Type': 'application/json'
								},
								body:JSON.stringify({"data":order})
							}).then(res=>{
								if(res.status==200){
									swal("Order placed","your order is placed successfully","success").then(()=>{
										reloadSite()
									})
									
								}else{
									swal("Can't Place Order","try again","error")
								}
								showloader(false)
								showpayment(false)
							}).catch(err=>{
								swal("Error ! try again",err.toString(),"error").then(()=>{
									showloader(false)
								})
							})
						});


						paynowbtn.addEventListener("click",()=>{

					  	var options = {
						    "key": "Your_RazorPay_Id", 
						    "name": "Spacex Corp",
						    "description": "payment for order",
						    "image": "/unsplash.jpg",
						    "order_id":orderID.id , 
						    "handler": function (response){
						    	showloader(true)
						        fetch("/payment/details", {
									method: 'POST',
								    mode: 'cors',
									headers: {
										'Content-Type': 'application/json'
									},
									body:JSON.stringify({"response":response,"data":order})
								})
								.then(async(res) =>{
									var res=await res.json()
									if(res.payment=="success"){
										showpayment(false)
										showloader(false)
										swal("Order placed","your order is placed successfully","success").then(()=>{
											reloadSite()
										})
									}else{
										swal("","payment issue try again","error")
										showloader(false)
									}
								})
						    },
						    "prefill":{
						    	"name":order.userData.name,
						    	"email":order.userData.email,
						    	"contact":order.userData.phone
						    },
							"notes": {
							        "address": "Razorpay Corporate Office"
							    },
							    "theme": {
							        "color": "blue"
							    }
							};



							var rzp = new Razorpay(options);
							rzp.on('payment.failed', function (response){
							        swal(response.error.description);
							        swal(response.error.reason);
							});
							rzp.open();
					  })

					}else{
						swal("","try again","error")
					}

				}).catch(err=>{
					swal(err.toString().split(":")[1],"","error")
					.then(e=>{
						showloader(false)
					})
					
				})
		}else{
			if(phone.value.length!=10){
				swal("","provide valid phone number","error")
			}else if(!address.value.length>=15){
				swal("","provide detailed address","error")
			}else if(!email.value.length>7){
				swal("","invalid email","error")
			}else if(state.value.length==0){
				swal("","Select a state","error")
			}else{
				swal("","provide required data to proceed","error")
			}
		}

	}else{
		swal("No cart Data found redirecting to home")
		window.location.replace("/")
	}


})

checkoutbtn.addEventListener("click",()=>{
	setTimeout(function() {
	if(Storage.OrderData!=undefined && Storage.OrderData.length!=0){
		var data=JSON.parse(Storage.OrderData)
		var price=0;
		data.forEach(e=>{
			price+=e.price
		})
		cartTotalcheckout.innerText=price
	}

	},500)

})

function showpayment(x){
	if(x==true){
		modalcheckout.style.display="none";
		modalpayment.style.display="block";
	}else{
		modalpayment.style.display="none";
	}
}

function reloadSite(){
	Storage.clear()
	window.location.reload()
}

function showloader(x){
	if(x==true){
		loader.style.display="block"
	}else{
		loader.style.display="none"
	}
}
