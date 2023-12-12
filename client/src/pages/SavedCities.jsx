// Importing necessary React and React-Bootstrap components.
import React from "react";
import { Container, Row, Card, Col, Button } from "react-bootstrap";
// Importing Apollo Client hooks for data fetching and mutations.
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { removeCityId } from "../utils/localStorage";
import { REMOVE_CITY } from "../utils/mutations";

// savedCities component for displaying and managing user's saved cities.
const SavedCities = () => {
  // Fetching user data using Apollo Client's useQuery hook.
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};

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

      // Removing the City's ID from local storage on successful deletion.
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
      <div className="text-light bg-primary p-5 round">
        <Container>
          <h1>Viewing saved Cities!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedCities?.length
            ? `Viewing ${userData.savedCities.length} saved ${
                userData.savedCities.length === 1 ? "city" : "cities"
              }:`
            : "You have no saved cities!"}
        </h2>
        <Row>
          {userData.savedCities.map((city) => {
            return (
              <Col md="4">
                <Card key={city.cityId} border="dark">
                  <Card.Body>
                    <Card.Title>{city.formattedAddress}</Card.Title>
                    <p className="small">City: {city.cityName}</p>
                    <Card.Text>
                      <p className="small">City: {city.cityName}</p>
                      <p className="small">County: {city.countyName}</p>
                      <p className="small">State:{city.stateName}</p>
                      <p className="small">Country: {city.countryName}</p>
                      <p className="small">Latitude: {city.latitude}</p>
                      <p className="small">Longitude: {city.longitude}</p>
                    </Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteCity(city.cityId)}
                    >
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
