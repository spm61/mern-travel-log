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

const apiKey = "AIzaSyDwkYPjXsxzUOY4rsDbJh0yY_uksIYMPY0"; //google api key

//    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(userInput)}&inputtype=textquery&fields=name,rating,formatted_address&key=${apiKey}`;

export const searchGooglePlaces = (query) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`);

};








