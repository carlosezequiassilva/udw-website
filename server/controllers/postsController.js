const Posts = require('../models/Posts');
const Category = require('../models/Category');
const Attributes = require('../models/Attributes');
const Tags = require('../models/Tags');


const addPostGet = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/edit-ctg.css'
        }
        var layoutAdmin = 'true'
        const category = await Category.find();
        const attributes = await Attributes.find();
        const tags = await Tags.find();
        res.render('admin/addPost', { layoutAdmin, locals, category, tags, attributes });
    } catch (error) {
        console.log(error);
    }
}

const addPostPost = async (req, res) => {
    try {
        const newPost = new Posts({
            postTitle: req.body.posttitle,
            description: req.body.description,
            content: req.body.content,
            image: req.body.img,
            category: req.body.category,
            tags: req.body.tags,
            attributes: req.body.attributes,
            index: req.body.index
        });
        await Posts.create(newPost);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const editPostGet = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/edit-ctg.css'
        }
        var layoutAdmin = 'true'
        var namePost = req.params.postTitle.replace(/-/g, " ");
        const data = await Posts.findOne({ postTitle: namePost });
        const category = await Category.find();
        res.render('admin/editPost', { data, locals, layoutAdmin, category });
    } catch (error) {
        console.log(error);
    }
}

const editPostPut = async (req, res) => {
    try {
        const data = await Posts.findByIdAndUpdate(req.params.id, {
            postTitle: req.body.posttitle,
            description: req.body.description,
            content: req.body.content,
            image: req.body.img,
            index: req.body.index,
            category: req.body.category
        });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    try{
        await Posts.deleteOne( { _id: req.params.id } );
        res.redirect('/dashboard');
    } catch(error){
        res.render('/404');
        res.status('201').json(error);
    }
}

module.exports = {
    addPostGet,
    addPostPost,
    editPostGet,
    editPostPut,
    deletePost
}