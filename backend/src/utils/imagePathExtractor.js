const extractPaths = (images) => {
    const paths = [];
    images.map((image) => {
        paths.push(image.path);
    });
    return paths;
};

module.exports = { extractPaths };
