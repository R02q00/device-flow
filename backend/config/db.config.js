export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "mdpPostgres",
    DB: "device_flow",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};