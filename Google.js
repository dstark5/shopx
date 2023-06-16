const { GoogleSpreadsheet } = require('google-spreadsheet');
const google = new GoogleSpreadsheet(process.env.sheet_id);



async function googleInit(){
	await google.useServiceAccountAuth({
	  client_email: process.env.client_email,
	  private_key: process.env.private_key,
	});
}

async function storeDataToGoogle(data,order_id){
	await googleInit();
	await google.loadInfo();
			const sheet = google.sheetsByIndex[0];
			if(order_id==undefined){
				order_id="undefined"
			}
			await sheet.addRow({"cartdata":JSON.stringify(data.cartData),
					"name":data.userData.name,"email":data.userData.email,
					"phone":data.userData.phone,"address":data.userData.address,
					"address2":data.userData.address2,"city":data.userData.city,
					"state":data.userData.state,"pincode":data.userData.pincode,
					"orderid":order_id});
}



async function storeOrderToGoogle(data,payment,paymentdata){
	await googleInit();
	await google.loadInfo();
	if(payment=="cod"){
			const sheet = google.sheetsByIndex[1];
			await sheet.addRow({"cartdata":JSON.stringify(data.cartData),
				"name":data.userData.name,"email":data.userData.email,
				"phone":data.userData.phone,"address":data.userData.address,
				"address2":data.userData.address2,"city":data.userData.city,
				"state":data.userData.state,"pincode":data.userData.pincode,
				"payment":"Cash on Delivery","paymentdata":paymentdata});
		}else{
			const sheet = google.sheetsByIndex[1];
			await sheet.addRow({"cartdata":JSON.stringify(data.cartData),
					"name":data.userData.name,"email":data.userData.email,
					"phone":data.userData.phone,"address":data.userData.address,
					"address2":data.userData.address2,"city":data.userData.city,
					"state":data.userData.state,"pincode":data.userData.pincode,
					"payment":"razorpay","paymentdata":JSON.stringify(paymentdata)});
		}
}


module.exports = {
    storeDataToGoogle,
    storeOrderToGoogle,
};
