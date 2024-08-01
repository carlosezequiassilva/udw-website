const Category = require('../models/Category');
const User = require('../models/User');
const Post = require('../models/Posts');
const Tags = require('../models/Tags');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const adminPage = (req, res) => {
    const locals = {
        title: 'Login',
        mainLink: 'css/main.css',
        link: 'css/admin.css'
    }
    var layoutAdmin = 'true'
    res.render('admin/admin', { layoutAdmin, locals });
}

const adminValidation = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            req.flash('admin', 'Erro na validação!');
            res.redirect('/admin');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            req.flash('admin', 'Erro na validação!');
            res.redirect('/admin');
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({ username, password:hashedPassword });
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({ message: 'User Already in use' });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.log(error);
    }
}

const dashboardPage =  async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            mainLink: 'css/main.css',
            link: 'css/dashboard.css'
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
        var layoutAdmin = 'true'
        const dataCat = await Category.find();
        const dataPost = await Post.find();
        res.render('admin/dashboard', {
            layoutAdmin,
            locals,
            dataCat,
            dataPost,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            prevPage: hasPrevPage ? prevPage : null
        });
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    adminPage,
    adminValidation,
    register,
    dashboardPage,
}