const { Router } = require('express');
const router = Router();
const { requireAuth, checkUser }= require('../middlewares/authMiddleware');


const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const dashboardController = require('../controllers/dashboardController');
const offerController = require('../controllers/offerController');
const registerController = require('../controllers/registerController');


// Register routes

router.get('/register', registerController.register_get);
router.post('/register', registerController.register_post);

// Login routes
router.get('/login', loginController.login_get);
router.post('/login', loginController.login_post);

// Profile routes
router.get('/profile/:id', profileController.profile_get);
router.put('/profile/:id', profileController.profile_update);
router.delete('/profile/:id', profileController.profile_delete);

// Dashboard routes
router.get('/dashboard', dashboardController.dashboard_get);

// Offer routes
router.post('/offer', offerController.offer_post);
router.get('/offer', offerController.offer_get);
/* router.get('/offer/:id', offerController.offer_get_id);
router.delete('/offer/delete/:id', offerController.offer_delete);
router.put('/offer/update/:id', offerController.offer_update); */


module.exports = router;