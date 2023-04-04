const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const csrf = require('csurf');
require('dotenv').config();

const csrfProtection = csrf({ cookie: true });

// Create express app
const app = express();

// DB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error while connecting to MongoDB: ', err));

// Apply middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// Middleware is always a function
// app.use((req, res, next) => {
//   console.log('This is a custom middleware. It will get executed before sending api response');
//   next();
// });

// Routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { console.log(`Server started at localhost:${PORT}`) });