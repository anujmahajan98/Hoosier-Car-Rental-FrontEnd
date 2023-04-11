import React, { useState } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    LoadScript,
  } from "@react-google-maps/api";
var center = { lat: 10.222, lng: 86.5264 };


function Maps() {
    const [map, setMap] = useState(null);
    const [showMap, setShowMap] = useState(false);
    var [center, setCenter] = useState({})

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDAbR2m3Yesmhels4nOYKtqKG3CxUt2ixw",
        libraries: ["places"],
      });

    const showLocation = (event) => {
        var password = "";
        var email = "Anuj12@gmail.com"
        setShowMap(!showMap);
        fetch('http://localhost:8000/login', {
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
                  }
                })
                .catch(error => {
                  console.error(error);
                  // handle error here
                });
    };

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";


    return(
        <div>
            <div className="login-button">
                <button onClick={(event)=>showLocation(event)} type="submit" class="btn">Show Location</button>
            </div>
            {showMap &&
            <div style={{height:'400px', width: '50%'}}>
                <h1>Hi There</h1>
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
                    {center.lat && center.lng && <Marker position={center} />}
                </GoogleMap>
            </div>
            }
        </div>
     )

}

export default Maps;


