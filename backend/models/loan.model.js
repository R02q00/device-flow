export default(sequelize, DataTypes) =>{
    const Loan = sequelize.define("loan", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        loaner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tools: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
        },
        end: {
            type: DataTypes.DATE,
        }
    });
    return Loan
}