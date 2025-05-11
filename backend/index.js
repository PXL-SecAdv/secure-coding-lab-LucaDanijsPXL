const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const port=3000;
const allowedOrigin = 'http://localhost:8080';

const pool = new pg.Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.PGDATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432,
    connectionTimeoutMillis: 5000
});

console.log("Connecting...:")

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    const query = `SELECT * FROM users WHERE user_name='${username}' and password='${password}'`;
    console.log(query);
    pool.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)});
      
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

