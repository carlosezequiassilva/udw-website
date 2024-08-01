const Category = require('../models/Category');

//@desc Add category
//@route POST /admin/add-categories
//@access admin

const addCategoryPost = async (req, res) => {
    try {
        try {
            const newCategory = new Category({
                name: req.body.name,
            });
            const { name } = req.body;
            const categoryName = await Category.findOne({ name });
            if(categoryName){
                req.flash('category', 'Categoria já existente!');
                res.redirect('/dashboard');
            }
            else if(!name){
                req.flash('category', 'Campo do formulário vazio');
                res.redirect('/dashboard');
            } 
            else{
                await Category.create(newCategory);
                res.redirect('/dashboard'); 
            }       
        } catch (error) {
            res.render('/404');
            res.status('201').json(error);
        }
    } catch (error) {
        res.render('/404');
        res.status('201').json(error);
    }
}

//@desc Edit category
//@route GET /admin/add-categories
//@access admin

const editCategory = async (req, res) => {
    try {
        var locals = { 
            title: 'Universe Dev Web',
            mainLink: '/css/main.css',
            link: '/css/edit-ctg.css'
        }
        var layoutAdmin = 'true'
        const data = await Category.findOne({ _id: req.params.id });
        res.render('admin/edit-category', { data, locals, layoutAdmin });
    } catch (error) {
        res.render('/404');
        res.status('201').json(error);
    }
}

//@desc Edit category
//@route PUT /admin/add-categories
//@access admin

const editCategoryPut = async (req, res) => {
    try{
        await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        });
        res.redirect('/dashboard');
    } catch( error ){
        res.render('/404');
        res.status('201').json(error);
    }
}

//@desc Delete category
//@route DELETE /admin/add-categories
//@access admin

const deleteCategory = async (req, res) => {
    try{
        await Category.deleteOne( { _id: req.params.id } );
        res.redirect('/dashboard');
    } catch(error){
        res.render('/404');
        res.status('201').json(error);
    }
}

module.exports = {
    addCategoryPost,
    editCategory,
    editCategoryPut,
    deleteCategory
}