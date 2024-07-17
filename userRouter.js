const express = require("express");
const router = express.Router();
const userModel = require("./userModel");

router.post("/create", async (req, res) => {
    const {username, password} = req.body || {};

    try {
        const users = await userModel.create({
            username: "somaelninjo",
            password: "somesby"
        })
        res.send(users)
    } catch (e) {
        res.status(400).send(e?.message || "Something went wrong...")
    }
});

router.get("/read", async (req, res) => {
    try {
        const fatchUsers = await userModel.find();
        res.send(fatchUsers);
    } catch (e) {
        res.status(400).send(e?.message || "Failed to fatch all users")
    }
});

router.put("/update/:id", async (req, res) => {
    try {
       const {id} = req.params;
       const user = await userModel.findByIdAndUpdate(id, req.body);
       if(!user) return res.status(400).send(e?.message || "User does not exists!");
       const updatedUser = await userModel.findById(id);
       res.send(updatedUser);
    } catch (e) {
       res.status(400).send(e?.message || "Can not update user..") 
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteUser = await userModel.findByIdAndDelete(id, req.body);
        if (!deleteUser) return res.status(404).send(e?.message || "Failed to delete user");

        const deletedUser = await userModel.findById(id);
        res.status(200).send({message: "User deleted."});
    } catch (e) {
        res.status(400).send(e?.message || "User deletion failed!")
    }
});

module.exports = router;