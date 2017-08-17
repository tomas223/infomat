config = {};

// Oracle DB connection configuration
config.dbConfig = {};
config.dbConfig.user = "user[proxy]";
config.dbConfig.password = "xxxxx";
config.dbConfig.connectString = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=HOST.DOMAIN.COM)(PORT=1521))(CONNECT_DATA=(UR=A)(SERVICE_NAME=DATABASE.NAME.COM)(SERVER=DEDICATED)))";


// paths to sql query configs folder and and fields config. In windows there has to be \\ instead of \
config.queriesFolder = "C:\\Coding\\nodejs\\infomat\\queries";
config.fieldsFile = "C:\\Coding\\nodejs\\infomat\\cfg\\fields.json";
// config.queriesFolder = "/home/appsupp/node_bin/infomat/queries";
// config.fieldsFile = "/home/appsupp/node_bin/infomat/cfg/fields.json";

config.session = {};
config.session.time = 10 * 60 * 1000; // time of inactivity after user is logged out
config.session.secret = "tXS4C8KVnV7WqM4tJH6vVw3sgy9qLWMA"; // random string


module.exports = config;