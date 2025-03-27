const axios = require('axios');

const createUserInMoodle = async (userData) => {
    const url = 'http://localhost/MyMoodleSite/webservice/rest/server.php';
    const token = 'c2358f7ae37b092cd8712d0db42ceabf'; // Ton token généré

    const data = {
        wstoken: token,
        wsfunction: 'core_user_create_users',
        moodlewsrestformat: 'json',
        'users[0][username]': userData.username,
        'users[0][password]': userData.password,
        'users[0][firstname]': userData.firstname,
        'users[0][lastname]': userData.lastname,
        'users[0][email]': userData.email
    };

    try {
        const response = await axios.post(url, new URLSearchParams(data).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        console.log('✅ Réponse complète de Moodle:', response.data);

        // Vérification si une erreur est retournée par Moodle
        if (response.data && response.data.exception) {
            console.error('❌ Erreur Moodle:', response.data.message);
            return { error: `Erreur Moodle : ${response.data.message}` };
        }

        // Vérification si l'utilisateur a bien été créé
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].id) {
            return {
                message: '✅ Utilisateur créé avec succès',
                user: response.data[0] // Retourner les infos de l'utilisateur créé
            };
        } else {
            console.error('❌ Réponse inattendue de Moodle:', response.data);
            return { error: 'Réponse invalide de Moodle, utilisateur non créé', details: response.data };
        }
    } catch (error) {
        console.error('❌ Erreur lors de la création de l\'utilisateur dans Moodle:', error.message);
        return { error: 'Erreur de connexion avec Moodle', details: error.message };
    }
};

module.exports = createUserInMoodle;
