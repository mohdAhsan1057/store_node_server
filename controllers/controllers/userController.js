const config = require('../../config/config');
const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../../utils');
const fileExtensionType = ["jpg", "jpeg", "png"];

module.exports = {
    register: async (req, res) => {
        
        let data = req.body;
        let { password } = data;
        let { role } = data;
        let { contact } = data;
        delete data.password;
        delete data.roles;
        delete data.contact;
        let hashPassword = bcrypt.hashSync(password, 10);
        try {
            contacts = await new db.contact(contact).save();
            console.log(contacts);
        } catch (e) {
            throw e;
        }
        try {
            roles = await db.role.findOne({ name: role });
            console.log(roles);
        } catch (e) {
            return 0;
        }
        let r = roles.id;
        let c = contacts.id;
        if (r != null && c != null) {
            new db.user({
                name: data.name,
                password: hashPassword,
                email: data.email,
                roleID: r,
                contactID: c,
                imageURL: "",
                cnic: data.cnic
            }).save().then((err, result) => {
                if (err) {
                    console.log(err);
                }
                res.status(201).json({
                    status: true,
                    message: 'registered successfully'
                });
            });
        }
        else {
            res.status(400).json({
                message: "fields are missing"
            });
        }
    },
    login: async (req, res) => {
        db.user.findOne({ email: req.body.email })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "User Not found." })
                }
                let passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password,
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                let token = jwt.sign({ id: user.id }, config.jwtSecret);
                return res.status(200).json({
                    accessToken: token,
                    message: "successfully login"
                });
            });
    },
    getUser: async (req, res) => {
        try {
            let user = await db.user
                .findById(req.userId)
                .select('name cnic email imageURL')
                .populate('roleID', 'name -_id',)
                .populate('contactID', 'phone_no mobile_no -_id');
            return res.status(200).json(user);
        }
        catch (e) {
            res.status(400).json({ message: e });
        }
    },
    getUsers: async (req, res) => {
        try {
            let user = await db.user
                .find()
                .select('name cnic email imageURL')
                .populate('roleID', 'name -_id',)
                .populate('contactID', 'phone_no mobile_no -_id');
            return res.status(200).json(user);
        }
        catch (e) {
            res.status(400).json({ message: e });
        }
    },
    updateUser: async (req, res) => {
        let data = req.body;
        console.log(data, req.userId);
        let { phone_no } = data;
        let { mobile_no } = data;
        let { name } = data;
        let { email } = data;
        let { cnic } = data;
        let conTact = {
            phone_no: phone_no,
            mobile_no: mobile_no,
        }
        delete data.phone_no;
        delete data.mobile_no;
        let filePhoto = req.files && req.files["imageURL"];
        let fileNameArr = filePhoto.name.split(".");
        let fileExtension = (fileNameArr[fileNameArr.length - 1]).toLowerCase();
        if (fileExtensionType.indexOf(fileExtension) < 0) return res.status(400).json('file extension would be jpg, jpeg, png');
        let fileUrl = `photos/photo_user_${req.userId}.jpg`;
        let user = await db.user.findById(req.userId);
        let contactId = user.contactID;
        let updateContact = await db.contact.updateOne({ _id: contactId }, conTact);
            console.log('ali');
            let newUser = {
                name: name,
                email: email,
                imageURL: fileUrl,
                cnic: cnic,
            }
            console.log(newUser);
                let updateUserses = await db.user.updateOne({ _id: req.userId }, newUser);
                console.log(updateUserses);
            let uploadingfile = await utils.uploadFile(filePhoto, fileUrl);
            console.log(uploadingfile);

    },
}