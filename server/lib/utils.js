const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path')
const fs = require('fs');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    }
}

const validatePassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

const issueJwt = (user) => {
    const id = user.id;

    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: signedToken,
        expires: expiresIn
    };
}

module.exports = {
    genPassword,
    validatePassword,
    issueJwt
};