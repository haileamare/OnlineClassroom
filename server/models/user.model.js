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
    console.log('salteweeeeee',this.makeSalt)
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function(plainText) {
    console.log("Authenticating password:", plainText);
    console.log("Hashed password from DB:", this.hashed_password);
    console.log("Salt:", this.salt);
    console.log("Hashed password to compare:", this.encryptPassword(plainText));
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return 'cannot encrypt the password';
    }
  },
  makeSalt: function() {
    return Math.round(Math.random() * new Date().valueOf()) + '';
  }
};

UserSchema.path('hashed_password').validate(function() {
  if (this._password && this._password.length < 8) {
    this.invalidate('password', 'Password must be at least 8 characters');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
});

export default mongoose.model('User', UserSchema);
