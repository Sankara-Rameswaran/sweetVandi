const {
    getCategoriesService,
    createCategoryService,
    getById,
    updateById,
    partialUpdateById,
    deleteCategoryService,
} = require('../services/category.service');

const getCategories = async (req, res) => {
    const data = await getCategoriesService();
    res.status(200).json({
        success: true,
        message: 'Data fetched successfully!',
        data,
    });
};

const createCategory = async (req, res) => {
    var data = req.body;
    const userId = req.user._id;
    data = { ...data, createdBy: userId };
    const response = await createCategoryService(data);
    res.status(200).json({
        success: true,
        message: 'Category Added Successfully!',
        data: response,
    });
};

const getCategoryById = async (req, res) => {
    const id = req.params.id;
    const category = await getById(id);
    res.status(200).json({
        success: true,
        message: 'Data fetched successfully',
        data: category,
    });
};

const updateCategory = async (req, res) => {
    const id = req.params.id;
    const category = await updateById(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Updated Successfully!',
        data: category,
    });
};

const partialUpdateCategory = async (req, res) => {
    const id = req.params.id;
    const category = await partialUpdateById(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Update Successfully',
        data: category,
    });
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const category = await deleteCategoryService(id);
    res.status(200).json({
        success: true,
        message: 'Deleted the category',
        data: category,
    });
};

module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    partialUpdateCategory,
    deleteCategory,
};
