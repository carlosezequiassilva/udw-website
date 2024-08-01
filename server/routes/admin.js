const { adminPage, adminValidation, register, dashboardPage } = require('../controllers/admin');
const { addCategoryPost, editCategory, editCategoryPut, deleteCategory } = require('../controllers/categoryControler');
const { addPostGet, addPostPost, editPostGet, editPostPut, deletePost } = require('../controllers/postsController');
const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/auth');


router.get('/admin', adminPage);

router.post('/admin', adminValidation);

router.post('/registre',authMiddleware, register);

router.get('/dashboard',authMiddleware, dashboardPage);

// CATEGORY ROUTER
router.post('/add-categories',authMiddleware, addCategoryPost);

router.get('/edit-category/:id',authMiddleware, editCategory);

router.put('/edit-category/:id',authMiddleware, editCategoryPut);

router.delete('/delete-category/:id',authMiddleware, deleteCategory);

// POSTS ROUTERS
router.get('/add-post',authMiddleware, addPostGet);

router.post('/add-post',authMiddleware, addPostPost);

router.get('/edit-post/:postTitle',authMiddleware, editPostGet);

router.put('/edit-post/:id',authMiddleware, editPostPut);

router.delete('/delete-post/:id',authMiddleware, deletePost);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin')
});

module.exports = router