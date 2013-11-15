var SERVER_PORT = 8800;
 
var restify = require('restify');
var server = restify.createServer();
 

var example_record;

var example_record1 = {user_id : '1', username : 'jsmith1', first_name : 'John1', last_name : 'Smith1'};
var example_record2 = {user_id : '2', username : 'jsmith2', first_name : 'John2', last_name : 'Smith2'};
var example_record3 = {user_id : '3', username : 'jsmith3', first_name : 'John3', last_name : 'Smith3'};
var example_record4 = {user_id : '4', username : 'jsmith4', first_name : 'John4', last_name : 'Smith4'};
var example_record5 = {user_id : '5', username : 'jsmith5', first_name : 'John5', last_name : 'Smith5'};
 
var records = [example_record1,example_record3,example_record2,example_record4,example_record5];

var getRecordById = function (id) {
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		console.log(record.user_id);
		if (record.user_id == id)  {
			return record;
		}
	}
}
var getAllRecord = function (req, res, next) {
	res.send(records);
     next();
}

var respond_attribute = function(req, res, next) {
    requested_attribute = req.params.attrib_name;
    requested_id = req.params.id;
 
	
	example_record = getRecordById(requested_id);
 
    // Check if they are requesting our example record
    if(example_record.user_id == requested_id) {
        // Make sure it's a valid attribute
        if(example_record.hasOwnProperty(requested_attribute)) {
            // Send back only the attribute requested
            var return_data = {};
            return_data[requested_attribute] = example_record[requested_attribute];
            res.send(return_data);
            next();
        } else {
            // Return an error
            next( new Error("Invalid user attribute") );
        }
    } else {
        // Return an error
        next(new Error("Invalid user ID specified"));
    }
}
 
var respond_record = function(req,res,next) {
    requested_attribute = req.params.attrib_name;
    requested_id = req.params.id;
 
	example_record = getRecordById(requested_id);
 
    // Check if they are requesting our example record
    if(example_record.user_id == requested_id) {
        // Send back the full record
        res.send(example_record);
    } else {
        // Return an error
        next(new Error("Invalid user ID specified"));
    }
}

var myRsFunc = function(req, res, next) {
	var a = req.params.a;
	var b = req.params.b;
    console.log(a);
    console.log(b);
	a = parseInt(req.params.a);
	b = parseInt(req.params.b);
    console.log(a);
    console.log(b);
	var sum = a + b;
	res.send(sum+'');
}
 
var server_up = function() {
    console.log("Example REST webservice running on " + server.url);
}
 
// We setup the routes to specify how requests to the server will be handled
// In this case we are going to listen for user ID requests and user ID + attribute requests
server.get("/users/:id",respond_record);
server.get("/users/:id/:attrib_name",respond_attribute);
server.get("/somme/:a/:b",myRsFunc);
server.get("/all",getAllRecord);
 
server.listen(SERVER_PORT, server_up);