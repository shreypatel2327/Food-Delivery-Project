import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  mobile: { type: String, default: "" }, 
  address: {
    line1: { type: String, default: "" },
    city: { type: String, default: "" },
    pin: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;