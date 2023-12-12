import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Card,
  Row
} from 'react-bootstrap';

import { useQuery } from '@apollo/client';


import { saveCityIds, getSavedCityIds } from '../utils/localStorage';
import { QUERY_CITIES} from '../utils/queries';

//Setting background color to a "sand" themed color
document.body.style = 'background: #FFEED9;';

const DisplayCities = () => {
  // create state for holding returned google api data
    
   // create state to hold saved cityId values
const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  // set up useEffect hook to save `savedCityIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCityIds(savedCityIds);
  });
  
// load all saved cities
  const { loading, data } = useQuery(QUERY_CITIES);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const allSavedCities = data?.cities || [];


   // Displaying a loading message if data is not yet available.
   if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      

      <Container>
        <h2 className='pt-5'>
          {allSavedCities.length
            ? `Viewing ${allSavedCities.length} Cities logged:`
            : 'No Cities Logged!'}
        </h2>
        <Row>
        {allSavedCities.map((city) => {
      return (
        <Col md="4" key={city._id}>
          <Card border='dark'>
            {city.image ? (
              <Card.Img src={city.image} alt={`The cover for ${city.title}`} variant='top' />
            ) : null}
            <Card.Body>
              <Card.Title>{city.username}'s Trip</Card.Title>
              <Card.Text>
                {city.savedCities && city.savedCities.length > 0 && city.savedCities[0].cityName && city.savedCities[0].cityName.length > 0 ? (
              <div><p className='large'>City: {city.savedCities[0].cityName}</p>
                  <p className='large'>County: {city.savedCities[0].countyName}</p>
                  <p className='large'>State:{city.savedCities[0].stateName}</p>
                  <p className='large'>Country: {city.savedCities[0].countryName}</p>
                  <p className='large'>Latitude: {city.savedCities[0].latitude}</p>
                  <p className='large'>Longitude: {city.savedCities[0].longitude}</p></div>
                ) : (
                  <div><p className='large'>City: Not Available</p>
                  <p className='large'>County: Not Available</p>
                  <p className='large'>State:Not Available</p>
                  <p className='large'>Country: Not Available</p>
                  <p className='large'>Latitude: Not Available</p>
                  <p className='large'>Longitude: Not Available</p></div>
                )}

              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        );
      })
    }
        </Row>
      </Container>
    </>
  );
};

export default DisplayCities;
