const seedUser = require('./user');

const sequelize = require('../config/connection');

const seedData = async () => {
    await sequelize.sync( {force : false} );
    await seedUser();
    process.exit(0);
};

seedData();