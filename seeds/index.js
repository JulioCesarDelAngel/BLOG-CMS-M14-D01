const seedUser = require('./user');
const seedPost = require('./post');

const sequelize = require('../config/connection');

const seedData = async () => {
    await sequelize.sync( {force : false} );
    await seedUser();
    await seedPost();
    process.exit(0);
};

seedData();