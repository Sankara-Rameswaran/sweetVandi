const { Router } = require('express');
const { healthChecker } = require('../controllers/health.controller');

const router = Router();

router.get('/health', healthChecker);

module.exports = router;
