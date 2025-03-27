// routes/deleteUser.js
const axios = require('axios');

const deleteUserInMoodle = async (userId) => {
    const url = 'http://localhost/MyMoodleSite/webservice/rest/server.php';
    const token = 'c2358f7ae37b092cd8712d0db42ceabf'; // Ton token généré
    const data = {
        wstoken: token,
        wsfunction: 'core_user_delete_users', // Fonction de l'API pour supprimer un utilisateur
        moodlewsrestformat: 'json',
        'userids[0]': userId,
    };

    try {
        const response = await axios.post(url, new URLSearchParams(data).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur dans Moodle :', error);
        throw error;
    }
};

module.exports = deleteUserInMoodle;
