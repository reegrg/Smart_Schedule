const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/Routes/authRoutes');
// const userProfileRoutes = require('./src/Routes/userProfileRoutes');
const profileRoutes = require('./src/Routes/profileRoutes');
const taskRoutes = require('./src/Routes/taskRoutes');
const noteRoutes = require('./src/Routes/noteRoutes');
const eventRoutes = require('./src/Routes/eventRoutes');
const app = express();
const cors = require('cors');

const port = 5000;
connectDB();
app.use(express.json());
app.use(cors());


app.use('/api/auth/', authRoutes);
// app.use('/user', userProfileRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/event', eventRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });