import React, { useState } from 'react';

const axiosWithAuth = require('../utils/axiosWithAuth');

const Register = () => {
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setCredentials({
      ...credentials, 
      [event.target.name] : event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/auth/register', credentials)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return(
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name='username'
        value={credentials.username}
        onChange={handleChange}
      />
      <input 
        type='password'
        name='password'
        value={credentials.password}
        onChange={handleChange}
      />
    </form>
  ) 
}

export default Register;