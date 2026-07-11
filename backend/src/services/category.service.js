const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');

const getCategoriesService = async () => {
    const data = await Category.find({ isActive: true });
    return data;
};

const createCategoryService = async (category) => {
    const isExists = await Category.findOne({ name: category.name });
    if (isExists) throw new ApiError(409, 'Category Already Exists');
    category = await Category.create(category);
    return category;
};

const getById = async (id) => {
    const category = await Category.findById(id);
    if (!category) throw new ApiError(404, 'Category Not Found');
    return category;
};

const updateById = async (id, data) => {
    const category = await Category.replaceOne({ _id: id }, data, { returnDocument: 'after' });
    if (!category) throw new ApiError(404, 'Category Not Found');
    return category;
};

const partialUpdateById = async (id, data) => {
    const category = await Category.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    if (!category) throw new ApiError(404, 'Category Not Found');
    return category;
};

const deleteCategoryService = async (id) => {
    const category = await partialUpdateById(id, { isActive: false });
    return category;
};

module.exports = {
    getCategoriesService,
    createCategoryService,
    getById,
    updateById,
    partialUpdateById,
    deleteCategoryService,
};
