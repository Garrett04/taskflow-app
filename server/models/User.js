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
            const statement = `SELECT id,
                                    username,
                                    first_name,
                                    last_name
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
        let statement = 'UPDATE users SET ';
        let values = [data.id];

        try {
            // query statement
            if (data.first_name && data.last_name) {
                statement += 'first_name = $2, last_name = $3';
                values.push(data.first_name, data.last_name);
            } else if (data.first_name) {
                statement += 'first_name = $2';
                values.push(data.first_name);
            } else if (data.last_name) {
                statement += 'last_name = $2';
                values.push(data.last_name);
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