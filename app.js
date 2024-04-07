const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const multer = require('multer'); 
const cors = require('cors');





const PORT = 3006; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

//  connection to MongoDB
mongoose.connect('mongodb+srv://samanaliperera544:nyS4CrEMu6JKJrOr@cook-web-db.fjblsi4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const User = require('./models/userModel');





// Endpoint to add a new user

app.post('/api/cook-web/AddUser', async (request, response) => {
    try {
        const { fname, lname, email, phn, password } = request.body;

 
        if (!fname || !lname || !email || !phn || !password) {
            return response.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return response.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new User({
            fname,
            lname,
            email,
            phn,
            password
        });

        // Save the user
        const savedUser = await newUser.save();
        response.json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});












app.get('/api/cook-web/GetUserByEmail/:email', (request, response) => {
    const email = request.params.email;

    // Find the user by email in the database
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // If the user is not found, return a 404 status code with an error message
                response.status(404).json({ error: 'User not found' });
            } else {
                // If the user is found, return the user data
                response.json(user);
            }
        })
        .catch(error => {
            console.error('Error fetching user by email:', error);
            response.status(500).json({ error: 'Internal server error' });
        });
});





// Handling GET request for getting all users
app.get('/api/cook-web/GetUsers', (request, response) => {
    // Fetch all users from MongoDB using Mongoose
    User.find({})
        .then(users => {
            response.json(users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            response.status(500).json({ error: 'Internal server error' });
        });
});
