const allMoney = [
  {
    displayName: 'coin 1 bath',
    code: 'COIN_1_BATH',
    type: 'COIN',
    currency: 'THB',
    value: 1,
    amount: 0,
  },
  {
    displayName: 'coin 5 bath',
    code: 'COIN_5_BATH',
    type: 'COIN',
    currency: 'THB',
    value: 5,
    amount: 0,
  },
  {
    displayName: 'coin 10 bath',
    code: 'COIN_10_BATH',
    type: 'COIN',
    currency: 'THB',
    value: 10,
    amount: 0,
  },
  {
    displayName: 'bank 20 bath',
    code: 'BANK_20_BATH',
    type: 'BANK_NOTE',
    currency: 'THB',
    value: 20,
    amount: 0,
  },
  {
    displayName: 'bank 50 bath',
    code: 'BANK_50_BATH',
    type: 'BANK_NOTE',
    currency: 'THB',
    value: 50,
    amount: 0,
  },
  {
    displayName: 'bank 100 bath',
    code: 'BANK_100_BATH',
    type: 'BANK_NOTE',
    currency: 'THB',
    value: 100,
    amount: 0,
  },
  {
    displayName: 'bank 500 bath',
    code: 'BANK_500_BATH',
    type: 'BANK_NOTE',
    currency: 'THB',
    value: 500,
    amount: 0,
  },
  {
    displayName: 'bank 1000 bath',
    code: 'BANK_1000_BATH',
    type: 'BANK_NOTE',
    currency: 'THB',
    value: 1000,
    amount: 0,
  },
];

const addTimestamp = (objectList) => {
  const now = new Date().toISOString();
  return objectList.map((obj) => ({
    ...obj,
    createdAt: now,
    updatedAt: now,
  }));
};

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('change', addTimestamp(allMoney), {
        transaction,
      });
    });
  },
};
