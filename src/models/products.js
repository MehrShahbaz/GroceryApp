import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manufacturerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Manufacturers',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
});

export default Product;
