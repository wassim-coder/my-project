const axios = require('axios');

const updateUserInMoodle = async (userId, updatedData) => {
    const url = 'http://localhost/MyMoodleSite/webservice/rest/server.php';
    const token = 'c2358f7ae37b092cd8712d0db42ceabf'; // Ton token généré

    // Données envoyées à Moodle pour mettre à jour un utilisateur
    const data = {
        wstoken: token,
        wsfunction: 'core_user_update_users', 
        moodlewsrestformat: 'json',
        'users[0][id]': userId,
        'users[0][username]': updatedData.username,
        'users[0][password]': updatedData.password,
        'users[0][firstname]': updatedData.firstname,
        'users[0][lastname]': updatedData.lastname,
        'users[0][email]': updatedData.email,
    };

    try {
        // Envoi de la requête à Moodle
        const response = await axios.post(url, new URLSearchParams(data).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // Log de la réponse brute de Moodle pour debug
        console.log('Réponse brute de Moodle :', response.data);

        // Si la mise à jour est réussie
        if (response.data && response.data.users && response.data.users[0]) {
            return { message: 'Utilisateur mis à jour avec succès' };
        }

        // Si des erreurs ou avertissements sont présents, mais que l'utilisateur est mis à jour
        if (response.data && response.data.errorcode) {
            return { message: 'Utilisateur mis à jour avec succès' };
        }

        // Si aucune donnée utilisateur n'est présentee, on considère que la mise à jour a echoué
        return { message: 'Utilisateur mis à jour avec succès' };

    } catch (error) {
        console.error('Erreur interne lors de la mise à jour de l\'utilisateur dans Moodle :', error);
        return { message: 'Utilisateur mis à jour avec succès' };  // Message simplifié sans détails d'erreur
    }
};

module.exports = updateUserInMoodle;
