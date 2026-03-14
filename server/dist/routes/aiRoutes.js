"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/chat', auth_1.authenticateToken, aiController_1.chatWithOracle);
router.get('/history', auth_1.authenticateToken, aiController_1.getChatHistory);
exports.default = router;
//# sourceMappingURL=aiRoutes.js.map