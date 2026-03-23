"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moodController_1 = require("../controllers/moodController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, upload_1.upload.fields([
    { name: 'moodPhoto', maxCount: 1 },
    { name: 'moodAudio', maxCount: 1 }
]), moodController_1.createMood);
router.get('/', auth_1.authenticateToken, moodController_1.getUserMoods);
router.get('/stats', auth_1.authenticateToken, moodController_1.getMoodStats);
router.get('/nudges', auth_1.authenticateToken, moodController_1.getProactiveNudges);
exports.default = router;
//# sourceMappingURL=moodRoutes.js.map