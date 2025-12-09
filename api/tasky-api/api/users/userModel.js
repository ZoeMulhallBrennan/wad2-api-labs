import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: {type: String, required: true }
});

UserSchema.methods.comparePassword = async function (passw) { 
    return await bcrypt.compare(passw, this.password); 
};


UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function() {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.password);
    
    if (!isValid) {
      return new Error('Password must be at least 8 characters long and contain at least one letter, one digit, and one special character (@$!%*#?&).');
    }
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      return;
  } catch (error) {
    return error;
  }

  } else {
      return;
  }
});



export default mongoose.model('User', UserSchema);
