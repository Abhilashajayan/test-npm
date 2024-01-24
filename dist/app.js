"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nocache_1 = __importDefault(require("nocache"));
const simple_auth_module_1 = require("simple-auth-module");
const connectionURI = 'mongodb://localhost/authservice';
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, nocache_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, simple_auth_module_1.dbConnection)(connectionURI);
app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});
//# sourceMappingURL=app.js.map