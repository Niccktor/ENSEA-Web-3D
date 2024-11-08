const express = require("express");
const router = express.Router();
const { getAllUsers, getUsersByID,createNewUser, updateUser, deleteUser } = require("../controllers/usersControllers");

// Route GET pour récupérer tous les utilisateurs
router.get("/users", getAllUsers);

// Route GET pour récupérer un utilisateur par ID
router.get("/users/:id", getUsersByID);

// Route POST pour créer un nouvel utilisateur
router.post("/users", createNewUser);

// Route PUT pour mettre à jour un utilisateur par ID
router.put("/users/:id", updateUser);

// Route DELETE pour supprimer un utilisateur par ID
router.delete("/users/:id", deleteUser);

module.exports = router;
