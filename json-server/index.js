const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

// задержка для имитации реального апи
server.use(async (req, res, next) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
    next();
});

// эндпоинт для логина
server.post('/login', (req, res) => {
    const { username, password } = req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users = [] } = db;

    const userFromBd = users.find(
        (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
        return res.json(userFromBd);
    }

    return res.status(403).json({ message: 'AUTH ERRROR' });
});

// проверяем авторизован ли пользователь
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERRROR=' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('JSON Server is running on 8000');
});