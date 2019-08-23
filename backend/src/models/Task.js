const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('tarefas', {
    titulo: {
        type: Sequelize.STRING
    },
    completada: {
        type: Sequelize.BOOLEAN
    },
    image_url: {
        type: Sequelize.STRING
    },
});

// PostSchema.pre('save', function() {
//     if (! this.url) {
//         this.url = `${process.env.APP_URL}/files/${this.key}`;
//     }
// });

// PostSchema.pre('remove', function() {
//     if (process.env.STORAGE_TYPE === 's3') {
//         return s3.deleteObject({
//             Bucket: process.env.AWS_BUCKET,
//             Key: this.key,
//         }).promise();
//     } else {
//         return promisify(fs.unlink)(
//             path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
//         );
//     }
// });

Task.sync();

module.exports = Task;
