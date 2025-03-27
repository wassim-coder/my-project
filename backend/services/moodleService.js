const axios = require('axios');

const MOODLE_URL = "http://localhost/MyMoodleSite/webservice/rest/server.php";
const MOODLE_TOKEN = "c2358f7ae37b092cd8712d0db42ceabf"; // Token fixe

const createMoodleUser = async (user) => {
    try {
        const data = new URLSearchParams({
            wstoken: MOODLE_TOKEN,
            moodlewsrestformat: "json",
            wsfunction: "core_user_create_users",
            'users[0][username]': user.username,
            'users[0][password]': user.password,
            'users[0][firstname]': user.firstname,
            'users[0][lastname]': user.lastname,
            'users[0][email]': user.email
        });

        const response = await axios.post(MOODLE_URL, data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log("Réponse Moodle:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur Moodle:", error.response ? error.response.data : error.message);
        return { error: "Échec de la création de l'utilisateur Moodle" };
    }
};

module.exports = { createMoodleUser };
