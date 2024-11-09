// server.js
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("data/cities.json");
const middlewares = jsonServer.defaults();

// Добавляем задержку
server.use((req, res, next) => {
  setTimeout(next, 2000); // Задержка в 2000 миллисекунд
});

server.use(middlewares);
server.use(router);

server.listen(9000, () => {
  console.log("JSON Server is running on port 9000");
});
