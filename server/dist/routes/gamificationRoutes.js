"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamificationController_1 = require("../controllers/gamificationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/stats', auth_1.authenticateToken, gamificationController_1.getGamificationStats);
router.get('/challenges', auth_1.authenticateToken, gamificationController_1.getChallenges);
router.post('/challenges/:challengeId/join', auth_1.authenticateToken, gamificationController_1.joinChallenge);
exports.default = router;
//# sourceMappingURL=gamificationRoutes.js.map