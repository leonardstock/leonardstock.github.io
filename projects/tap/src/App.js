import React, { useState, useEffect } from "react";


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
      'DHL-API-KEY': 'SIKJ1GBuaFck4gd3hzr5IezIwfH2zelZ'
    }
    async function trackParcel() {
      const response = await fetch('https://api-eu.dhl.com/track/shipments?trackingNumber=' + trackingnumber, { headers: dhlHeaders });
      const data = await response.json();
      debugger;
      setResult(data);
    }
    trackParcel();
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
    <div>
      <h1>Welcome to <span>T</span>rack<span>A</span>ll<span>P</span>arcels</h1>
      <form onSubmit={trackParcel}>
        <select onChange={handleDelServSetting}>
          <option>DHL</option>
          <option>UPS</option>
          <option>Hermes</option>
        </select>
        <input id="trackingInput" onChange={handleTrackingnumber} defaultValue="00340434292135100148" />
        <input type="submit" onSubmit={trackParcel} />
        <textarea value={result} readOnly={true} />
      </form>
      <form>
        <h4>Destination</h4>
        <label htmlFor="destinationCountryCodeInput">Destination Country Code: </label>
        <input id="destinationCountryCodeInput" value={destination.countryCode} readOnly={true} />

        <h4>Origin</h4>
        <label htmlFor="originCountryCodeInput">Origin Country Code: </label>
        <input id="originCountryCodeInput" value={origin.countryCode} readOnly={true} />

        <h4>Details</h4>
        <label htmlFor="productInput">Product Type: </label>
        <input id="productInput" value={parcelDetails.product.productName} readOnly={true} />
        <label htmlFor="amountOfParcelsInput">Total number of parcels: </label>
        <input id="amountOfParcelsInput" value={parcelDetails.totalNumberOfPieces} readOnly={true} />
        <label htmlFor="weightInput">Weight: </label>
        <input id="weightInput" value={parcelDetails.weight.value + parcelDetails.weight.unitText} readOnly={true} />

        <h4>Status</h4>
        <label htmlFor="statusInput">Events: </label>
        <input id="statusInput" value={events} readOnly={true} />
      </form>
    </div>
  )
}