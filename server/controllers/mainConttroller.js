const Tags = require('../models/Tags');
const Attributes = require('../models/Attributes');
const Category = require('../models/Category');
const Post = require('../models/Posts');

const tags = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/tags.css',
            script: 'js/main.js'
        }
        var layoutAdmin = 'false'
        const data = await Tags.find().populate('post');
        res.render('tags', { data, locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
}
const attributes = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/attributes.css',
            script: 'js/main.js'
        }
        var layoutAdmin = 'false'
        const data = await Attributes.find().populate([{path: 'post'}, {path: 'tags', populate: 'post'}])
        res.render('attributes', { data, locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
}

const inicialPage = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/index.css',
            script: 'js/main.js'
        }
        let perPage = 6
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { date: 1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const prevPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPrevPage = prevPage => Math.ceil(count / perPage);
        var layoutAdmin = 'false'
        res.render('index', { 
            locals,
            layoutAdmin,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: hasPrevPage ? prevPage : null
        });
    } catch (error) {
        console.log(error);
    }
}
const contactPage = (req, res) => {
    try {
        var locals = { 
            title: 'Contato - Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/contact.css',
            script: 'js/main.js'
        }
        var layoutAdmin = 'false'
        res.render('contato', { locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
}
const aboutPage = (req, res) => {
    try {
        var locals = { 
            title: 'Sobre - Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/contents.css',
            script: 'js/main.js'
        }
        var layoutAdmin = 'false'
        res.render('sobre', { locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
}
const privacyPolicy = (req, res) => {
    try {
        var locals = { 
            title: 'Politica de Privacidade - Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/contents.css',
            script: 'js/main.js'
        }
        var layoutAdmin = 'false'
        res.render('privacidade', { locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
}
const blogPage = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: 'css/main.css',
            link: 'css/contents.css',
            script: 'js/main.js'
        }
        let perPage = 10
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: { date: 1 } } ])

        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const prevPage = parseInt(page) - 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        const hasPrevPage = prevPage => Math.ceil(count / perPage);
        var layoutAdmin = 'false'
        const category = await Category.find();
        res.render('blog', {
            category,
            locals,
            layoutAdmin,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: hasPrevPage ? prevPage : null
        });
    } catch (error) {
        console.log(error);
    }
}


const search = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/contents.css',
            script: '/js/main.js'
        }
        var layoutAdmin = 'false'
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Post.find({
            "index": { $regex: new RegExp(searchNoSpecialChar, 'i') } 
        });

        res.render("search", { data, locals, layoutAdmin });
    } catch (error) {
        console.log(error);
    }
};

const filter = async (req, res) => {
    try {
        const category = await Category.find();
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/contents.css',
            script: '/js/main.js'
        }
        var layoutAdmin = 'false'
        const filter = req.body.category;
        const data = await Post.find({ category: filter }).populate('category');;

        res.render('filter', { category, data, locals, layoutAdmin });
    } catch (error) {
        console.log(error)
    }
};

const post = async (req, res) => {
    try {
        var namePost = req.params.postTitle.replace(/-/g, " ");
        const data = await Post.findOne({ postTitle: namePost }).populate('category');
        const dataTags = await Tags.find().populate('post');
        const dataAtrs = await Attributes.find().populate('post');
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/contents.css',
            script: '/js/main.js'
        }
        var layoutAdmin = 'false'
        res.render('post', { locals, layoutAdmin, data, dataTags, dataAtrs });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    inicialPage,
    contactPage,
    aboutPage,
    privacyPolicy,
    blogPage,
    tags,
    attributes,
    search,
    filter,
    post
}
