# Prisma TinyInt to Boolean Converter

This repository contains a simple Node.js script that automatically converts MySQL `TINYINT` fields in a Prisma schema to `Boolean` fields. It also handles nullable fields and default values, ensuring that your Prisma schema is optimized for working with boolean values in your application.

## Use Case

When using Prisma with an existing MySQL database, you might have columns of type `TINYINT` that are used as boolean flags. By default, Prisma will map these `TINYINT` columns to `Int` fields in your schema. This can lead to unnecessary type conversions in your code and does not fully utilize Prisma's type safety features.

This script automates the process of converting `TINYINT` columns to `Boolean` fields in your Prisma schema, ensuring that your database schema and your application code are both consistent and type-safe.

### Example

Given a MySQL table with the following columns:

```sql
CREATE TABLE `example_table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `is_deleted` TINYINT(1) DEFAULT 0,
  `is_verified` TINYINT(1),
  PRIMARY KEY (`id`)
);
```

When you run prisma db pull, Prisma generates a schema like this:

```prisma
model ExampleTable {
  id          Int      @id @default(autoincrement())
  is_active   Int      @default(1) @db.TinyInt
  is_deleted  Int?     @default(0) @db.TinyInt
  is_verified Int?     @db.TinyInt
}
```
After running the script provided in this repository, the schema will be updated to:

```prisma
model ExampleTable {
  id          Int      @id @default(autoincrement())
  is_active   Boolean  @default(true) @db.TinyInt
  is_deleted  Boolean? @default(false) @db.TinyInt
  is_verified Boolean? @db.TinyInt
}
```

### Installation

Clone the repository to your local machine.
Ensure you have Node.js installed.
Place the update-schema.js file in the root directory of your Prisma project.

### Usage
Open your package.json file and add the following script:

```json
{
  "scripts": {
    "prisma:pull": "prisma db pull && node update-schema.js"
  }
}
```
Run the command:

```sh
npm run prisma:pull
```

This will execute prisma db pull to synchronize your Prisma schema with your database, followed by the script to convert TINYINT fields to Boolean.

### Contributing

Feel free to contribute to this repository by opening issues or submitting pull requests. Any improvements or additional features are welcome!

### License

This project is licensed under the MIT License. See the LICENSE file for details.
