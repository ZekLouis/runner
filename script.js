console.log("---WELCOME TO RUNNER SERVER---")
// Chargement de socket.io
var io = require('socket.io').listen(8080);
var nb_joueurs = 0;
var joueurs = {};

setInterval(function(){
	io.sockets.emit('joueurs', {
        joueurs : joueurs, 
        timestamp : new Date().getTime()
    });
}, 1000/30);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
	nb_joueurs++;

    socket.on('message', function(data){
    	console.log(data);
    });

    socket.on('new_player',function(data){
    	console.log("---NEW PLAYER---",'Joueur connecté en tant que :',data.pseudo);
    	socket.emit('id',socket.id);
    	// console.log('Un client est connecté !');
	    console.log('id :',socket.id);
	    socket.pseudo = data.pseudo;
	    socket.x = data.x;
	    socket.y = data.y;
	    joueurs[socket.id] = {pseudo: data.pseudo, x: data.x, y: data.y, vx: data.vx, vy: data.vy};
	    socket.emit('nb_joueurs',nb_joueurs);
	    socket.broadcast.emit('nb_joueurs',nb_joueurs);
    	socket.broadcast.emit('new_player',{pseudo: data.pseudo, x: data.x, y: data.y});
    
        socket.on('maPosition',function(data){
            joueurs[socket.id].x = data.x;
            joueurs[socket.id].y = data.y;
            joueurs[socket.id].vx = data.vx;
            joueurs[socket.id].vy = data.vy;
        })

    });

    // socket.on('getId',function(){
    // 	socket.emit
    // })

    socket.on('disconnect', function(){
    	nb_joueurs--;
    	console.log("---DEL PLAYER---",'Joueur déconnecté en tant que :',socket.pseudo);
    	delete(joueurs[socket.id]);
    	socket.broadcast.emit('del_player',socket.id);
    	socket.broadcast.emit('nb_joueurs',nb_joueurs);
    });
});


//server.listen(8080);
console.log("---OPEN---");
