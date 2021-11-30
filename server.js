import express from "express";
import cors from 'cors';
import routes from './routes';



const app = express();
const PORT = process.env.PORT;


app.use(cors());

app.use(express.json());









app.listen(PORT, function() {
  console.log(`Listening for client request on port ${PORT}`);
});


