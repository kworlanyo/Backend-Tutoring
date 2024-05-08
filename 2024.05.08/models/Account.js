import { Schema, model } from "mongoose";

// Creating a schema
const accountSchema = new Schema({
  owner: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Creating a model
const Account = model("account", accountSchema);

export default Account;
