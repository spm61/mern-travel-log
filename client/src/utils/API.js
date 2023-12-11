

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save city data for a logged in user
export const saveCity = (cityData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cityData),
  });
};

// remove saved city data for a logged in user
export const deleteCity = (cityId, token) => {
  return fetch(`/api/users/cities/${cityId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};



export const searchGooglePlaces = (query, apiKey2) => {


  //console.log("api.js apikey" + apiKey)
  //console.log("api.js query" + query)
  //console.log("api.js fethstring 1: https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&key=" + apiKey)
  //console.log("api.js fethstring 2: https://maps.googleapis.com/maps/api/geocode/json?address=" + query + "&key=" + apiKey2)

  
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey2}`);

};








