//TODO

//NEW PROJECT PLAY
var GROUND_Y = 800;//($(window).height()-50);
var xpos = 400;
var n_joueur = null;
var socket = io('http://localhost:8080');
var players = [];
var mon_id = "";
var lastUpdatePositionsTimestamp = new Date().getTime();

socket.on('del_player', function(data){
	console.log(data+" s'est deconnecté.");
	players[data].sprite.remove();
	delete(players[data]);
});

/*socket.on('id',function(data){
	mon_id = data;
	joueur.setId(mon_id);
});*/

socket.on('wall',function(data){
	wall = new Objet(-500+(time_wall-data.time)*data.speed, GROUND_Y, 100,width,color(0),"obs");
	wall.getSprite().velocity.x = data.speed;
	var time_wall_2 = data.time; 
	parcours.add(wall);
	//wall.setPos();
});

socket.on('reset',function(){
	joueur.resetPos();
	score = 0;
	temps = 0;
	parcours.reset();
	game = true;
	start = new Date();
	getBest();
});

socket.on('joueurs',function(data){
	if (data.timestamp > lastUpdatePositionsTimestamp){
		lastUpdatePositionsTimestamp = data.timestamp;
		for(var key in data.joueurs){
			if(mon_id!=key){
				if(!players.hasOwnProperty(key)){
					players[key]=new Joueur(key,data.joueurs[key].x, data.joueurs[key].y, data.joueurs[key].pseudo);
				}

				// Pour enlever les glitchs, on va adoucir la transition.
				// Il y a glitch lorsque ce que génère ton ordinateur ne concorde pas 
				// avec ce que le serveur te dit (téléportations).

				// On adoucit en fonction de la distance entre ce que 
				// tu as calculé et ce qu'on te dit. 

				var deltaVelocity = Math.sqrt(
					Math.pow(data.joueurs[key].vx-players[key].sprite.velocity.x,2)+
					Math.pow(data.joueurs[key].vy-players[key].sprite.velocity.y,2)
				);

				var deltaPosition = Math.sqrt(
					Math.pow(data.joueurs[key].x-players[key].sprite.position.x,2)+
					Math.pow(data.joueurs[key].y-players[key].sprite.position.y,2)
				);

				//console.log(deltaPosition, deltaVelocity);

				// Si la différence est grande, on transite sec pour resynchroniser.
				// Si la différence est minim, on laisse l'ordinateur dans le "faux"
				// pour un résultat plus fluide.

				// Lorsqu'on fait varirer la constante : plus elle est petite, 
				// plus la transition est sèche.

				var positionSmoothness = 1 - deltaVelocity/(deltaVelocity + 10);
				var velocitySmoothness = 1 - deltaPosition/(deltaPosition + 10);

				//console.log(positionSmoothness+" "+velocitySmoothness);

				players[key].setPos(
					data.joueurs[key].x * (1-positionSmoothness) + players[key].sprite.position.x * positionSmoothness,
					data.joueurs[key].y * (1-positionSmoothness) + players[key].sprite.position.y * positionSmoothness,
					data.joueurs[key].vx * (1-velocitySmoothness) + players[key].sprite.velocity.x * velocitySmoothness,
					data.joueurs[key].vy * (1-velocitySmoothness) + players[key].sprite.velocity.y * velocitySmoothness
				);

			} else {
				players[key] = joueur;
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

var widthPlatform = ($(window).width()-50);
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
	camera.position.x = joueur.sprite.position.x*0.1+camera.position.x*0.9
	camera.position.y = joueur.sprite.position.y*0.1+camera.position.y*0.9
}

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
	socket.emit('register_player',{
			pseudo: pseudo,
			x: joueur.sprite.position.x, 
			y: joueur.sprite.position.y, 
			vx: joueur.sprite.velocity.x, 
			vy: joueur.sprite.velocity.y
		},
		function(id){
			mon_id = id;
	});
	parcours = new Parcours();
	sol = new Platform(1080, 900, 1080*3, 50/*width/2,height,width*3,50*/,"floor");
	
	platform = new Platform(width/2, GROUND_Y-50, widthPlatform, 50,"platform");
	platform2 = new Platform(width/2+widthPlatform+espacePlatform, GROUND_Y-50, widthPlatform, 50,"platform");

	parcours.add(sol);
	parcours.add(platform);
	parcours.add(platform2)

	obstacle = new Objet(width/4+3*width, GROUND_Y, 60, 50, color(0),"obs");
	
	obstacleRef = new Objet(4000, GROUND_Y, 60, 50,color(0),"obs");
	
	parcours.add(obstacle);
	parcours.add(obstacleRef);
	
	piece = new Piece(xpos+100,GROUND_Y);
	piece2 = new Piece(3*widthPlatform+espacePlatform,GROUND_Y-100);
	piece3 = new Piece(3*widthPlatform+espacePlatform,GROUND_Y);
	
	parcours.add(piece);
	parcours.add(piece2);
	parcours.add(piece3);
	
	start = new Date();
	camera.on();
}

function draw(){
	
	// Mise à jour des timers.
	time_wall = new Date().getTime();
	time = new Date();
	scoreTimeB = time-start;
	scoreTime = scoreTimeB.toString().substring(0, scoreTimeB.toString().length-3)+':'+scoreTimeB.toString().substring(scoreTimeB.toString().length-3,4);

	/*if (keyIsDown(E) && xpos < $(window).width() && joueur.getVisible() == true){
		joueur.shoot();
		socket.emit('maPosition',{id: id, x: joueur.sprite.position.x, y: joueur.sprite.position.y});
	}*/

	// Touches de déplacement.

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && joueur.getVisible() == true){
		joueur.move('-',speed);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && joueur.getVisible() == true){
		joueur.move('+',speed);
	}

	if (keyIsDown(32) && joueur.getVelocity() == 0 /*&& joueur.sprite.position.y >= GROUND_Y*/){
		joueur.decrementVelocity(jump);
	}

	// Mise à jour des accélérations.

	// Mise à jour des vitesses.

	for(var key in players){

		// Gravité

		players[key].incrementVelocity(2);
	}

	// Mise à jour des positions.

	// Mise à jour des collisions.

	for(var key in players){

		// Sol.

		if(players[key].collision(sol.getSprite())){
			players[key].setVelocity(0);
		}

		// Plateformes
		// Test des collisions avec les autres joueurs

		parcours.collision(score,players[key]);
		
		// Frottements 

		players[key].sprite.velocity.x *= 0.95
	}

	// Test des collisions avec son joueur

	score = parcours.collision(score,joueur);

	// Mise à jour de la camera.

	var deltaTemps = (new Date()-derniere_col)/25;
	camera.zoom=1+normale(deltaTemps-3,1,0)
	updateCamera();

	// Dessin des premières informations.

	background(200);
	text(pseudo,joueur.getX()-joueur.getWidth()/2,joueur.getY()-30);
	if(best_score==""){
		text('Chargement du meilleur score ...',width/2,height/2+25);
	}else{
		text('Meilleur Score : '+best_score+' par : '+best_name,width/2,height/2+25);
	}

	// Dessin des sprites.

	drawSprites();

	// Vérification de la victoire.

	if(game){
		
		if(score>=SCORE_TO_WIN){
			res = score;
			alert('Temps : '+scoreTime);
			sendScore();
			score=0;
		}
	}
}

function keyPressed(){
	//GET KEY CODE
	//alert(keyCode);

	/*if (keyCode == 82){
		joueur.resetPos()
		score = 0
		temps = 0
		parcours.reset();
		game = true;
		start = new Date();
		getBest();
	}*/

	if (keyCode == 69 && joueur.getVisible() == true){
		joueur.shoot("right");
	}
}

function normale(x,variance,mu){
	return (1/(variance*Math.sqrt(2*Math.PI))*Math.exp(-((x-mu)*(x-mu))/(2*variance*variance)))
}
