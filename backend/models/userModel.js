const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method 
userSchema.statics.signup= async function(email, password){

    //valoidation
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not Strong")
    }

    const exists = await this.findOne({ email })

    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password: hash}) //can also use save

    return user
}

// statuc login method 
userSchema.statics.login =async function(email,password){
      //validation
    if(!email || !password){
        throw Error("all fields must be filled")
    }
    const user = await this.findOne({ email })

    if(!user){
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
      throw Error("Incorrect Password")
    }

    return user._id
}

userSchema.statics.resetPassword = async function (email, password, newPassword) {
  // Validation
  if (!email || !password || !newPassword) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }


  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Your current password is wrong");
  }


  if(!validator.isStrongPassword(newPassword)){
    throw Error("Password is not Strong")
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash; // Update the user's password

  await user.save(); // Save the updated user document

  return user;
};


module.exports = mongoose.model('User', userSchema)