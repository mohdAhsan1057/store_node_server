const db = require("../../models");

module.exports = {
    isAdmin: (req, res, next) => {
        db.user.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            db.role.findOne(
                {
                    _id: user.roleID
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    console.log(role.name);
                    if (role.name === "admin") {
                        next();
                        return;
                    }
                    res.status(403).send({ message: "Require Admin Role!" });
                    return;
                }
            );
        });
    },

    isVender: (req, res, next) => {
        db.user.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            db.role.findOne(
                {
                    _id: user.roleID 
                },
                (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (role.name === "vender") {
                        next();
                        return;
                    }
                    res.status(403).send({ message: "Require Vender Role!" });
                    return;
                }
            );
        });
    },
}