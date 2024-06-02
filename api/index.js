const express = require('express'); //main
const app = express();
const configureMiddleware = require('./middleware');
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

configureMiddleware(app); // configures middleware

app.use(userRoutes); // use routes
app.use(postRoutes);

const PORT = process.env.PORT || 4000; // starts server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});