const { Router } = require('express');
const router = Router();
const { requireAuth, checkUser }= require('../middlewares/authMiddleware');


const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const dashboardController = require('../controllers/dashboardController');
const offerController = require('../controllers/offerController');
const registerController = require('../controllers/registerController');

// LE MIDDLEWARE CHECKUSER EST OP, PERMET D'ACCEDER A L'ID DU USER AVEC LE LOCALSTORAGE

router.get('*', checkUser)
router.post('*', checkUser)
router.delete('*', checkUser)
router.put('*', checkUser)

// Register routes

router.get('/register', registerController.register_get);
router.post('/register', registerController.register_post);

// Login routes
router.get('/login', loginController.login_get);
router.post('/login', loginController.login_post);

// Profile routes
router.get('/profile',requireAuth, profileController.profile_get);
router.put('/profile', profileController.profile_update);
router.delete('/profile', profileController.profile_delete);

// Dashboard routes
router.get('/dashboard',requireAuth, dashboardController.dashboard_get);

// Offer routes
router.post('/offer',requireAuth, offerController.offer_post);
router.get('/offer',requireAuth, offerController.offer_get);
router.get('/offer/:id',requireAuth, offerController.offer_get_id);
router.delete('/offer/:id', offerController.offer_delete);
router.put('/offer/:id', offerController.offer_update);
router.get('/offer/update/:id', offerController.get_Update_Offer)


module.exports = router;