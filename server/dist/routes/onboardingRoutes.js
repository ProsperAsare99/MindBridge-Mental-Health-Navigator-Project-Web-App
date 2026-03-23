"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onboardingController_1 = require("../controllers/onboardingController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// All onboarding routes require authentication
router.use(auth_1.authenticateToken);
router.get('/status', onboardingController_1.getOnboardingStatus);
router.post('/update', onboardingController_1.updateOnboarding);
exports.default = router;
//# sourceMappingURL=onboardingRoutes.js.map