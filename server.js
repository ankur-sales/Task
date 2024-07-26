
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./server/routes/authRoutes');
const postRoutes = require('./server/routes/userPostRoutes');

const app = express();

mongoose.connect(
    "mongodb+srv://ankurraj879:1qW8uE9z2VeB0x0N@cluster0.yskffxj.mongodb.net/softfixTask?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/posts', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
