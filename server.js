const uuid = require("uuid");
const net = require("net");
let users = [];
let numberOfTotalUsers = 0;
let server = net.createServer(client => {
    client.setEncoding("utf-8");
    client.id = uuid.v4();
    client.name = `Client${numberOfTotalUsers + 1}`;
    users.push(client);
    numberOfTotalUsers++;
    writeMessageToAllOtherUsers(`${client.name} (${client.id}) connected`, client);
    console.log(`${client.name} (${client.id}) connected`);

    client.on("data", data => {
        if (data === "quit\n") {
            client.end();
        } else {
            client.write("Message sent to all other users");
            writeMessageToAllOtherUsers(`Message from ${client.name} (${client.id}): ${data}`, client);
            console.log(`Message sent from ${client.name} (${client.id}) to all other users`);
            console.log(`Message: ${data}`);
        }
    });

    client.on("end", () => {
        writeMessageToAllOtherUsers(`${client.name} (${client.id}) disconnected`, client);
        console.log(`${client.name} (${client.id}) disconnected`);
        users = users.filter(user => user.id !== client.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running");
});

server.on("end", () => {
    console.log("Server ended");
});

server.on("error", (err) => {
    console.log(`Error occurred: ${err}`)
});

function writeMessageToAllOtherUsers(message, client) {
    for (let user of users) {
        if (user.id !== client.id) {
            user.write(`${message}`);
        }
    }
}