const net = require("net");

let client = net.createConnection({port: 3000}, () => {
    console.log("Connected");
});

client.on("data", data => {
    console.log(data.toString());
});

client.on("end", () => {

});

client.on("error", (err) => {
    console.log(`Error occurred: ${err}`)
});