import { Sequelize } from 'sequelize';

const config = new Sequelize('grocery_app', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

export default config;
