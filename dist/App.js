"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Index_1 = __importDefault(require("./Index"));
const server_1 = __importDefault(require("./server"));
const { PORT } = process.env;
Index_1.default
    .sync({ force: false })
    .then(() => {
    console.log("Sequelize connected successfully");
})
    .catch((e) => console.error("Error when starting DB: ", e));
server_1.default.listen(PORT, () => {
    console.log("Server successfully started on port:", PORT);
});
