"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticateToken, analyticsController_1.getUserAnalytics);
router.post('/mood-insight', auth_1.authenticateToken, analyticsController_1.getMoodInsight);
exports.default = router;
//# sourceMappingURL=analyticsRoutes.js.map