require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./db/sequelize");

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connection successful");
    const [rows] = await sequelize.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='contacts' AND column_name='owner'"
    );
    if (rows.length === 0) {
      await sequelize.query("TRUNCATE TABLE contacts RESTART IDENTITY CASCADE").catch(() => {});
    }
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
