const express = require('express');
const {createServer} = require('http');
const { config } = require("dotenv");
const cors = require('cors');
const proxy = require('express-http-proxy');

config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use('/auth', proxy('http://localhost:3001', {}));
app.use('/users', proxy('http://localhost:3002', {}));

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});