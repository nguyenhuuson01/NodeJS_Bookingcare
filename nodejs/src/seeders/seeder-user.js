'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'admin@gmail.com',
            password: '123456', // plain text password
            firstName: 'nguyenson',
            lastName: 'son',
            address: 'VN',
            phonenumber: '123456789',
            gender: 1,
            imge: '',
            roleId: 'admin',
            positionId: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};