"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assessmentController_1 = require("../controllers/assessmentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, assessmentController_1.createAssessment);
router.get('/', auth_1.authenticateToken, assessmentController_1.getUserAssessments);
exports.default = router;
//# sourceMappingURL=assessmentRoutes.js.map