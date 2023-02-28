const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

exports.db = db;
exports.auth = auth;
exports.storage = storage;
exports.admin = admin;

module.exports = { admin, db, auth, storage };


