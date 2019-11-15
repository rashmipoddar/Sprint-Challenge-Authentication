const db = require('../database/dbConfig');

const addUser = (user) => {
  return db('users').insert(user)
    .then(ids => {
      return findUserById(ids[0]);
    })
};

const findUsers = () => {
  return db('users').select('id', 'username');
};

const findUserById = (id) => {
  return db('users').where({id}).select('id', 'username').first();
};

const findUserBy = (filter) => {
  // console.log(filter);
  return db('users').where(filter);
};

module.exports = {
  addUser,
  findUsers,
  findUserById,
  findUserBy
};