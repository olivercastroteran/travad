import { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';
import { Header, List, Map } from './components';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [childClick, setChildClick] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // console.log(bounds);
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setIsLoading(false);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item sx={12} md={4}>
          <List places={places} childClick={childClick} isLoading={isLoading} />
        </Grid>
        <Grid item sx={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClick={setChildClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
