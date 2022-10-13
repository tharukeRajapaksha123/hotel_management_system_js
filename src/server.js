const http = require("http")
const mongoose = require("mongoose")
const express = require("express")

const router = express()
const chalk = require('chalk');

log = (args) => this.info(args);
info = (args) => console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.blueBright(args) : args);
warning = (args) => console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
error = (args) => console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);

const db_url = "mongodb+srv://root:071656Ad@cluster0.zekgg7g.mongodb.net/test"
const port = 8080

mongoose.connect(db_url)
    .then(() => {
        info('Mongo connected successfully.');
        StartServer();
    })
    .catch(err => {
        //    console.log(err)
        error(err)
    })


const StartServer = () => {
    
    router.use((req, res, next) => {
        /** Log the request */
        info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next(); /**allow to pass through the middleware to next tasks */
    })

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */


    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(port, () => info(`Server is running on port ${port}`));
} 