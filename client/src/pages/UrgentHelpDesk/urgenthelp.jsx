import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import HeaderForEmergency from "../../components/headerforEmergency/headerforEmergency";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const UrgentHelp = () => {
    // Define state variables for the Google Map and InfoWindow
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);

    // This useEffect hook runs once when the component is mounted
    useEffect(() => {
        // Function to initialize the Google Map
        function initMap() {
            const bounds = new window.google.maps.LatLngBounds();
            const markersArray = [];
            const map = new window.google.maps.Map(document.getElementById('google-map'), {
                center: { lat: 7.8731, lng: 80.7718 }, // Coordinates for Sri Lanka
                zoom: 7, // Adjust the zoom level as needed
            });

            const infoWindow = new window.google.maps.InfoWindow();

            const locationButton = document.createElement("button");
            locationButton.textContent = "Detect My Current Location";
            locationButton.classList.add("custom-map-control-button");
            map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);

            // Event listener for the "Detect My Current Location" button
            locationButton.addEventListener("click", () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent("Location found.");
                            infoWindow.open(map);
                            map.setCenter(pos);
                        },
                        () => {
                            handleLocationError(true, infoWindow, map.getCenter());
                        }
                    );
                } else {
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            });

            // Create an array of places to search for
            const placesToSearch = [
                { type: 'hospital', name: 'Hospitals' },
                { type: 'fire_station', name: 'Fire Stations' },
                { type: 'police', name: 'Police Stations' },
                { type: 'pharmacy', name: 'Pharmacies' },
            ];

            // Search for and display places
            placesToSearch.forEach((place) => {
                const request = {
                    location: map.getCenter(),
                    radius: '3000', // You can adjust the radius as needed
                    type: place.type,
                };

                const service = new window.google.maps.places.PlacesService(map);

                service.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        for (let i = 0; i < results.length; i++) {
                            createMarker(map, results[i], place.name);
                        }
                    }
                });
            });

            setMap(map);
            setInfoWindow(infoWindow);
        }

        // Helper function to create markers for places
        function createMarker(map, place, placeType) {
            const marker = new window.google.maps.Marker({
                map: map,
                position: place.geometry.location,
            });

            window.google.maps.event.addListener(marker, "click", () => {
                const content = document.createElement("div");
                const nameElement = document.createElement("h2");

                nameElement.textContent = place.name;
                content.appendChild(nameElement);

                const placeAddressElement = document.createElement("p");

                placeAddressElement.textContent = place.vicinity;
                content.appendChild(placeAddressElement);

                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });
        }

        // Create a script element to load the Google Maps JavaScript API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbEtMrpESGgw6iEoP-FujLUFyrIgkt2QY&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onload = initMap; // Call initMap after the script is loaded
        document.head.appendChild(script);

        // Cleanup function to remove the script element when the component unmounts
        return () => {
            document.head.removeChild(script);
        };
    }, []); // Empty dependency array means this effect runs only once, on component mount

    // Function to handle location errors
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    };

    return (
        <div>
            <Navbar />
            <HeaderForEmergency />
            <div className="homeContainer">
                <h1 className="homeTitle">Urgent Help</h1>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ display: 'flex', gap: '20px' }}></div>
                </div>
                <div
                    style={{
                        paddingTop: '15px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        width: '100%',
                        maxWidth: '1024px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        zIndex: '1',
                    }}
                >
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" color="textPrimary">
                                Local Emergency Contacts
                            </Typography>
                            <br />
                            <Typography variant="body1">
                                <strong>Fire and Rescue Services:</strong> Call 110.
                            </Typography>
                            <br />
                            <Typography variant="body1">
                                <strong>Medical Emergencies:</strong> Call 110.
                            </Typography>
                            <Typography variant="body2">
                                In Colombo, you can also call (+94 11) 269 1111.
                            </Typography>
                            <br />
                            <Typography variant="body1">
                                <strong>Police:</strong> Call 118 or 119 or go to your local police station.
                            </Typography>
                            <br />
                            <Typography variant="body1">
                                <strong>Tourist Police:</strong> Call (+94 11) 242 1052 or (+94 11) 238 2209.
                            </Typography>
                        </CardContent>
                    </Card>
                    <div id="google-map" style={{ height: '400px', width: '100%' }}></div>
                </div>
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default UrgentHelp;
