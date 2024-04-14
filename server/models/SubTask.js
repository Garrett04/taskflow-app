const db = require('../db/index');

class SubTask {
    async findByTaskId(task_id) {
        try {
            // query statement
            const statement = `SELECT *
                                FROM subtasks
                                WHERE task_id = $1`;

            // query database
            const result = await db.query(statement, [task_id]);

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
                                FROM subtasks
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

    async create(data) {
        try {
            // query statement
            const statement = `INSERT INTO subtasks (title, description, task_id)
                                VALUES ($1, $2, $3)
                                RETURNING *`;

            // values array to insert to statement
            const values = [data.title, data.description, data.task_id];
                            
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
        let statement = `UPDATE subtasks
                        SET `;
        let values = [data.id];
        let index = 0;

        try {
            // query statement
            if (data.title) {
                statement += 'title = $2';
                values.push(data.title);
                index++;
            } else if (data.description) {
                statement += 'description = $2';
                values.push(data.description);
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

    async delete(id) {
        try {
            // query statement
            const statement = `DELETE FROM subtasks
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


module.exports = new SubTask();