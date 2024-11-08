const db = require("../database");

// Méthode GET pour récupérer tous les utilisateurs
exports.getAllUsers = function (req, res) {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.getUsersByID = (req, res) => {
    const userId = req.params.id;
    
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            res.json(row);
        }
    });
};

// Méthode POST pour créer un nouvel utilisateur
exports.createNewUser = (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ error: "Le prénom et le nom de famille sont requis !" });
    }

    db.run(
        "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID, firstName, lastName });
            }
        }
    );
};

// Méthode PUT pour mettre à jour un utilisateur par ID
exports.updateUser = (req, res) => {
    const { firstName, lastName } = req.body;
    const userId = req.params.id;

    let updateFields = [];
    let queryParams = [];

    if (firstName) {
        updateFields.push("firstName = ?");
        queryParams.push(firstName);
    }

    if (lastName) {
        updateFields.push("lastName = ?");
        queryParams.push(lastName);
    }

    if (updateFields.length > 0) {
        queryParams.push(userId);
        const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

        db.run(query, queryParams, function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                res.json({ msg: "Utilisateur mis à jour", userId, firstName, lastName });
            }
        });
    } else {
        res.status(400).json({ message: "Aucun champ à mettre à jour" });
    }
};

// Méthode DELETE pour supprimer un utilisateur par ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            res.status(200).json({ message: "Utilisateur supprimé !" });
        }
    });
};
