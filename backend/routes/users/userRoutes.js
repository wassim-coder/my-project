// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const createUserInMoodle = require('./createUser');
const updateUserInMoodle = require('./updateUser');
const deleteUserInMoodle = require('./deleteUser');
const getUserFromMoodle = require('./getUserFromMoodle'); // Assure-toi que cette fonction est bien définie ok


// Route pour créer un utilisateur
router.post('/', async (req, res) => {
    const { username, password, firstname, lastname, email } = req.body;

    if (!username || !password || !firstname || !lastname || !email) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        const newUser = await createUserInMoodle({ username, password, firstname, lastname, email });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// Route pour mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    const userId = req.params.id;

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'ID invalide' });
    }

    const { username, password, firstname, lastname, email } = req.body;

    if (!username || !password || !firstname || !lastname || !email) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        const updatedUser = await updateUserInMoodle(userId, { username, password, firstname, lastname, email });
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
});

// Route pour supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'ID invalide' });
    }

    try {
        const deletedUser = await deleteUserInMoodle(userId);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

// Route pour récupérer un utilisateur depuis Moodle par ID
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId; // Récupérer l'ID de l'utilisateur à partir de l'URL
    
    try {
        const result = await getUserFromMoodle(userId);
        if (result.user) {
            res.json(result);  // Si l'utilisateur est trouvé, on retourne les informations
        } else {
            res.status(404).json({ error: result.error || 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur', details: error.message });
    }
});



module.exports = router;
