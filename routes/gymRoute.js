const express = require('express');
const router = express.Router();
const GymCtrl = require('../controllers/gymCtrl');

router.get('/gyms/all', GymCtrl.getAllGyms);

router.post('/gym/create', GymCtrl.createGym);
router.post('/gym/review', GymCtrl.addReview);
router.post('/register/member',GymCtrl.addMember);
router.post('/search-gym', GymCtrl.search);
router.get('/gyms/leaderboard', GymCtrl.leaderBoard);

module.exports = router;