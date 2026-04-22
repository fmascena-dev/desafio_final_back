const { Router } = require('express');
const controller = require('../controllers/shelterController');
const { shelterRules, validate } = require('../middleware/validation');

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', shelterRules, validate, controller.store);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
