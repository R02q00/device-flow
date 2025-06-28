import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";
import ToolsModel from "./tools.model.js";
import LoanModel from "./loan.model.js";
 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);

db.tools = ToolsModel(sequelize, Sequelize);
db.loan = LoanModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles", as: "roles" });

db.loan.belongsToMany(db.tools, {
    through: "loan_tools",
    foreignKey: "loan_id", 
});
  
db.tools.belongsToMany(db.loan, {
    through: "loan_tools", 
    foreignKey: "tool_id", 
});

 
db.ROLES = ["user", "admin", "moderator"];

export default db;