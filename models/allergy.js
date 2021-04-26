module.exports = (sequelize, DataTypes) => {
    const Allergy = sequelize.define('allergys', {
        description: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: (models) => {
                    Allergy.belongsTo(models.historyAllergies)
                },
                get(data) {
                    return []
                }
            }
        }
    )
    return Allergy
}