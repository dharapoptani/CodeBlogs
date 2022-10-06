const dotenv = require("dotenv");
dotenv.config({ path: "config/app.config" });

// App
const app = require("./app");

// DB connection
const connectDB = require("./database/db");

connectDB();

app.listen(process.env.PORT, () => console.log(`${process.env.PORT}`));
