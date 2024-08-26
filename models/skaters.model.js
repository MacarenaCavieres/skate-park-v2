import { pool } from "../database/connection.db.js";

const postOne = async (email, nombre, password, years_experience, specialty, photo) => {
    const query = {
        text: "insert into skaters (email,nombre,password,years_experience,specialty,photo) values ($1,$2,$3,$4,$5,$6) returning email,nombre,years_experience,specialty,photo;",
        values: [email, nombre, password, years_experience, specialty, photo],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};

const getAll = async () => {
    const { rows } = await pool.query("select * from skaters");
    return rows;
};

const findOne = async (email) => {
    const query = {
        text: "select * from skaters where email = $1",
        values: [email],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const Skater = {
    postOne,
    getAll,
    findOne,
};
