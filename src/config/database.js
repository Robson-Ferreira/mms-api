module.exports = {
    dialect: 'postgres',
    host: '192.168.1.104',
    username: 'admin',
    password: 'admin',
    database: 'mms',
    timezone: "utc",
    define: {
        timestamps: true,
        underscored: true
    }
}