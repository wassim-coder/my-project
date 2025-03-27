const axios = require('axios');

// Fonction pour récupérer un utilisateur depuis Moodle
const getUserFromMoodle = async (userId) => {
    const url = 'http://localhost/MyMoodleSite/webservice/rest/server.php'; // URL de ton Moodle
    const token = 'c2358f7ae37b092cd8712d0db42ceabf'; // Ton token d'authentification

    const data = {
        wstoken: token,
        wsfunction: 'core_user_get_users',
        moodlewsrestformat: 'json',
        'criteria[0][key]': 'id',
        'criteria[0][value]': userId,
    };

    try {
        // Envoi de la requête POST à Moodle pour récupérer un utilisateur
        const response = await axios.post(url, new URLSearchParams(data).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // Vérifier si la réponse contient des utilisateurs
        if (response.data && response.data.users && response.data.users.length > 0) {
            return {
                message: 'Utilisateur récupéré avec succès',
                user: response.data.users[0], // Retourne les informations du premier utilisateur
            };
        } else {
            return {
                error: 'Utilisateur non trouvé', // L'utilisateur n'a pas été trouvé
            };
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur dans Moodle :', error);

        // Gestion des erreurs en fonction de la nature de l'erreur
        if (error.response) {
            return {
                error: 'Erreur HTTP lors de la requête', // Erreur liée à la réponse du serveur Moodle
                details: error.response.data,
            };
        } else if (error.request) {
            return {
                error: 'Erreur de communication avec le serveur', // Erreur de connexion au serveur
            };
        } else {
            return {
                error: 'Erreur inconnue lors de la récupération de l\'utilisateur', // Erreur inconnue
                details: error.message,
            };
        }
    }
};

module.exports = getUserFromMoodle;
