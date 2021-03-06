const express = require('express');
const models = require('./models')
const sequelize = require('sequelize');
const status = require('./helpers/http-status')
const cors = require("cors")
const mysql = require('mysql');
const port = 4040;
const app = express();

app.use(cors())
app.use(express.json())

/**
 * ROUTES
 */
const CitizenRoutes = require("./routes/CitizenRoutes")
app.use('/citizen', CitizenRoutes)

const AllergyRoutes = require('./routes/AllergyRoutes')
app.use('/alergy', AllergyRoutes)

const EthnicityRoutes = require('./routes/EthnicityRoutes')
app.use('/ethnicity', EthnicityRoutes)

const HealthPlanRoutes = require('./routes/HealthPlanRoutes')
app.use('/healthPlan', HealthPlanRoutes)

const ReligionRoutes = require('./routes/ReligionRoutes')
app.use('/religion', ReligionRoutes)

const VaccineRoutes = require('./routes/VaccineRoutes');
app.use('/vaccine', VaccineRoutes)

const VaccineWalletRoutes = require('./routes/VaccineWalletRoutes');
app.use('/vaccineWallet', VaccineWalletRoutes)

const CivilStatusRoutes = require('./routes/CivilStatusRoutes');
app.use('/civilstatus', CivilStatusRoutes)

const DegreeRoutes = require('./routes/DegreeRoutes');
app.use('/degree', DegreeRoutes)

app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);

    app.get('/', (req, res) => {
        var mysqlHost = process.env.MYSQL_HOST || 'localhost';
        var mysqlPort = process.env.MYSQL_PORT || '3306';
        var mysqlUser = process.env.MYSQL_USER || 'root';
        var mysqlPass = process.env.MYSQL_PASS || 'root';
        var mysqlDB = process.env.MYSQL_DB || 'vacinapp';

        var connectionOptions = {
            host: mysqlHost,
            port: mysqlPort,
            user: mysqlUser,
            password: mysqlPass,
            database: mysqlDB
        };
        console.log('MySQL Connection config:');
        console.log(connectionOptions);
        var connection = mysql.createConnection(connectionOptions);
        connection.connect();
    })
})
