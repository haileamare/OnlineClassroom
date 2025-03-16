import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'User name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    required: "Email is required and cannot be empty"
  },
  created: {
    type: Date,
    default: Date.now
  },
  hashed_password: {
    type: String
  },
  salt: {
    type: String
  },
  educator: {
    type: Boolean,
    default: false
  }
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    console.log('Generated salt:', this.salt);
    this.hashed_password = this.encryptPassword(password);
    console.log('Hashed password during set:', this.hashed_password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    console.log('Provided password:', plainText);
    console.log('Stored salt:', this.salt);
    console.log('Stored hashed password:', this.hashed_password);
    const newHashedPassword = this.encryptPassword(plainText);
    console.log('New hashed password:', newHashedPassword);
    console.log('Comparing:', newHashedPassword === this.hashed_password);
    return newHashedPassword === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      const hash = crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
      console.log('Password:', password);
      console.log('Salt:', this.salt);
      console.log('Hash:', hash);
      return hash;
    } catch (err) {
      return 'cannot encrypt the password';
    }
  },
  makeSalt: function() {
    return Math.round(Math.random() * new Date().valueOf()) + '';
  }
};

UserSchema.pre('save', function(next) {
  console.log('Saving user:', this);
  next();
});

UserSchema.path('hashed_password').validate(function() {
  if (this._password && this._password.length < 8) {
    this.invalidate('password', 'Password must be at least 8 characters');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
});

export default mongoose.model('User', UserSchema);
