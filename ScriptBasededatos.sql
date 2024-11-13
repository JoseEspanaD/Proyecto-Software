create table category_table(
	category varchar(50) PRIMARY KEY,
	name varchar(50),
	status varchar(20),
	image TEXT
);

CREATE TABLE product (
    id_product SERIAL,
    name varchar(50),
    description varchar(250),
    weight INTEGER,
    price decimal(10, 2),
    status varchar(50),
    category varchar(50),  
    image TEXT,
	primary key (id_product,category),
	foreign key (category) references category_table(category)
);

CREATE TABLE customer (
    id_customer SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(50) NOT NULL,
    e_mail CHARACTER VARYING(100) NOT NULL UNIQUE,
    status CHARACTER VARYING(50) NOT NULL,
    password CHARACTER VARYING(60) NOT NULL,
    address CHARACTER VARYING(200) NOT NULL,
    phone CHARACTER VARYING(20) NOT NULL,
    id_municipio INTEGER,
    id_zona INTEGER,
    FOREIGN KEY (id_municipio) REFERENCES municipio(id_municipio) ON DELETE SET NULL,
    FOREIGN KEY (id_zona) REFERENCES zona(id_zona) ON DELETE SET NULL
);


CREATE TABLE "order" (
    id_order SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL,
    comment VARCHAR(100),
    date TIMESTAMP with time zone,
    total_price NUMERIC(10, 2) NOT NULL,
    id_customer INTEGER,
	fecha_p TIMESTAMP with time zone,
	fecha_e TIMESTAMP with time zone,
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
);

select * from "order"
CREATE TABLE order_item (
    id_item SERIAL PRIMARY KEY,
	category varchar(10),
    amount INTEGER NOT NULL,
    id_order INTEGER NOT NULL,
    id_product INTEGER NOT NULL,
    FOREIGN KEY (id_order) REFERENCES "order" (id_order),
    FOREIGN KEY (id_product,category) REFERENCES product (id_product,category) 
);

create table administrator(
	id_admin SERIAL Primary key,
	name varchar(50),	
	e_mail varchar(100),
	status varchar(50),
	password varchar(300), 
	phone varchar(20), 
);


CREATE TABLE municipio (
    id_municipio SERIAL PRIMARY KEY,
    nombre_municipio VARCHAR(50) NOT NULL
);

CREATE TABLE zona (
    id_zona SERIAL PRIMARY KEY,
    nombre_zona VARCHAR(50) NOT NULL
);