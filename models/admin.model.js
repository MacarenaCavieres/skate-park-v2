import { pool } from "../database/connection.db.js";

const postOne = async (username, email, password) => {
    const query = {
        text: "INSERT INTO admin (username, email, password) values ($1,$2,$3) returning username, email;",
        values: [username, email, password],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const findOne = async (email) => {
    const query = {
        text: "select * from admin where email = $1",
        values: [email],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const getAll = async () => {
    const query = {
        text: "select id,username,email from admin;",
    };

    const { rows } = await pool.query(query);
    return rows;
};

export const Admin = {
    postOne,
    findOne,
    getAll,
};
