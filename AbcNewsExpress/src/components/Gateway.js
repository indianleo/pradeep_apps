export function gateway( data ){
	/*
		To process PayPal payments, we provide API users with our PayPal Direct checkout flow 
		which can be accessed by simply adding an additional parameter paypal_direct with a 
		value of “Y” to a standard Standard Checkout payment form or link. As long as all 
		of the required parameters are passed, the user will be redirected directly to PayPal
		to complete their payment.

		Example PayPal Direct failure URL
			https://www.example.com/cart?paypal_direct=fail

		Example PayPal Direct cancel URL
			https://www.example.com/cart?paypal_direct=cancel

	*/
	let html = `
		<!doctype html>
			<head>
				<title> Payement System</title>
				<style>
					.submit_btn{
						height : 30px;
						width : auto;
						border-raidus : 3px;
						border: 1px solid #ccc;
					}
				</style>
			</head>
			<body>
				<View>
					<table border="1">
						<tr>
							<td>Name on Card</td>
							<td>${data.name}</td>
						</tr>
						<tr>
							<td>Bid Count</td>
							<td>${data.bids}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>${data.email}</td>
						</tr>
						<tr>
							<td>Contact NO.</td>
							<td>${data.contact}</td>
						</tr>
						<tr>
							<td>Stree Address</td>
							<td>${data.addess}</td>
						</tr>
						<tr>
							<td>Area</td>
							<td>${data.area}</td>
						</tr>
						<tr>
							<td>Zip Code</td>
							<td>${data.zip}</td>
						</tr>
						<tr>
							<td>City</td>
							<td>${data.city}</td>
						</tr>
						<tr>
							<td>State</td>
							<td>${data.state}</td>
						</tr>
						<tr>
							<td>Country</td>
							<td>${data.country}</td>
						</tr>
					</table>
				</View>
				<View>
					<form action="https://www.2checkout.com/checkout/purchase" method="post">
					  <input name="sid" type="hidden" value="1817037">
					  <input name="mode" type="hidden" value="2CO">
					  <input name="return_url" type="hidden" value="https://www.example.com/cart/">
					  <input name="li_0_name" type="hidden" value="invoice@ABC">
					  <input name="li_0_price" type="hidden" value="${data.bids}">
					  <input name="card_holder_name" type="hidden" value="${data.name}">
					  <input name="street_address" type="hidden" value="${data.addess}">
					  <input name="street_address2" type="hidden" value="${data.area}">
					  <input name="city" type="hidden" value="${data.city}">
					  <input name="state" type="hidden" value="${data.state}">
					  <input name="zip" type="hidden" value="${data.zip}">
					  <input name="country" type="hidden" value="${data.country}">
					  <input name="email" type="hidden" value="${data.email}">
					  <input name="phone" type="hidden" value="${data.contact}">
					  <input name="ship_name" type="hidden" value="ABC News Express">
					  <input name="ship_street_address" type="hidden" value="24 A MG  Road">
					  <input name="ship_street_address2" type="hidden" value="Civil Lines">
					  <input name="ship_city" type="hidden" value="Allahabad">
					  <input name="ship_state" type="hidden" value="Uttar Pradesh">
					  <input name="ship_zip" type="hidden" value="211006">
					  <input name="ship_country" type="hidden" value="India">
					  <input name="paypal_direct" type="hidden" value="Y">
					  <input type="submit" class="submit_btn" value="Submit Payment">
					</form>
				</View>
			</body>
		</html>
	`;

	return html;
}