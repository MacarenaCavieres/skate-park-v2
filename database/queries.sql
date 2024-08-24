drop table if exists skaters;

CREATE TABLE skaters (
    id SERIAL, 
    email VARCHAR(50) NOT NULL, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    years_experience INT NOT NULL, 
	specialty VARCHAR(50) NOT NULL, 
    photo VARCHAR(255) NOT NULL, 
    state BOOLEAN default false,
	type_user INT default 2
);