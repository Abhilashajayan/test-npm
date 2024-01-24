var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/dbConnection.ts
import mongoose from "mongoose";
var dbConnection = (connectionString) => __async(void 0, null, function* () {
  try {
    mongoose.set("strictQuery", true);
    yield mongoose.connect(connectionString);
    console.log("Database is connected");
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
});

// src/model/userModel.ts
import mongoose2 from "mongoose";
var userSchema = new mongoose2.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
var UserModel = mongoose2.model("User", userSchema);

// src/userRegister.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var registerUser = (userData) => __async(void 0, null, function* () {
  const hashedPassword = yield bcrypt.hash(userData.password, 10);
  const user = new UserModel({
    username: userData.username,
    email: userData.email,
    password: hashedPassword
  });
  return user.save();
});
var loginUser = (username, password, secretKey) => __async(void 0, null, function* () {
  const user = yield UserModel.findOne({ username });
  if (user && (yield bcrypt.compare(password, user.password))) {
    const token = generateToken(user, secretKey);
    return token;
  }
  return null;
});
var verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
var generateToken = (user, secretKey) => {
  const token = jwt.sign(
    { userId: user._id, username: user.username, email: user.email },
    secretKey,
    { expiresIn: "1h" }
  );
  return token;
};
export {
  dbConnection,
  loginUser,
  registerUser,
  verifyToken
};
//# sourceMappingURL=index.mjs.map