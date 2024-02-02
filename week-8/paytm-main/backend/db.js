const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config");

mongoose.connect(MONGODB_URL);
/* 
// Simple solution
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});
 */
// Much Better Solution
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User Model.
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};

/* 

What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
What if the Node.js crashes after the first update?

It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

If a failure ever happens, the first txn should rollback.

This is what is called a transaction in a database. We need to implement a transaction on the next set of endpoints that allow users to transfer INR

*/
