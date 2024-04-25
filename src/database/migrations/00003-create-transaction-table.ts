module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paidDetail: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      changeDetail: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transaction');
  },
};
