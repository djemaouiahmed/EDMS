const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('../db/db');
const nodemailer = require('nodemailer');
const { session } = require('../application');
const route_admin = express.Router();
const dotenv = require('dotenv').config({ path: '.env.mailer' }); // Load dotenv configuration

async function deleteUser(req, res) {
    const idd = req.body.e;
    db.dbDelUserById(idd);
}

async function acceptUser(req, res) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const id = req.body.e;
        const roles = req.body.roles;
        const upload = req.body.upload ? 1 : 0;
        const download = req.body.download ? 1 : 0;
        const print = req.body.print ? 1 : 0;
        const diffuse = req.body.diffuse ? 1 : 0;

        const results = await db.dbGetUserEmailById(id);

        if (!results.length) {
            return res.status(404).send('User not found');
        }

        await db.dbAddPrevileges(id, diffuse, upload, download, print, roles);
        const userEmail = results[0].email;

        const emailToken = jwt.sign({ user: { id } }, process.env.EMAIL_SECRET);

        const url = `http:localhost:3000/confirmation/${emailToken}`;

        await transporter.sendMail({
            to: userEmail,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });

        res.send('Confirmation email sent successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to send confirmation email');
    }
}

async function confirmationToken(token, Email) {
    try {
        console.log(Email);
        const decoded = jwt.verify(token, Email);
        const userId = decoded.user.id;
        await db.dbVerifyUserByID(userId);
        console.log('User verified successfully');
    } catch (err) {
        console.error(err);
    }
}

async function getUsers(req, res) {
    const results = await db.dbGetUnaceeptedUsers();
    res.json(results);
}

async function getInfo(req, res) {
    const results = await db.dbGetCount();
    res.json(results);
}

async function getAcceptedUsr(req, res) {
    const results = await db.dbGetAcceptedUsers();
    res.json(results);
}

async function UpdateUser(req) {
    console.log(req.body);
    db.dbAddPrevileges(req.body.e, req.body.diffuse, req.body.upload, req.body.download, req.body.print, req.body.roles);
}

async function admin(req, res) {
    if (req.session.id_user) {
        db.dbPermaPrevileges(req.session.id_user);
        res.json(req.session.role);
    }
}

module.exports = {
    getUsers: getUsers,
    deleteUser: deleteUser,
    acceptUser: acceptUser,
    confirmationToken: confirmationToken,
    getInfo: getInfo,
    getAcceptedUsr: getAcceptedUsr,
    UpdateUser: UpdateUser,
    admin: admin
};
