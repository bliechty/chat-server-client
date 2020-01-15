const uuid = require("uuid");
const net = require("net");
let users = [];
let server = net.createServer(client => {
    client.id = uuid.v4();
    users.push(client);

    client.on("data", data => {

    });
});

server.listen(3000);

server.on("end", () => {

});

server.on("error", (err) => {
    console.log(`Error occurred: ${err}`)
});