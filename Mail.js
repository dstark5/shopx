var nodemailer=require("nodemailer")

var mail=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.gmailAddress,
    pass: process.env.gmailPassword
  }
});


function OrderMail(response,paymentMethod,paymentdata){
	var MailSettings = {
			  from: process.env.gmailAddress,
			  to: req.body.data.userData.email,
			  subject: 'Sending Email using Node.js',
			  html: jsonToHtml(response,paymentMethod,paymentdata)
		}


		mail.sendMail(MailSettings,(error, info)=>{
			  if (error) {
			    console.log(error);
			  } else {
			    console.log(info.response);
			  }
		});
}


function jsonToHtml(data,payment,paymentdata){
	var html=["<html><head>"];
	
	var style=`<style>
						#body{border-radius:15px;padding:25px;background-image:linear-gradient(to bottom right,violet,blue);color:white;}
						ul{list-style-type: none;font-weight:bold;}
						h3,h4,li,h5,th,td{color:white !important;}
						table{border: 1px solid rgba(255,255,255,0.2);border-collapse: separate;width:55%;border-radius:5px;}
						td, th {border: 0.5px solid rgba(255,255,255,0.1);text-align:center;padding:5px;}
						</style></head><body id="body">`

	html.push(style)
	html.push("<div><h3 style='text-align:center;'>Hey we received a order! <h3></div>")
	html.push("<div><h4>Cartdata</h4><table>")
	html.push("<tr><th>quality</th><th>qty</th><th>price</th></tr>")

	data.cartData.forEach(e=>{
		if(e.qty==500){
			var x=`<tr><td>${e.quality}</td>
  				<td>${e.qty} g</td>
    			<td>${e.price}</td></tr>`
    		}else{
    			var x=`<tr><td>${e.quality}</td>
  				<td>${e.qty} kg</td>
    			<td>${e.price}</td></tr>`
    		}
		

		html.push(x);
		
	})

	html.push("</table></div><div><h4>Userdata</h4>")

	var x=`<ul><li>Name : ${data.userData.name}</li>
					<li>Email : ${data.userData.email}</li>
					<li>Phone : ${data.userData.phone}</li>
					<li>Address : ${data.userData.address}</li>
					<li>Address2 : ${data.userData.address2}</li>
					<li>City : ${data.userData.city}</li>
					<li>State : ${data.userData.state}</li>
					<li>Pincode :${data.userData.pincode}</li></ul></div>`;
	html.push(x);
	html.push(`<div><h3>Payment Method</h3><h5>${payment}</h5></div>`)
	if(paymentdata!=undefined){
		var z=`<div><h5>paymentId : ${paymentdata.razorpay_payment_id}</h5>
					<h5>orderId : ${paymentdata.razorpay_order_id}</h5></div>`
		html.push(z)
	}
	html.push("</body></html>")
	return html.join("");

}

module.exports={
	OrderMail
}
