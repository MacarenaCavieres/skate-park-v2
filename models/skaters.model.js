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
    const { rows } = await pool.query(
        "select id,email,nombre,years_experience,specialty,photo,state,type_user from skaters"
    );
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

const putOne = async (email, nombre, password, years_experience, specialty) => {
    const query = {
        text: "update skaters set nombre = $2, password = $3, years_experience = $4, specialty = $5 where email = $1 returning *",
        values: [email, nombre, password, years_experience, specialty],
    };
    const { rows } = await pool.query(query);
    return rows[0];
};

const deleteOne = async (id) => {
    const query = {
        text: "delete from skaters where id = $1 returning *",
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const putState = async (id, state) => {
    const query = {
        text: "update skaters set state = $2 where id = $1 returning id, email, nombre, state",
        values: [id, state],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const Skater = {
    postOne,
    getAll,
    findOne,
    putOne,
    deleteOne,
    putState,
};
