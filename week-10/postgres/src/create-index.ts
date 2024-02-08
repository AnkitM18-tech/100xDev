import { getClient } from "./utils";

async function addIndex() {
  const client = await getClient();

  const createIndexQuery = "CREATE INDEX idx_todos_user_id ON todos(user_id)";
  await client.query(createIndexQuery);

  console.log("Index added successfully on user_id column of todos table!");
}

addIndex();

/* 
    advanced stuff => Foreign Keys , Joins and Index

    -----------
    FOREIGN KEY
    How to relate (join) data?
    NoSQL => Shove everything for the same user in the same table/ databases
    SQL => There will be different tables and somehow we will connect those tables. => Foreign Keys

    CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id INTEGER REFERENCES users(id), --> Foreign Key --> If we try to delete one user, it will ask us to delete the related data (todos) as well, so the data integrity always prevails.
        done BOOLEAN DEFAULT FALSE,
    );
    -------------
    JOINS
    
    INDEX --> 
      1. Make query on a certain column faster
      2. We can add an index like above
      3. Since we are using postgres, it doesn't matter since the foreign key relation creates an index by default.

    PROBLEMS ?
      1. You have to write raw SQL queries
      2. Migrations are hard
      3. You don't get the best types

    SOLUTION -> ORMs (Object Relational Mappings)
*/
