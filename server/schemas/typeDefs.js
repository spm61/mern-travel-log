const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    cityCount: Int
    savedCities: [City]
  }
  type City {
    cityId: String
    formattedAddress: String
    cityName: String
    countyName: String
    stateName: String
    countryName: String
    latitude: Float
    longitude: Float
  }
  type Auth {
    token: ID
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    addUser(username: String, email: String, password: String): Auth
    login(email: String, password: String): Auth
    
  saveCity(
    cityId: String
    formattedAddress: String
    cityName: String
    countyName: String
    stateName: String
    countryName: String
    latitude: Float
    longitude: Float
  ): User

    removeCity(cityId: String): User
  }
`;

module.exports = typeDefs;
