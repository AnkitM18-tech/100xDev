import mongoose, { Schema, model } from "mongoose";

const mongoUrl: string = "mongodb://mongo:27017/myDatabase";

// In the url in place of localhost, we need to use the name given to the database while creating the container. (mongo) - this name resolves to the ip of the container.

// docker run -d -v volume_database:/data/db --name mongo --network my_custom_network -p 27017:27017 mongo

// Connect to MongoDB
mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a User schema
interface IUser {
  name: string;
  age: number;
  email: string;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

// Create a User model
export const User = model<IUser>("User", UserSchema);
