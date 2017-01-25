var Promise = require('bluebird');
var doc = require('dynamodb-doc');
var dynamo = Promise.promisifyAll(new doc.DynamoDB());
var ticketTableName = "choozago.ticket";

exports.handler = function (event, context) {
	switch(event.action){
		case "getTicket" : 
			getTicketStatus(event.data.ticketId).then(function(ticket){
				context.succeed(ticket);
			});
			break;
		default:
			context.succeed("Wrong payload");
			break;
	}
};

function getTicketStatus(ticketId){
	var params = {};
    params.TableName = ticketTableName;
    params.Key = {ticketid : ticketId};

    return dynamo.getItemAsync(params).then(function(data){
    	return data.Item;
    });
}