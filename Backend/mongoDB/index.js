/**
 * @author Nisarg Vaghela
 */

const { default: mongoose } = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
    .then((conn) => {
        console.log(`MongoDB connected to ${conn.connection.host}`);
    })
    .catch(() => console.log(`Please set DATABASE_URL in .env file`));
