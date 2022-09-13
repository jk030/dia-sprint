const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true 
    },
    password: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
  {
    data:{
      name: String,
      lastName: String,
      nationality: String,
      birthday: Date,
      ailement: String,
      pictureUrl: String,
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
