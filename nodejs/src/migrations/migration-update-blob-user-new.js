module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'imge', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'imge', {
                type: Sequelize.STRING,
                allowNull: true,
            
            })
        ])
    }
};