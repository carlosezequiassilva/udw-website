const express = require('express');
const router = express.Router();

const { inicialPage, contactPage, aboutPage, privacyPolicy, blogPage, search, filter, post, attributes, tags } = require('../controllers/mainConttroller');

router.get('/', inicialPage);

router.get('/contato', contactPage);

router.get('/sobre', aboutPage);

router.get('/privacidade', privacyPolicy);

router.get('/blog', blogPage);

router.get('/tags', tags);

router.get('/attributes', attributes);

router.post('/search', search);

router.post('/filter', filter);

router.get('/post/:postTitle', post);

router.get('/404', (req, res) => {
    const locals = {
        title: 'erro',
        mainLink: 'css/main.css',
        link: 'css/erro.css'
    }
    var layoutAdmin = 'true'
    res.render('404', { locals, layoutAdmin });
});
router.get('/test', (req, res) => {
    const locals = {
        title: 'Dashboard',
        mainLink: 'css/main.css',
        link: 'css/contents.css'
    }
    var layoutAdmin = 'false'
    res.render('test', {locals, layoutAdmin})
})

module.exports = router