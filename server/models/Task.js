const db = require('../db/index')

class Task {
    async create(data) {
        try {
            // query statement
            const statement = `INSERT INTO tasks (title, status, user_id)
                                VALUES ($1, $2, $3)
                                RETURNING *`;

            // values array to insert to statement
            const values = [data.title, 'pending', data.userId];

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

    async update(data) {
        let statement = `UPDATE tasks
                        SET `;
        let values = [data.id];
        let index = 0;

        try {
            // query statement
            // if the user changes the title then only change the title of the task
            // else if the user changes the deadline_date then only change the deadline_date.
            if (data.title) {
                statement += 'title = $2';
                values.push(data.title);
                index++;
            } else if (data.deadline_date) {
                statement += 'deadline_date = $2';
                values.push(data.deadline_date);
                index++;
            } else if (data.status) {
                statement += 'status = $2';
                values.push(data.status);
                index++;
            }

            statement += ' WHERE id = $1 RETURNING *';

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

    async findByUserId(userId) {
        try {
            // query statement
            const statement = `SELECT *
                                FROM tasks
                                WHERE user_id = $1`;
            
            // query database
            const result = await db.query(statement, [userId]);

            if (result.rows.length > 0) {
                return result.rows;
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
                                FROM tasks
                                WHERE id = $1`;

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

    async deleteById(id) {
        try {
            // query statement
            const statement = `DELETE FROM tasks
                                WHERE id = $1
                                RETURNING id`;

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
}

module.exports = new Task();