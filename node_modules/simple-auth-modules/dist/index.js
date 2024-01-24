"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  dbConnection: () => dbConnection,
  loginUser: () => loginUser,
  registerUser: () => registerUser,
  verifyToken: () => verifyToken
});
module.exports = __toCommonJS(src_exports);

// src/dbConnection.ts
var import_mongoose = __toESM(require("mongoose"));
var dbConnection = (connectionString) => __async(void 0, null, function* () {
  try {
    import_mongoose.default.set("strictQuery", true);
    yield import_mongoose.default.connect(connectionString);
    console.log("Database is connected");
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
});

// src/model/userModel.ts
var import_mongoose2 = __toESM(require("mongoose"));
var userSchema = new import_mongoose2.default.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});
var UserModel = import_mongoose2.default.model("User", userSchema);

// src/userRegister.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var registerUser = (userData) => __async(void 0, null, function* () {
  const hashedPassword = yield import_bcrypt.default.hash(userData.password, 10);
  const user = new UserModel({
    username: userData.username,
    email: userData.email,
    password: hashedPassword
  });
  return user.save();
});
var loginUser = (username, password, secretKey) => __async(void 0, null, function* () {
  const user = yield UserModel.findOne({ username });
  if (user && (yield import_bcrypt.default.compare(password, user.password))) {
    const token = generateToken(user, secretKey);
    return token;
  }
  return null;
});
var verifyToken = (token, secretKey) => {
  try {
    const decoded = import_jsonwebtoken.default.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
var generateToken = (user, secretKey) => {
  const token = import_jsonwebtoken.default.sign(
    { userId: user._id, username: user.username, email: user.email },
    secretKey,
    { expiresIn: "1h" }
  );
  return token;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dbConnection,
  loginUser,
  registerUser,
  verifyToken
});
//# sourceMappingURL=index.js.map