import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

db.once('open', ()=>{
app.listen(PORT, ()=>console.log(`server is running at http:localhost:${PORT}`))
})