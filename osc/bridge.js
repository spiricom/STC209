var osc = require('node-osc'),
    io = require('socket.io').listen(8085);

var oscServer, oscClient;

io.sockets.on('connection', function (socket) {
  socket.on("config", function (obj) {
    oscServer = new osc.Server(obj.server.port, obj.server.host);
    oscClient = new osc.Client(obj.client.host, obj.client.port);
    oscClient.send('/status', socket.sessionId + ' connected');
    oscServer.on('message', function(msg, rinfo) {
      	socket.emit("message", msg);
    });
  });
  socket.on("message", function (obj) {
	if (obj.length > 1) {
		oscClient.send(obj[0], obj[1]);
	}
	else {
		oscClient.send(obj[0]);
	}
  });
});