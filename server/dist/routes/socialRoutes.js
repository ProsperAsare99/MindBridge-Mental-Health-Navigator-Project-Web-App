"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socialController_1 = require("../controllers/socialController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Circles
router.get('/circles', auth_1.authenticateToken, socialController_1.getCircles);
router.post('/circles/:id/join', auth_1.authenticateToken, socialController_1.joinCircle);
router.get('/circles/:id/posts', auth_1.authenticateToken, socialController_1.getPosts);
router.post('/circles/:id/posts', auth_1.authenticateToken, socialController_1.createPost);
// Stories
router.get('/stories', auth_1.authenticateToken, socialController_1.getStories);
router.post('/stories', auth_1.authenticateToken, socialController_1.createStory);
// Encouragement & Mentorship
router.post('/encourage', auth_1.authenticateToken, socialController_1.sendEncouragement);
router.post('/mentor/request', auth_1.authenticateToken, socialController_1.requestMentor);
exports.default = router;
//# sourceMappingURL=socialRoutes.js.map