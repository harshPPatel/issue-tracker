import './js/app';
import './scss/main.sass';
// import './json/users.json';
import './video/header-bg.mp4';

const users = fetch('./json/users.json')
  .then((res) => res.json())
  .then((res) => console.log(res));

const perosn = {
  name: 'harsh',
  age: 12,
};

// console.log(users);
users();