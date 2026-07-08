import { configDotenv } from "dotenv";
import { app } from "./src/app.js";
import { connectDb } from "./src/config/database.js";

configDotenv({ path: './.env' })



connectDb()
      .then(() => {
            app.listen(3000, () => {
                  console.log(`Server is listening on port 3000`)

            })
      })
      .catch((err) => {
            console.log(err.message)
      })
