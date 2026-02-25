const { collection, getDocs} = require('firebase/firestore');
const { db } = require('../firebase');

const getAllUsers = async () => {
    if (!db) return [];
    try {
        const snapshot = await getDocs(collection(db, 'users'));
        const users = [];
        snapshot.forEach(doc => users.push(doc.data()));
        return users;
    } catch (error) {
        throw error;
    }
};

module.exports= {getAllUsers}