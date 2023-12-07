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
`;