
export default (sequelieze, DataTypes) =>{
    const Tools = sequelieze.define("tools",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sequence_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo:{
            type: DataTypes.STRING,
        },
        statut: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Tools
}