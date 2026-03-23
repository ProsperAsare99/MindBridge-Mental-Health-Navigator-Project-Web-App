"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAssessments = exports.createAssessment = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createAssessment = async (req, res) => {
    const { type, score, severity } = req.body;
    try {
        if (!req.user || !req.userId)
            return res.status(401).json({ error: 'Not authenticated' });
        const userId = req.userId;
        const assessment = await prisma_1.default.assessment.create({
            data: {
                userId,
                type: type.toUpperCase().replace(/[- ]/g, ''),
                score,
                severity: severity ? severity.toUpperCase().replace(/[- ]/g, '_') : undefined,
                responses: req.body.responses || []
            }
        });
        res.status(201).json(assessment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error creating assessment' });
    }
};
exports.createAssessment = createAssessment;
const getUserAssessments = async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: 'Not authenticated' });
        const assessments = await prisma_1.default.assessment.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(assessments);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error fetching assessments' });
    }
};
exports.getUserAssessments = getUserAssessments;
//# sourceMappingURL=assessmentController.js.map