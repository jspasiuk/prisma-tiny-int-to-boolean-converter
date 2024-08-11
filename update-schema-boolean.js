const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "prisma", "schema.prisma");

fs.readFile(schemaPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading schema.prisma file:", err);
    process.exit(1);
  }

  // Regular expression to match fields with Int type and @db.TinyInt attribute, including nullable fields and default values
  const regex = /(\w+)\s+Int(\??)\s+(.*@db\.TinyInt\b.*)/g;

  let updatedSchema = data.replace(
    regex,
    (match, fieldName, isNullable, attributes) => {
      // Replace default(1) with default(true) and default(0) with default(false)
      attributes = attributes.replace(/@default\((\d+)\)/g, (match, p1) => {
        return `@default(${p1 === "1" ? "true" : "false"})`;
      });

      // Replace Int with Boolean while keeping the field name, nullable option, and other attributes
      return `${fieldName} Boolean${isNullable} ${attributes}`;
    }
  );

  fs.writeFile(schemaPath, updatedSchema, "utf8", (err) => {
    if (err) {
      console.error("Error writing schema.prisma file:", err);
      process.exit(1);
    }
    console.log("Prisma schema updated successfully!");
  });
});
