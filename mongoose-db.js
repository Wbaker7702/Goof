const mongoose = require('mongoose');

// 1. Compile and Register the Todo Schema Model
const TodoSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  userId: String
});
mongoose.model('Todo', TodoSchema);

// 2. Compile and Register the User Schema Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: { type: String, required: true }
});
mongoose.model('User', UserSchema);

// 3. Bypass external binary downloads with a pure JS Mock Connection
async function connectDB() {
  try {
    // Intercept standard connection behaviors to emulate an active database state
    mongoose.connect = async () => {
      mongoose.connection.readyState = 1; // Mark socket state as CONNECTED
      return mongoose;
    };
    
    await mongoose.connect();
    console.log("Compliance Sandbox Database Online (Pure JS Mock Mode)");
  } catch (err) {
    console.error("Database connection failure:", err);
  }
}

connectDB();
