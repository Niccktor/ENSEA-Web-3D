const express = require("express")
const router = express.Router()

const usersArray = [
    { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
    { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
    { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
    { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
];

router.get("/users", (req, res) => {
    res.json(usersArray)
})


// GET: Récupérer un utilisateur par ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    res.json(users[userIndex]);
});

// POST: Ajouter un nouvel utilisateur
router.post("/", (req, res) => {
    const { firstName, lastName, role } = req.body;
    const lastId = users[users.length - 1].id;
    const newId = lastId + 1;

    const newUser = {
        id: newId,
        firstName,
        lastName,
        role,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Mettre à jour un utilisateur par ID
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    const { firstName, lastName, role } = req.body;
    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;
    if (role) users[userIndex].role = role;

    res.json({ msg: "utilisateur mis à jour", user: users[userIndex] });
});

// DELETE: Supprimer un utilisateur par ID
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    users.splice(userIndex, 1);
    res.json({ msg: "utilisateur supprimé" });
});

module.exports = router