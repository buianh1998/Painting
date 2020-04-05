import expressSession from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(expressSession);
let sessionStore = new MongoStore({
    url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    saveUninitialized: true,
});
let configSession = (app) => {
    app.use(
        expressSession({
            key: "express.sid",
            secret: "My Secret",
            resave: true,
            store: sessionStore,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        })
    );
};

module.exports = configSession;
