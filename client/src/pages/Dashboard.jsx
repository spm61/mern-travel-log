// Importing necessary React and React-Bootstrap components.
import React from "react";
import { Container, Form, Row, Card, Col, Button } from "react-bootstrap";
// Importing Apollo Client hooks for data fetching and mutations.
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { removeCityId } from "../utils/localStorage";
import { REMOVE_CITY, SAVE_CITY } from "../utils/mutations";

import { QUERY_CITIES} from '../utils/queries';

import { QUERY_APIKEY} from '../utils/queries';

import { searchGooglePlaces } from '../utils/API';
import { saveCityIds, getSavedCityIds } from '../utils/localStorage';


// savedCities component for displaying and managing user's saved citiess.
const SavedCities = () => {

    // create state for holding returned google api data
    const [searchedCities, setSearchedCities] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');
  
  


    // Set up the mutation with error handling support.
    // The useMutation hook allows providing the refetchQueries option to refetch specific queries after a mutation
    // This is useful to ensure that new data is displayed automatically. Otherwise, we would need to manually update the list at a higher component level, modify state, or implement custom caching behavior
    
    const [saveCity] = useMutation(SAVE_CITY);


  // create state to hold saved cityId values
  const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  // set up useEffect hook to save `savedCityIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCityIds(savedCityIds);
  });
  

  const { loading: loadingCities, data: dataCities } = useQuery(QUERY_CITIES);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const allSavedCities = dataCities?.cities || [];


  const { loading: loadingApi, data: apiData } = useQuery(QUERY_APIKEY);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const apikey = apiData?.apikey.apikey || [];
  console.log("savedcities.jsx apikey:" + apikey)




  // Fetching user data using Apollo Client's useQuery hook.
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};


// create method to search for cities and set state on form submit
const handleFormSubmit = async (event) => {
  event.preventDefault();

  if (!searchInput) {
    return false;
  }

  try {


    console.log("savedcities.jsx apikey search google: " + apikey)
    const response = await searchGooglePlaces(searchInput, apikey);

    if (!response.ok) {
      throw new Error('something went wrong!');
    }

    const {results} = await response.json();

      const cityData = results.map((city) => ({
        cityId: city.place_id,
        formattedAddress: city.formatted_address,
        cityName: city.address_components[0].long_name,
        countyName: city.address_components[1].long_name,
        stateName: city.address_components[2].long_name,
        countryName: city.address_components[3].long_name,
        latitude: city.geometry.location.lat,
        longitude: city.geometry.location.lng,
    }));

    setSearchedCities(cityData);
    setSearchInput('');
  } catch (err) {
    console.error(err);
  }
};



  // create function to handle saving a city to our database
  const handleSaveCity = async (cityId) => {
    // find the city in `searchedCities` state by the matching id
    const cityToSave = searchedCities.find((city) => city.cityId === cityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("searchcities.jsx token:" + JSON.stringify(token))
    if (!token) {
      return false;
    }

    try {
     
     const response = await saveCity({ variables: cityToSave, token} );

      // if city successfully saves to user's account, save city id to state
      setSavedCityIds([...savedCityIds, cityToSave.cityId]);
    } catch (err) {
      console.error(err);
    }
  };


  // Setting up a mutation for removing a city.
  const [removeCity] = useMutation(REMOVE_CITY);

  // Function to handle city deletion both from database and local storage.
  const handleDeleteCity = async (cityId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Attempting to remove the city using the removeCity mutation.
      const { data } = await removeCity({ variables: { cityId } });

      if (!data) {
        throw new Error("something went wrong!");
      }

      // Removing the city's ID from local storage on successful deletion.
      removeCityId(cityId);
    } catch (err) {
      console.error(err);
    }
  };

  // Displaying a loading message if data is not yet available.
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Rendering the saved cities using a Card layout.
  return (
    <>
             <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Locations</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a location'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>



      <Container>
        <h2 className='pt-5'>
          {searchedCities.length
            ? `Viewing ${searchedCities.length} results:`
            : 'Search for a new City!'}
        </h2>
        <Row>
          {searchedCities.map((city) => {
            return (
              <Col md="4" key={city.cityId}>
                <Card border='dark'>
                  {city.image ? (
                    <Card.Img src={city.image} alt={`The cover for ${city.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{city.formattedAddress}</Card.Title>

                    <Card.Text>
                    <p className='small'>City: {city.cityName}</p>
                    <p className='small'>County: {city.countyName}</p>
                    <p className='small'>State:{city.stateName}</p>
                    <p className='small'>Country: {city.countryName}</p>
                    <p className='small'>Latitude: {city.latitude}</p>
                    <p className='small'>Longitude: {city.longitude}</p>
                    </Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCityIds?.some((savedCityId) => savedCityId === city.cityId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveCity(city.cityId)}>
                        {savedCityIds?.some((savedCityId) => savedCityId === city.cityId)
                          ? 'This location has already been saved!'
                          : 'Save this location!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>





      <div fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s saved Cities!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedCities?.length
            ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? "city" : "cities"}:`
            : "You have no saved cities!"}
        </h2>
          <Row>
          {userData.savedCities.map((city) => {
            return (
              <Col md="4">
                <Card key={city.cityId} border='dark'>
                  <Card.Body>
                    <Card.Title>{city.formattedAddress}</Card.Title>
                    <p className='small'>City: {city.cityName}</p>
                    <Card.Text>
                    <p className='small'>City: {city.cityName}</p>
                    <p className='small'>County: {city.countyName}</p>
                    <p className='small'>State:{city.stateName}</p>
                    <p className='small'>Country: {city.countryName}</p>
                    <p className='small'>Latitude: {city.latitude}</p>
                    <p className='small'>Longitude: {city.longitude}</p>
                    </Card.Text>

                    <Button className='btn-block btn-danger' onClick={() => handleDeleteCity(city.cityId)}>
                      Delete this City!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedCities;
