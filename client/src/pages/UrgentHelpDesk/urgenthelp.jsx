import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import HeaderForEmergency from "../../components/headerforEmergency/headerforEmergency";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, Input ,Button} from 'antd';
import './urgenthelp.css';


const UrgentHelp = () => {
    // Define state variables for the Google Map and InfoWindow
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [sharingLocation, setSharingLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);


    // Function to start sharing the user's location
    const startLocationSharing = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
            setSharingLocation(true);
        } else {
            console.error('Geolocation is not supported in this browser.');
        }
    };

    // Function to stop sharing the user's location
    const stopLocationSharing = () => {
        setSharingLocation(false);
        setUserLocation(null);
    };


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
    // Function to make a phone call
    const makePhoneCall = (phoneNumber) => {
        window.location.href = `tel:${phoneNumber}`;
    };


    const { data, loading, error } = useFetch("/emergencyfacilities");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            render: (text, record) => (
              <span>
                {text}
                <Button
                  type="link"
                  onClick={() => makePhoneCall(text)} // Handle the phone call action here
                >
                  Make Phone Call
                </Button>
              </span>
            ),
          },
    ];


    // Handle search input change
    const [searchValue, setSearchValue] = useState(''); // State to store search value

    // Filter the data based on search value
    const filteredData = data.filter(
        (item) =>
            item.city.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.type.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Handle search input change
    const handleSearch = (value) => {
        setSearchValue(value);
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Add buttons for emergency services */}
                    <button className="headerBtn" onClick={() => makePhoneCall('110')}>Call Fire and Rescue Services (110)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('110')}>Call Medical Emergencies (110)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('118')}>Call Police (118)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('119')}>Call Police (119)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('+94112691111')}>Call Colombo Medical Emergencies (+94 11 269 1111)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('+94112421052')}>Call Tourist Police (+94 11 242 1052)</button>
                    <button className="headerBtn" onClick={() => makePhoneCall('+94112382209')}>Call Tourist Police (+94 11 238 2209)</button>
                </div>
                <div>
                    {/* ...other components... */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {/* Add a button to start/stop sharing location */}
                        {!sharingLocation ? (
                            <button className="headerBtn" style={{ backgroundColor: 'red', color: 'white' }} onClick={startLocationSharing}>Share Location</button>
                        ) : (
                            <button className="headerBtn" style={{ backgroundColor: 'red', color: 'white' }} onClick={stopLocationSharing}>Stop Sharing</button>
                        )}
                        {/* Display user's shared location */}
                        {sharingLocation && userLocation && (
                            <div>
                                <h3>Your Shared Location:</h3>
                                <p>Latitude: {userLocation.latitude}</p>
                                <p>Longitude: {userLocation.longitude}</p>
                            </div>
                        )}
                        {/* Implement a component to display trusted contacts and their shared locations */}
                    </div>
                </div>
                <br />
                <h3>Emeregency Facilities - Contact Details</h3>

                <div className="bottomAUG">
                    <div className="search-bar">
                        <Input.Search
                            placeholder="Search by city or type"
                            onSearch={handleSearch}
                            enterButton
                        />
                    </div>
                    <br /><br />
                    <Table
                        dataSource={searchValue ? filteredData : data} // Use filteredData when searchValue is not empty, otherwise use all data
                        columns={columns}
                        loading={loading}
                        pagination={false}
                    />
                </div>
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default UrgentHelp;
