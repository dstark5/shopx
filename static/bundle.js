(()=>{var e=document.querySelectorAll('button[class="btn btn-primary addcartbtn"]'),t=document.querySelector('span[id="cartcount"]'),r=document.querySelector('button[class="cartbtn"]'),n=document.querySelectorAll('select[class="quantity"]'),a=document.querySelectorAll('span[class="priceValue"]'),o=document.querySelector('div[class="modal"]'),c=document.querySelector('span[class="close"]'),l=document.querySelector('div[class="modalcheckout"]'),i=document.querySelector('div[id="cartContainer"]'),s=document.querySelectorAll('button[class="rmbtn"]'),d=window.sessionStorage,u=document.querySelector('button[id="checkoutbtn"]'),p=[],m=[{img:"x.jpg",txt:"Secure video meetings for your business Grade A1.",price:450,quality:"A1"},{img:"x.jpg",txt:"Secure video meetings for your business Grade A2.",price:425,quality:"A2"},{img:"x.jpg",txt:"Secure video meetings for your business Grade B1.",price:350,quality:"B1"},{img:"x.jpg",txt:"Secure video meetings for your business Grade B2.",price:305,quality:"B2"},{img:"x.jpg",txt:"Secure video meetings for your business Grade C1.",price:290,quality:"C1"},{img:"x.jpg",txt:"Secure video meetings for your business Grade C2.",price:255,quality:"C2"}];function y(){var r,a,o;0!=(r=document.querySelectorAll('div[class="cartitemdiv"]')).length&&r.forEach((e=>{e.remove()})),0!=d.length&&(p=JSON.parse(d.cartItems),t.innerText=p.length,e.forEach(((e,t)=>{var r;null!=p&&0!=p.length?(p.forEach(((e,n)=>{e.index==t&&(r=n)})),null!=r?(e.innerText="Remove from cart",e.style.backgroundColor="red"):(e.innerText="Add to cart",e.style.backgroundColor="")):(e.innerText="Add to cart",e.style.backgroundColor="")})),v(),0!=p.length&&p.forEach((e=>{!function(e){var t=document.createElement("div"),r=document.createElement("div"),n=document.createElement("div"),a=document.createElement("select"),o=document.createElement("label"),c=document.createElement("button");["500","1","2","3","4","5"].forEach((e=>{var t=document.createElement("option");t.value=e,t.innerText="500"==e?e+"g":e+"kg",a.append(t)})),a.className="dropdown",r.className="cartimgholder",t.className="cartitemdiv",n.className="priceContainer",o.className="qlabel",c.className="rmbtn";var l=document.createElement("img"),s=document.createElement("img");s.src="delete.svg",s.className="deleteicon",l.src=e.img,l.className="cartimg",o.innerText="qty:";var d=document.createElement("p");d.innerText=`${e.txt}`;var u=document.createElement("h6");u.className="cartpriceContainer",u.innerText=`${e.price}`,r.append(l),r.append(d),t.append(r),n.append(o),n.append(a),n.append(u),c.append(s),n.append(c),t.append(n),i.append(t)}(m[e.index])})),0!=(s=document.querySelectorAll('button[class="rmbtn"]')).length&&s.forEach(((e,t)=>{e.addEventListener("click",(()=>{p=p.filter((e=>e!=p[t])),d.setItem("cartItems",JSON.stringify(p)),y()}))})),v(),a=document.querySelectorAll('h6[class="cartpriceContainer"]'),0!=(o=document.querySelectorAll('select[class="dropdown"]')).length&&0!=p.length&&(o.forEach(((e,t)=>{"500"==p[t].qty?(e.options[0].selected=!0,n[p[t].index].options[0].selected=!0):(e.options[p[t].qty].selected=!0,n[p[t].index].options[p[t].qty].selected=!0),g(a,e,t)})),v()),o.forEach(((e,t)=>{e.addEventListener("change",(()=>{g(a,e,t),p[t].qty=e.value,d.setItem("cartItems",JSON.stringify(p)),v()}))})))}function v(){var e=document.querySelectorAll('h6[class="cartpriceContainer"]'),t=document.querySelector('span[id="cartTotalPrice"]'),r=0;0!=e.length?(e.forEach((e=>{r+=parseInt(e.innerText)})),t.innerText=r):t.innerText=r}function g(e,t,r){500==t.value?e[r].innerText=parseInt(m[p[r].index].price):e[r].innerText=parseInt(m[p[r].index].price)*(parseInt(t.value)+1)}y(),e.forEach(((e,r)=>{e.addEventListener("click",(()=>{var a;null!=p&&0!=p.length?(p.forEach(((e,t)=>{e.index==r&&(a=t)})),null!=a?(p=p.filter((e=>e.index!=r)),e.innerText="Add to cart",e.style.backgroundColor=""):(p.push({index:r,qty:n[r].value}),e.innerText="Remove from cart",e.style.backgroundColor="red")):(p.push({index:r,qty:n[r].value}),e.innerText="Remove from cart",e.style.backgroundColor="red"),t.innerText=p.length,d.setItem("cartItems",JSON.stringify(p)),y(),v()}))})),n.forEach(((e,t)=>{e.addEventListener("change",(()=>{500==e.value?a[t].innerText=parseInt(m[t].price):a[t].innerText=parseInt(m[t].price)*(parseInt(e.value)+1)})),500!=e.value&&(a[t].innerText=parseInt(m[t].price)*(parseInt(e.value)+1))})),r.addEventListener("click",(()=>{"block"==o.style.display?o.style.display="none":o.style.display="block"})),c.addEventListener("click",(()=>{o.style.display="none"})),u.addEventListener("click",(()=>{if(0!=p.length){sessionStorage.removeItem("OrderData");var e=[];p.forEach((t=>{var r;(r=JSON.parse(JSON.stringify(m[t.index]))).qty=t.qty,500==t.qty?r.price=parseInt(r.price):r.price=parseInt(r.price)*(parseInt(r.qty)+1),e.push(r)})),sessionStorage.setItem("OrderData",JSON.stringify(e)),o.style.display="none",l.style.display="block"}else swal("","add products to cart to proceed","warning")}))})(),(()=>{var e=document.querySelector('span[id="carttotal"]'),t=document.querySelector('button[class="btn btn-primary proceedtopay"]'),r=document.querySelector('input[id="inputEmail"]'),n=document.querySelector('input[id="inputName"]'),a=document.querySelector('input[id="phonenumber"]'),o=document.querySelector('input[id="inputAddress"]'),c=document.querySelector('input[id="inputAddress2"]'),l=document.querySelector('input[id="inputCity"]'),i=document.querySelector('select[id="inputState"]'),s=document.querySelector('input[id="inputZip"]'),d=document.querySelector('div[class="modalpayment"]'),u=document.querySelector('div[class="modalcheckout"]'),p=document.querySelector('button[id="checkoutbtn"]'),m=document.querySelector('button[class="btn btn-primary podbtn"]'),y=document.querySelector('button[class="btn btn-primary paynowbtn"]'),v=window.sessionStorage,g=document.querySelector('div[class="modalLoader"]');function h(e){1==e?(u.style.display="none",d.style.display="block"):d.style.display="none"}function S(){v.clear(),window.location.reload()}function f(e){g.style.display=1==e?"block":"none"}t.addEventListener("click",(t=>{if(t.preventDefault(),null!=v.OrderData&&0!=v.OrderData.length){var d=JSON.parse(v.OrderData),u={cartData:[],userData:void 0},p=0;if(d.forEach((e=>{p+=e.price,u.cartData.push(e)})),e.innerText=p,r.value.length>7&&0!=n.value.length&&10==a.value.length&&o.value.length>15&&l.value.length>=3&&0!=i.value.length&&s.value.length>3){var g={name:n.value,email:r.value,phone:a.value,address:o.value,address2:c.value,city:l.value,state:i.value,pincode:s.value};u.userData=g,f(!0),fetch("/payment",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:u})}).then((async e=>{if(200==e.status){var t=await e.json();f(!1),h(!0),m.addEventListener("click",(()=>{f(!0),fetch("/payment/pod",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:u})}).then((e=>{200==e.status?swal("Order placed","your order is placed successfully","success").then((()=>{S()})):swal("Can't Place Order","try again","error"),f(!1),h(!1)})).catch((e=>{swal("Error ! try again",e.toString(),"error").then((()=>{f(!1)}))}))})),y.addEventListener("click",(()=>{var e={key:"rzp_test_PhNMuEkeKlnMaY",name:"Spacex Corp",description:"payment for order",image:"/unsplash.jpg",order_id:t.id,handler:function(e){f(!0),fetch("/payment/details",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({response:e,data:u})}).then((async e=>{"success"==(e=await e.json()).payment?(h(!1),f(!1),swal("Order placed","your order is placed successfully","success").then((()=>{S()}))):(swal("","payment issue try again","error"),f(!1))}))},prefill:{name:u.userData.name,email:u.userData.email,contact:u.userData.phone},notes:{address:"Razorpay Corporate Office"},theme:{color:"blue"}},r=new Razorpay(e);r.on("payment.failed",(function(e){swal(e.error.description),swal(e.error.reason)})),r.open()}))}else swal("","try again","error")})).catch((e=>{swal(e.toString().split(":")[1],"","error").then((e=>{f(!1)}))}))}else 10!=a.value.length?swal("","provide valid phone number","error"):!o.value.length>=15?swal("","provide detailed address","error"):!r.value.length>7?swal("","invalid email","error"):0==i.value.length?swal("","Select a state","error"):swal("","provide required data to proceed","error")}else swal("No cart Data found redirecting to home"),window.location.replace("/")})),p.addEventListener("click",(()=>{setTimeout((function(){if(null!=v.OrderData&&0!=v.OrderData.length){var t=JSON.parse(v.OrderData),r=0;t.forEach((e=>{r+=e.price})),e.innerText=r}}),500)}))})();