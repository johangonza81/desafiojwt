import express from "express";
import cors from 'cors';
import chalk from "chalk";
import bodyParser from 'body-parser';
import rutas from "../server/routes/rutas.js";


const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/",rutas);




app.listen(PORT,() =>{
    console.log(chalk.blue('        🔥  Server On  🔥'));
    console.log(chalk.grey(`Click to open: ${chalk.underline(`http://localhost:${PORT}`)}`)); 
})