const e = require('express');
const db = require('../config/db/index')

class Task {
    async create(userId) {
        try {
            // query statement
            const statement = `INSERT INTO tasks (user_id)
                                VALUES ($1)
                                RETURNING *`;

            // query database
            const result = await db.query(statement, [userId]);

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

        try {
            // query statement
            // if the user changes the title then only change the title of the task
            // else if the user changes the deadline_date then only change the deadline_date.
            if (data.title) {
                statement += 'title = $2';
                values.push(data.title);
            } else if (data.deadline_date) {
                // for every time the deadline is given to update status with it to pending.
                statement += "deadline_date = $2, status = 'pending'";
                values.push(data.deadline_date);
            } else if (data.status) {
                statement += 'status = $2';
                values.push(data.status);
            } else if (typeof data.archived === 'boolean') {
                statement += 'archived = $2'
                if (data.archived) {
                    statement += ', deleted_at = CURRENT_TIMESTAMP';
                } else {
                    statement += ', deleted_at = NULL';
                }
                values.push(data.archived);
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

    async findByUserId(data) {
        // query statement
        let statement = `SELECT *
                            FROM tasks
                            WHERE user_id = $1`;
        // values array to insert to statement
        let values = [data.userId];
        
        try {
            // if status and archived is not provided
            // then return all tasks where archived is false.
            if (!data.status && !data.archived) {
                statement += ` AND archived = false`;
            // if data.status then return only the tasks with that specified status
            } else if (data.status) {
                statement += ` AND status = $2`;
                values.push(data.status);
            // if data.archived is true then return only the archived tasks
            } else if (data.archived) {
                console.log('hello from archived');
                statement += ` AND archived = true`;
            }

            // if sort and order option is given then
            if (data.sort === 'deadline_date') {
                statement += ` ORDER BY deadline_date`;
            } else {
                // default to created_at ASC
                statement += ` ORDER BY created_at`;
            }

            if (data.order === 'descending') {
                statement += ` DESC`;
            } else {
                // default to ASC
                statement += ` ASC`;
            }

            // console.log(statement);

            // query database
            const result = await db.query(statement, values);

            if (result.rows.length > 0) {
                return result.rows;
            }

            return null;
        } catch (err) {
            throw new Error(err);
        }
    }

    // async findArchivedByUserId(userId) {
    //     try {
    //         // query statement
    //         const statement = `SELECT *
    //                             FROM tasks
    //                             WHERE user_id = $1
    //                                 AND archived = true
    //                             ORDER BY deleted_at DESC`;

    //         // query database
    //         const result = await db.query(statement, [userId]);

    //         if (result.rows.length > 0) {
    //             return result.rows;
    //         }

    //         return null;
    //     } catch (err) {
    //         throw new Error(err);
    //     }
    // }

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

    async find() {
        try {
            // pg query statement
            const statement = `SELECT *
                                FROM tasks`;

            // query database
            const result = await db.query(statement);

            if (result.rows.length > 0) {
                return result.rows;
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