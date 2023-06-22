import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchLocationData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  const fetchLocationData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const city = getAddressComponentValue(addressComponents, 'locality');
        const country = getAddressComponentValue(
          addressComponents,
          'country'
        );

        setCity(city);
        setCountry(country);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const getAddressComponentValue = (addressComponents, type) => {
    const component = addressComponents.find(
      (component) => component.types.indexOf(type) !== -1
    );
    return component ? component.long_name : '';
  };

  return (
    <div>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>City: {city}</p>
          <p>Country: {country}</p>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default YourComponent;
