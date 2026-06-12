import { configDotenv } from "dotenv";
import { app } from "./src/app.js";


configDotenv({path:'./.env'})
app.listen(3000, ()=>{
      console.log(`Server is listening on port 3000`)
      
})