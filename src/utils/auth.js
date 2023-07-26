export const BASE_URL = 'https://auth.nomoreparties.co';

function answerHandle(serverAnswer){
  if (serverAnswer.ok) {
    return serverAnswer.json();
  }
  return Promise.reject(`Error: ${serverAnswer.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password, 
      email: email})
  })
  .then(answerHandle);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(answerHandle)
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(answerHandle)
} 