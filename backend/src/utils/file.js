const fs = require('fs/promises');

const deleteFile = async (filePath) => {
    if (!filePath) return;
    try {
        await fs.unlink(filePath);
    } catch (err) {
        if (err.code !== 'ENOENT') console.error(err);
    }
    return;
};

const deleteFiles = async (files) => {
    for (const file of files) {
        await deleteFile(file);
    }
};

module.exports = { deleteFile, deleteFiles };
