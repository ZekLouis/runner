//TODO
// Saccade multi
// Pseudo sur chaque joueur

//NEW PROJECT PLAY
var GROUND_Y = 800;
var xpos = 400;
var n_joueur = null;
var socket = io('http://localhost:8080');
others_players = [];
var busy = false;
var mon_id = "";



/*socket.on('new_player', function(data){
	console.log(data.pseudo+" s'est connecté.");
	n_joueur = new Joueur(xpos,GROUND_Y);
});*/
socket.on('del_player', function(data){
	console.log(data+" s'est deconnecté.");
	others_players[data].sprite.remove();
	delete(others_players[data]);
});

socket.on('id',function(data){
	mon_id = data;
	joueur.setId(mon_id);
});

socket.on('joueurs',function(data){
	for(var key in data){
		if(data.hasOwnProperty(key)){
			if(mon_id!=key){
				console.log(key,"->",data[key]);
				if(!others_players.hasOwnProperty(key)){
					others_players[key]=new Joueur(key,data[key].x, data[key].y, data[key].pseudo);
				}
				others_players[key].setPos(data[key].x, data[key].y, data[key].vx, data[key].vy);
			}
		}
	}
})

/*socket.on('update_others', function(data){
	console.log(data);
	n_joueur.setPos(data.x,data.y);
});*/

//socket.on('connect_error',function(err){console.log('Erreur de connexion')})

socket.on('nb_joueurs',function(data){console.log(data+' joueur(s) en ligne.')})

var widthPlatform = 1080;
var id=1;
var espacePlatform = 130;
var speed = 2;
var jump = 30;
var marge_joueur_ecran = 400;
var jumping = false;
var score = 0;
var game = true;
var pseudo = "";
var best_name = "";
var best_score = "";
var temps = 0;
var derniere_col = 0;
var SCORE_TO_WIN = 30;

function sendScore() {
	$.getJSON( "php/postScore.php?pseudo="+pseudo+"&score="+scoreTimeB+"&num_requete=1");
};

function getBest(){
	$.getJSON( "php/postScore.php?&num_requete=2",function(data){
		best_score = data.score;
		best_name = data.nom;
		best_score = best_score.toString().substring(0, best_score.toString().length-3)+':'+best_score.toString().substring(best_score.toString().length-3,4);
	});
};

function updateCamera(){
	camera.position.x = joueur.sprite.position.x*0.1+camera.position.x*0.9;
	camera.position.y = joueur.sprite.position.y*0.1+camera.position.y*0.9;
};

function setup(){
	createCanvas($(window).width(), $(window).height());
	pseudo = prompt("Pseudo : ","Someone");
	//TODO GET ID via serveur puis emit pour pseudo position etc..
	setInterval(function(){
		socket.emit('maPosition',{
			id: mon_id, 
			x: joueur.sprite.position.x, 
			y: joueur.sprite.position.y, 
			vx: joueur.sprite.velocity.x, 
			vy: joueur.sprite.velocity.y
		});
	}, 1000/30);
	getBest();

	joueur = new Joueur(mon_id,xpos,GROUND_Y,pseudo);
	socket.emit('new_player',{
		pseudo: pseudo,
		x: joueur.sprite.position.x, 
		y: joueur.sprite.position.y, 
		vx: joueur.sprite.velocity.x, 
		vy: joueur.sprite.velocity.y
	});
	sol = new Platform(1080,900,1080*3,50,"floor");
	
	
	parcoursPlatform = new ParcoursPlatform();
	platform = new Platform(900, GROUND_Y-50, widthPlatform, 50,"platform");
	platform2 = new Platform(900+widthPlatform+espacePlatform, GROUND_Y-50, widthPlatform, 50,"platform");

	parcoursPlatform.add(platform);
	parcoursPlatform.add(platform2)


	parcours = new Parcours();
	obstacle = new Objet(width/4+3*width, GROUND_Y, 60, 50, color(0),"obs");
	obstacle2 = new Objet(width/2+widthPlatform/2+espacePlatform/2, GROUND_Y, espacePlatform,50,color(0),"obs");
	obstacleRef = new Objet(4000, GROUND_Y, 60, 50,color(0),"obs");
	
	parcours.add(obstacle);
	parcours.add(obstacle2);
	parcours.add(obstacleRef);
	
	parcoursPiece = new ParcoursPiece();
	piece = new Piece(xpos+100,GROUND_Y);
	piece2 = new Piece(3*widthPlatform+espacePlatform,GROUND_Y-100);
	piece3 = new Piece(3*widthPlatform+espacePlatform,GROUND_Y);
	
	parcoursPiece.add(piece);
	parcoursPiece.add(piece2);
	parcoursPiece.add(piece3);
	
	joueur.setVelocity(7);
	start = new Date();
}

function draw(){
	
	time = new Date();
	scoreTimeB = time-start;
	scoreTime = scoreTimeB.toString().substring(0, scoreTimeB.toString().length-3)+':'+scoreTimeB.toString().substring(scoreTimeB.toString().length-3,4);
	background(200);
	text(pseudo,joueur.getX()-joueur.getWidth()/2,joueur.getY()-30);
	if(best_score==""){
		text('Chargement du meilleur score ...',width/2,height/2+25);
	}else{
		text('Meilleur Score : '+best_score+' par : '+best_name,width/2,height/2+25);
	}
	
	camera.on();
	
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && joueur.getVisible() == true){
		joueur.move('-',speed);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && joueur.getVisible() == true){
		joueur.move('+',speed);
		socket.emit('maPosition',{id: id, x: joueur.sprite.position.x, y: joueur.sprite.position.y});
	}

	/*if (keyIsDown(E) && xpos < $(window).width() && joueur.getVisible() == true){
		joueur.shoot();
		socket.emit('maPosition',{id: id, x: joueur.sprite.position.x, y: joueur.sprite.position.y});
	}*/

	updateCamera();

	parcoursPlatform.collision(joueur.getSprite());
	score = parcoursPiece.collision(score,joueur.getSprite());
	
	if (joueur.collision(sol.getSprite())) {
		joueur.setVelocity(0);
	}

	for(var key in others_players){
		if(others_players.hasOwnProperty(key)){
			if(mon_id!=key){
				if(others_players[key].collision(sol.getSprite())){
					others_players[key].setVelocity(0);
					parcoursPlatform.collision(others_players[key].getSprite());
				}
			}
		}
	}

	if(game){
		game = parcours.collision(joueur.getSprite())
		if(score>=SCORE_TO_WIN){
			res = score;
			alert('Temps : '+scoreTime);
			sendScore();
			score=0;
		}
	}

	var deltaTemps = (new Date()-derniere_col)/25;
	camera.zoom=1+normale(deltaTemps-3,1,0)

	joueur.incrementVelocity(2);
	joueur.sprite.velocity.x *= 0.95
}

function keyPressed(){
	//GET KEY CODE
	//alert(keyCode);
	
	if (keyCode == 32 && joueur.getVelocity() == 2 /*&& joueur.sprite.position.y >= GROUND_Y*/){
		joueur.decrementVelocity(jump);
		socket.emit('maPosition',{id: id, x: joueur.sprite.position.x, y: joueur.sprite.position.y});
	}

	if (keyCode == 82){
		joueur.resetPos()
		score = 0
		temps = 0
		parcours.reset();
		parcoursPlatform.reset();
		parcoursPiece.reset();
		game = true;
		start = new Date();
		getBest();
		socket.emit('maPosition',{id: id, x: joueur.sprite.position.x, y: joueur.sprite.position.y});
	}

	if (keyCode == 69 && joueur.getVisible() == true){
		joueur.shoot("right");
	}
}

function normale(x,variance,mu){
	return (1/(variance*Math.sqrt(2*Math.PI))*Math.exp(-((x-mu)*(x-mu))/(2*variance*variance)))
}