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

module.exports = { deleteFile };
