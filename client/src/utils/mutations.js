import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;




export const SAVE_CITY = gql`
  mutation saveCity(
    $cityId: String
    $formattedAddress: String
    $cityName: String
    $countyName: String
    $stateName: String
    $countryName: String
    $latitude: Float
    $longitude: Float
  ) {
    saveCity(
      cityId: $cityId
      formattedAddress: $formattedAddress
      cityName: $cityName
      countyName: $countyName
      stateName: $stateName
      countryName: $countryName
      latitude: $latitude
      longitude: $longitude
    ) {
      _id
      username
      email
      cityCount
      savedCities {
        cityId
        formattedAddress
        cityName
        countyName
        stateName
        countryName
        latitude
        longitude       
      }
     }
  }
`;




export const REMOVE_CITY = gql`
  mutation removeCity($cityId: String!) {
    removeCity(cityId: $cityId) {
      _id
      username
      cityCount
      savedCities {
        cityId
        formattedAddress
        cityName
        countyName
        stateName
        countryName
        latitude
        longitude 
      }
    }
  }
`;