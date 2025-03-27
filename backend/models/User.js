// models/User.js
class User {
    constructor(id, username, password, firstname, lastname, email, wstoken, moodlewsrestformat, wsfunction) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.wstoken = wstoken;
        this.moodlewsrestformat = moodlewsrestformat;
        this.wsfunction = wsfunction;
    }
}

module.exports = User;
