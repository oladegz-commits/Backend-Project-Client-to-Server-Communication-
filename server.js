import {createServer} from "node:http";
import {config} from "dotenv";
import {router} from "./router.js"

config(); 
const host = process.env.HOST;
const port = Number(process.env.PORT || 3000);

const server = createServer((req, res) => {
    router(req,res);
});


server.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
