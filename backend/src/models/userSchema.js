import { Schema, model } from "mongoose";
import bcrypt  from 'bcrypt';

const userSchema=new Schema({
username:{
  type: String,
  required:[true,"User name is required"],
  unique:true,
  trim:true,
  lowercase: true,
  validate: {
  validator:function(v){
         return /^[a-zA-Z0-9_]+$/.test(v); // only letters, numbers, underscores
  },
  message: props => `${props.value} is not a valid username!`
}

},
email:{
  type:String,
  required :[true,"Email address is required"],
  unique:true,
  trim:true,
  lowercase:true,
  validate:{
    validator:function (v){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    },
    message: props => `${props.value} is not a valid email address!`
  }
},
password:{
  type:String,
  required:[true,"Password is required"],
  minlength: [6, "Password must be at least 6 characters long"],
  select:false
}
});


userSchema.pre("save", async function (next) {
  // Check  password was modified or is new
  if (!this.isModified("password")) next();

  //generate salt using bcrypt
  const salt = await bcrypt.genSalt(10);

  // Hash the password with salt
  const hashedPassword = await bcrypt.hash(this.password, salt);

  //Replace plain password with hashed password
  this.password = hashedPassword;
  //Call next() to continue saving
  next();
});

export const User=model("User",userSchema);