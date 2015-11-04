console.log('Loading S2 Function');

var pg = require("pg");

exports.handler = function(event, context) {

var conn = "pg://user:password@host:5432/bd_name";

var client = new pg.Client(conn);
client.connect();
//var id = event.id;
console.log('Connected to PostgreSQL database');
var query = client.query("SELECT * FROM PAYMENT_PLANS WHERE ID = 1");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    var jsonString = JSON.stringify(result.rows);
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonString);
    client.end();
    context.succeed(jsonObj);
});
};
