import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, FloatingLabel, Container } from 'react-bootstrap';


export function App(props) {

	const [deliveryservice, setDeliveryservice] = useState("");
	const [trackingnumber, setTrackingNumber] = useState("");
	const [result, setResult] = useState("");
	const [destination, setDestination] = useState("");
	const [origin, setOrigin] = useState("");
	const [parcelDetails, setParcelDetails] = useState({
		product: {
			productName: ""
		},
		weight: {
			value: 0,
			unitText: ""
		}
	});
	const [status, setStatus] = useState("");
	const [events, setEvents] = useState([]);

	function handleDelServSetting(event) {
		setDeliveryservice(event.target.value);
	}

	function handleTrackingnumber(event) {
		setTrackingNumber(event.target.value);
	}

	function trackParcel(event) {
		debugger;
		event.preventDefault();
		const dhlHeaders = {
			'DHL-API-KEY': ' IjuJE9r7GAVt9FuOSK2clFaqSTuY58cl'
		}
		async function trackParcelAsync() {
			const response = await fetch('https://api-eu.dhl.com/track/shipments?trackingNumber=' + trackingnumber, { headers: dhlHeaders });
			const data = await response.json();
			debugger;
			setResult(data);
		}
		trackParcelAsync();
	}

	useEffect(() => {
		fillStates();
	}, [result])


	function fillStates() {
		let obj = result;
		if (!obj) {
			return;
		}
		let parcel = obj.shipments[0];
		setDestination(parcel.destination.address);
		setOrigin(parcel.origin.address);
		setParcelDetails(parcel.details);
		setStatus(parcel.status);

		if (parcel.events) {

		}
		setEvents(parcel.events);
	}

	return (
		<Container>
			<h1 className="text-center mb-3">Welcome to Track All Parcels</h1>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Please choose your delivery service</Form.Label>
					<Form.Select onChange={handleDelServSetting}>
						<option>DHL</option>
						<option>UPS</option>
						<option>Hermes</option>
					</Form.Select>
				</Form.Group>

				<Form.Group>
					<FloatingLabel
						label="Please enter your tracking number"
						className="mb-3">
						<Form.Control type="text" defaultValue="7777777770" placeholder="Tracking number" onChange={handleTrackingnumber} />
					</FloatingLabel>
				</Form.Group>

				<Form.Group className="text-center mb-3">
					<Button variant="primary" type="submit" size="lg" onClick={trackParcel}>
						Track Parcel
					</Button>
				</Form.Group>

				<Form.Control as="textarea" value={JSON.stringify({result})} readOnly />
			</Form>

			<Form>
				<Form.Group className="mb-3">
					<h4 className="text-center ">Destination</h4>
					<Form.Label >Destination:</Form.Label>
					<Form.Control value={destination.addressLocality} readOnly/>
				</Form.Group>

				<Form.Group className="mb-3">
					<h4 className="text-center ">Origin</h4>
					<Form.Label>Origin:</Form.Label>
					<Form.Control value={origin.addressLocality} readOnly/>
				</Form.Group>

				{/* <Form.Group className="mb-3">
					<h4 className="text-center mb-3">Details</h4>
					<Form.Label >Product Type:</Form.Label>
					<Form.Control value={parcelDetails.product.productName} readOnly/>
					<Form.Label >Total number of parcels:</Form.Label>
					<Form.Control value={parcelDetails.totalNumberOfPieces} readOnly/>
					<Form.Label >Weight:</Form.Label>
					<Form.Control value={parcelDetails.weight.value + parcelDetails.weight.unitText} readOnly/>
				</Form.Group> */}

				<Form.Group className="mb-3">
					<h4 className="text-center ">Status</h4>
					<Form.Label >Last status:</Form.Label>
					<Form.Control as="textarea" value={status.description} readOnly/>
					<Form.Label >All status:</Form.Label>
					<Form.Control as="textarea" value={JSON.stringify({events})} readOnly/>
				</Form.Group>
			</Form>
		</Container>
	)
}