// write a function to create a users table in your database

import { Client } from "pg";
import { postgresConnectionString } from "./config";

const client = new Client({
  connectionString: postgresConnectionString,
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

createUsersTable();

/* 

  SQL -> Strict Schemas -> Very Hard to change schemas, involve migrations. -> Establish Relationships between tables.

  NoSQL -> Schemaless -> Faster to produce apps.

  Connecting to Postgres -> Protocol :// Username : Password @ URL / Database

  postgres:// [username] : [password] @ [host] / [database_name]

  free service providers for postgres -> elephantsql, neon, supabase, etc.

  Basic Types of Queries -> Insert, Update, Delete, Get

  Browser --> Node.js process --> [Query] -> Postgres.

  npm install pg
  npm install @types/pg

  1. Create Tables
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  SERIAL PRIMARY KEY - VARCHAR(255) - UNIQUE - NOT NULL

  1. CREATE TABLE users
CREATE TABLE users: This command initiates the creation of a new table in the database named users.

2. id SERIAL PRIMARY KEY
id: The name of the first column in the users table, typically used as a unique identifier for each row (user). Similar to _id in mongodb

SERIAL: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique id.

PRIMARY KEY: This constraint specifies that the id column is the primary key for the table, meaning it uniquely identifies each row. Values in this column must be unique and not null.

3.  email VARCHAR(255) UNIQUE NOT NULL,
email: The name of the second column, intended to store the user's username.

VARCHAR(50): A variable character string data type that can store up to 50 characters. It's used here to limit the length of the username.

UNIQUE: This constraint ensures that all values in the username column are unique across the table. No two users can have the same username.

NOT NULL: This constraint prevents null values from being inserted into the username column. Every row must have a username value.

4. password VARCHAR(255) NOT NULL
Same as above, can be non unique

5. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
created_at: The name of the fifth column, intended to store the timestamp when the user was created.

TIMESTAMP WITH TIME ZONE: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.

DEFAULT CURRENT_TIMESTAMP: This default value automatically sets the created_at column to the date and time at which the row is inserted into the table, using the current timestamp of the database server.

  CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id),
    done BOOLEAN DEFAULT FALSE
  ) 


  REFERENCES - DEFAULT

  1. INSERT

    INSERT INTO users (username, email, password)
    VALUES ('username_here', 'user@example.com', 'user_password');

  2. UPDATE

    UPDATE users
    SET password = 'new_password'
    WHERE email = 'user@example.com';

  3. DELETE

    DELETE FROM users
    WHERE id = 1;

  4. SELECT

    SELECT * FROM users
    WHERE id = 1;

  => postgres exposes a protocol that someone needs to talk to be able to send these commands (update, delete) to the database.

  => psql  is one such library that takes commands from your terminal and sends it over to the database.

  Connecting:-

    import { Client } from 'pg'
  
    const client = new Client({
      host: 'my.database-server.com',
      port: 5334,
      database: 'database-name',
      user: 'database-user',
      password: 'secretpassword!!',
    })

    client.connect()

  Querying:-

    const result = await client.query('SELECT * FROM USERS;')
    console.log(result)

*/
