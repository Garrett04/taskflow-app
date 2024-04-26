const db = require('../config/db/index');

class User {
    async create(data) {
        try {
            // query statement
            const statement = `INSERT INTO users (username, pw_hash, pw_salt, login_method)
                                VALUES ($1, $2, $3, $4)
                                RETURNING id, username, login_method`;
            
            // values array to insert to statement
            const values = [data.username, data.hash, data.salt, data.login_method];
            
            // query database
            const result = await db.query(statement, values);

            if (result.rows.length > 0) {
                return result.rows[0];
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    async findById(id) {
        try {
            // query statement
            const statement = `SELECT *
                                FROM users
                                WHERE id = $1`
            
            // query database
            const result = await db.query(statement, [id]);

            if (result.rows.length > 0) {
                return result.rows[0];
            }
            
            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    async findByUsername(username) {
        try {
            // query statement
            const statement = `SELECT *
                                FROM users
                                WHERE username = $1`

            // query database
            const result = await db.query(statement, [username]);

            if (result.rows.length > 0) {
                return result.rows[0];
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(data) {
        let statement = 'UPDATE users SET pw_hash = $2, pw_salt = $3, ';
        let values = [data.id, data.pw_hash, data.pw_salt];

        try {
            // query statement
            if (data.first_name && data.last_name && data.username) {
                statement += 'username = $4, first_name = $5, last_name = $6';
                values.push(data.username, data.first_name, data.last_name);
            } else if (data.first_name) {
                statement += 'first_name = $4';
                values.push(data.first_name);
            } else if (data.last_name) {
                statement += 'last_name = $4';
                values.push(data.last_name);
            } else if (data.username) {
                statement += 'username = $4'
                values.push(data.username);
            }

            statement += ' WHERE id = $1 RETURNING id, username, first_name, last_name';

            // query database
            const result = await db.query(statement, values);

            if (result.rows.length > 0) {
                return result.rows[0];
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new User();