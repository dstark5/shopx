var addcartbtn=document.querySelectorAll('button[class="btn btn-primary addcartbtn"]')
var cartcount=document.querySelector('span[id="cartcount"]')
var cartbtn=document.querySelector('button[class="cartbtn"]')
var qty=document.querySelectorAll('select[class="quantity"]')
var pricetag=document.querySelectorAll('span[class="priceValue"]')
var modal=document.querySelector('div[class="modal"]')
var closeModal=document.querySelector('span[class="close"]')
var modalcheckout=document.querySelector('div[class="modalcheckout"]')
var cartContainer=document.querySelector('div[id="cartContainer"]')
var rmcartbtn=document.querySelectorAll('button[class="rmbtn"]')
var Storage=window.sessionStorage;
var checkoutbtn=document.querySelector('button[id="checkoutbtn"]')
var cartList=[];

var cartData=[];

cartRefresh()

addcartbtn.forEach((e,i)=>{
	e.addEventListener("click",()=>{
		var index;
		if(cartList!=undefined && cartList.length!=0){
			cartList.forEach((x,z)=>{
				if(x.index==i){
					index=z;
				}
			})
			if(index!=undefined){
				cartList=cartList.filter(x=>x.index!=i)
				e.innerText="Add to cart"
				e.style.backgroundColor=""
			}else{
				cartList.push({"index":i,"qty":qty[i].value})
				e.innerText="Remove from cart"
				e.style.backgroundColor="red"
			}
		}else{
			cartList.push({"index":i,"qty":qty[i].value})
			e.innerText="Remove from cart"
			e.style.backgroundColor="red"
		}
		cartcount.innerText=cartList.length;
		Storage.setItem("cartItems",JSON.stringify(cartList))
		cartRefresh()
		cartTotal()
	})
})

qty.forEach((x,i)=>{
	x.addEventListener("change",()=>{
		if(x.value==500){
			pricetag[i].innerText=parseInt(cartData[i].price)
		}else{
			pricetag[i].innerText=parseInt(cartData[i].price)*(parseInt(x.value)+1)
		}
	})
	if(x.value!=500){
		pricetag[i].innerText=parseInt(cartData[i].price)*(parseInt(x.value)+1)
	}
})

cartbtn.addEventListener("click",()=>{
	if(modal.style.display=="block"){
		modal.style.display="none"
	}else{
		modal.style.display="block"
	}
})
closeModal.addEventListener("click",()=>{
	modal.style.display="none"
})

checkoutbtn.addEventListener("click",()=>{
	if(cartList.length!=0){
		sessionStorage.removeItem("OrderData")
		var orderData=[];
		cartList.forEach(e=>{
			var data;
			data=JSON.parse(JSON.stringify(cartData[e.index]))
			data.qty=e.qty
			if(e.qty==500){
				data.price=parseInt(data.price)
			}else{
				data.price=parseInt(data.price)*(parseInt(data.qty)+1)			
			}
			orderData.push(data)
		})
 
		sessionStorage.setItem('OrderData', JSON.stringify(orderData))
		modal.style.display="none";
		modalcheckout.style.display="block";
	}else{
		swal("","add products to cart to proceed","warning")
	}
})



function cartRefresh(){
	rmcartitems()
	if(Storage.length!=0){
		cartList=JSON.parse(Storage.cartItems);
		cartcount.innerText=cartList.length;
		togglebtn()
		if(cartList.length!=0){
			cartList.forEach(e=>{
				createCartItems(cartData[e.index])
			})
		}
		rmcartbtn=document.querySelectorAll('button[class="rmbtn"]')
		if(rmcartbtn.length!=0){
			rmcartbtn.forEach((e,i)=>{
				e.addEventListener("click",()=>{
					cartList=cartList.filter(x => x!=cartList[i])
					Storage.setItem("cartItems",JSON.stringify(cartList))
					cartRefresh()
				})
			})
		}
		cartTotal()
		cartqty()
	}
}



function rmcartitems(){
	var doc=document.querySelectorAll('div[class="cartitemdiv"]')
	if(doc.length!=0){
		doc.forEach(e=>{
			e.remove()
		})
	}
}


function togglebtn(){
	addcartbtn.forEach((z,i)=>{
		var index;
		if(cartList!=undefined && cartList.length!=0){
			cartList.forEach((x,z)=>{
				if(x.index==i){
					index=z;
				}
			})
			if(index!=undefined){
				z.innerText="Remove from cart"
				z.style.backgroundColor="red"
			}else{
				z.innerText="Add to cart"
				z.style.backgroundColor=""
			}
		}else{
			z.innerText="Add to cart"
			z.style.backgroundColor=""
		}

	})
	cartTotal()
}

function createCartItems(x){
	var div=document.createElement('div')
	var div2=document.createElement('div')
	var div3=document.createElement('div')
	var dropdown=document.createElement('select')
	var label=document.createElement('label')
	var rmbtn=document.createElement('button')
	var opt=["500","1","2","3","4","5"]
	opt.forEach(e=>{
		var option=document.createElement('option')
		option.value=e
		if(e=="500"){
			option.innerText=e+"g"
		}else{
			option.innerText=e+"kg"
		}
		dropdown.append(option)
	})
	dropdown.className="dropdown"
	div2.className="cartimgholder"
	div.className="cartitemdiv"
	div3.className="priceContainer"
	label.className="qlabel"
	rmbtn.className="rmbtn"
	var image=document.createElement('img')
	var delImg=document.createElement('img')
	delImg.src="delete.svg"
	delImg.className="deleteicon"
	image.src=x.img
	image.className="cartimg"
	label.innerText="qty:"
	var p=document.createElement('p')
	p.innerText=`${x.txt}`
	var h6=document.createElement('h6')
	h6.className="cartpriceContainer"
	h6.innerText=`${x.price}`
	div2.append(image)
	div2.append(p)
	div.append(div2)
	div3.append(label)
	div3.append(dropdown)
	div3.append(h6)
	rmbtn.append(delImg)
	div3.append(rmbtn)
	div.append(div3)
	cartContainer.append(div)
}

function cartTotal(){
	var prices=document.querySelectorAll('h6[class="cartpriceContainer"]')
	var cartTotalPrice=document.querySelector('span[id="cartTotalPrice"]')
	var total=0;
	if(prices.length!=0){
		prices.forEach(e=>{
			total+=parseInt(e.innerText)
		})
		cartTotalPrice.innerText=total
	}else{
		cartTotalPrice.innerText=total
	}
}

function cartqty(){
	var prices=document.querySelectorAll('h6[class="cartpriceContainer"]')
	var dropdown=document.querySelectorAll('select[class="dropdown"]')
	if(dropdown.length!=0 && cartList.length!=0){
		dropdown.forEach((x,i)=>{
			if(cartList[i].qty=="500"){
				x.options[0].selected=true
				qty[cartList[i].index].options[0].selected=true
			}else{
				x.options[cartList[i].qty].selected=true
				qty[cartList[i].index].options[cartList[i].qty].selected=true
			}
			updatePrice(prices,x,i);
		})
		cartTotal()
	}
	dropdown.forEach((e,i)=>{
		e.addEventListener("change",()=>{
			updatePrice(prices,e,i)
			cartList[i].qty=e.value
			Storage.setItem("cartItems",JSON.stringify(cartList))
			cartTotal()
		})
	})
}

function updatePrice(prices,e,i) {
	if(e.value==500){
			prices[i].innerText=parseInt(cartData[cartList[i].index].price)
		}else{
			prices[i].innerText=parseInt(cartData[cartList[i].index].price)*(parseInt(e.value)+1)			
		}
}
