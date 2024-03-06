import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Manufacturer = sequelize.define('Manufacturer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Manufacturer;
