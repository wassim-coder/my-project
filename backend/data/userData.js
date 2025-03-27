// data/userData.js
const User = require('../models/User');

let users = [
    new User(
        1, 
        'csakly', 
        'VotreMotDePasserr7@', 
        'sakly', 
        'chedy', 
        'csakly2@gmail.com',
        'c2358f7ae37b092cd8712d0db42ceabf', 
        'json', 
        'core_user_create_users'
    )
];

const getAllUsers = () => users;

const getUserById = (id) => users.find(user => user.id === parseInt(id));

const addUser = (username, password, firstname, lastname, email, wstoken, moodlewsrestformat, wsfunction) => {
    const newUser = new User(users.length + 1, username, password, firstname, lastname, email, wstoken, moodlewsrestformat, wsfunction);
    users.push(newUser);
    return newUser;
};

const updateUser = (id, username, password, firstname, lastname, email, wstoken, moodlewsrestformat, wsfunction) => {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], username, password, firstname, lastname, email, wstoken, moodlewsrestformat, wsfunction };
    return users[userIndex];
};

module.exports = { getAllUsers, getUserById, addUser, updateUser };
