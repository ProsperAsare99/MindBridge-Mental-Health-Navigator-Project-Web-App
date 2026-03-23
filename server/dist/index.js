"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const socialController_1 = require("./controllers/socialController");
const PORT = parseInt(process.env.PORT || '5000');
// Server entry point - Syncing innovative features.
app_1.default.listen(PORT, '127.0.0.1', async () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
    await (0, socialController_1.initializeCircles)();
});
//# sourceMappingURL=index.js.map