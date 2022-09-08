const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost); // Nous utilisons deux-points ":" en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.getLikes);
router.post('/:id/moderated', auth, postCtrl.moderatePost);
router.get('/:id/moderated', auth, postCtrl.getModeratePost);


module.exports = router;
