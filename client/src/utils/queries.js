import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
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
`
export const QUERY_CITIES = gql`
  query getCities {
    cities{
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
  }`

  export const QUERY_APIKEY = gql`
  query getAPIKey {
    apikey{
      apikey
    }
  }`
;