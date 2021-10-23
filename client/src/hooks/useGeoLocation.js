<<<<<<< HEAD
import { useState, useEffect } from 'react';

// COULD DO WITH AN ERROR MESSAGE FOR IF A COMPUTER OR BROWSER WON'T LET THE GEOLOCATION WORK
=======
import React, { useState, useEffect } from 'react';
>>>>>>> backend

const useGeoLocation = () => {
  const [userLocation, setUserLocation] = useState({
    available: false,
    //lat,lng
    coordinates: { lat: '', lng: '' },
  });

  const success = (location) => {
    // location.coords.latitude
    setUserLocation({
      available: true,
      //browser is fetching geolocation data swapped.. this is way i also swap here
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const error = (error) => {
    setUserLocation({
      available: true,
      error,
    });
  };

  useEffect(() => {
    //if browser doesn't support geolocation
<<<<<<< HEAD
    console.log('useefect inside usegeolocation hook');
=======
    // console.log('useefect inside usegeolocation hook');
>>>>>>> backend
    if (!navigator.geolocation) {
      setUserLocation((prevState) => ({
        ...prevState,
        available: true,
        error: {
          code: 0,
          message: 'Geolocation not supported',
        },
      }));
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return userLocation;
};

export default useGeoLocation;
