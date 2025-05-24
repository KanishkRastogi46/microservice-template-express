const express = require('express');
const { config } = require("dotenv");
const cors = require('cors');
const proxy = require('express-http-proxy');

config();

const app = express();
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

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});