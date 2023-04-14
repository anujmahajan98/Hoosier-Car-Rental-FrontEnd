import React from "react";
import {Row,Col,Container,Button,ButtonGroup} from 'react-bootstrap'
import { Route, Switch, useLocation } from "react-router-dom";
import { useState } from "react";
import CarListingForm from "./CarListingForm";
import {BrowserRouter as Router} from "react-router-dom";
import ownerBookingDetails from "./ownerBookingDetails";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  LoadScript,
} from "@react-google-maps/api";
var center = { lat: 10.222, lng: 86.5264 };


const OwnerView = ({history}) => {
  const location = useLocation();
  const userEmail = location.state?.data;
  const [booking, setBooking] = useState([]);
  const [bookingData, setBookingData] = useState(false);

  const [map, setMap] = useState(null);
  const [showMap, setShowMap] = useState(false);
  var [center, setCenter] = useState({})

  console.log(userEmail)

    const showBookings = (event) => {
      setBookingData(!bookingData);
      setShowMap(false);
      fetch('https://hoosierbackend.azurewebsites.net/ownerBookingDetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail })
        })
        .then(response => response.text())
          .then(data => {
            console.log(data)
            setBooking(JSON.parse(data))
            console.log(booking);
          })
        .catch(error => {
          console.error(error);
        });
    };

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDAbR2m3Yesmhels4nOYKtqKG3CxUt2ixw",
        libraries: ["places"],
      });

    const showLocation = (event, email) => {
        var password = "";
        // var email = "Anuj12@gmail.com"
        setShowMap(!showMap);
        fetch('https://hoosierbackend.azurewebsites.net/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password })
              })
              .then(response => response.json())
                .then(data => {
                    console.log(data)
                  if(data.length > 0)
                  {
                    console.log(center)
                    center = { lat:  data[0].lattitude, lng : data[0].longitude}
                    setCenter(center);
                    console.log(center)
                  }else{
                    center = { lat: 10.222, lng: 86.5264 }
                    setCenter(center);
                  }
                })
                .catch(error => {
                  console.error(error);
                  // handle error here
                });
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";




  return (
      <>
      <Container>
          <Row>
              <Col>
                <h1 className="text-center bg-dark text-light p-2">OWNER VIEW</h1>
                <Col md={8}>
                        <Button onClick={() => history.push('/OwnerView/CarListingForm', { data: userEmail })}>Add a new Post</Button>{" "} 
                        {/* <Button onClick={() => history.push('/OwnerView/ownerBookingForm', { data: userEmail })}>View Bookings</Button>{" "} */}
                        <Button onClick={(event) => showBookings(event)} style={{marginBottom: '20px'}}>View Bookings</Button>{" "}
                </Col>
                <Col md={8}>

                    <Switch>
                      <Route path="/OwnerView/CarListingForm" component={CarListingForm} exact/>
                      <Route path="/OwnerView/ownerBookingForm" component={ownerBookingDetails} exact/>
                    </Switch>
                </Col>
              </Col>
              
          </Row>

        <Row>
          <Col>
              {bookingData &&
              <div className="columns">
                <div className="column">
                  <table>
                    <thead>
                      <tr>
                        <th>Renter</th>
                        <th>Car Model</th>
                        <th>Car Name</th>
                        <th>Car Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking &&
                        booking.map((item) => (
                          <tr key={item._id}>
                            <td style={{ border: "1px solid black" }}>{item.userEmail}</td>
                            <td style={{ border: "1px solid black" }}>{item.carModel ? item.carModel : "-"}</td>
                            <td style={{ border: "1px solid black" }}>{item.carName ? item.carName : "-"}</td>
                            <td style={{ border: "1px solid black" }}>{item.carNumber ? item.carNumber : "-"}</td>
                            <td style={{border : "1px solid black"}}>
                              <Button variant="success" onClick={(event) => showLocation(event, item.userEmail)}>see Location</Button> </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              }
            </Col>
            <Col md={4}>
              {showMap &&
                <div style={{height:'350px', width: '40%'}}>
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={(map) => setMap(map)}>
                        {/* {center.lat && center.lng && <Marker position={center} />} */}
                        {center.lat && center.lng && <Marker
            position={{ lat: center.lat, lng: center.lng }}
            map={map}
          />} 
                    </GoogleMap>
                </div>
                }
              </Col>
        </Row>
      </Container>
      </>
  );
};

export default OwnerView;