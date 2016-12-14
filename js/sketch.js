//TODO Gérer collision latérale plateform

//NEW PROJECT PLAY

var xpos = 400;
var ground = 500-(25/2)
var ypos = 500;
var GROUND_Y = ($(window).height()-50);
var widthPlatform = ($(window).height()-50);
var espacePlatform = 130;
var speed = 0.5;
var jump = 30;
var marge_joueur_ecran = 400;
var jumping = false;
var score = 0;
var game = true;
var pseudo = "";
var best_score = "";
var best_name = "";
var temps = 0;
var derniere_col = 0;

function sendScore() {
	$.getJSON( "php/postScore.php?pseudo="+pseudo+"&score="+scoreTimeB+"&num_requete=1",function(data){
		if(data.insertion==true){
			temps = 1000000000;
		}
	});
};

function getBest(){
	$.getJSON( "php/postScore.php?&num_requete=2",function(data){
		best_score = data.score;
		best_name = data.nom;
		best_score = best_score.toString().substring(0, best_score.toString().length-3)+':'+best_score.toString().substring(best_score.toString().length-3,4);
	});
};

function updateCamera(){
	camera.position.x = pers.sprite.position.x*0.1+camera.position.x*0.9
	camera.position.y = pers.sprite.position.y*0.1+camera.position.y*0.9
}

function setup(){
	createCanvas($(window).width(), $(window).height());
	pseudo = prompt("Pseudo : ","Someone");
	getBest();

	pers = new Personnage(xpos,GROUND_Y);
	sol = new Platform(width/2,height,width*3,50,"floor");
	
	
	parcoursPlatform = new ParcoursPlatform();
	platform = new Platform(width/2, GROUND_Y-50, widthPlatform, 50,"platform");
	platform2 = new Platform(width/2+widthPlatform+espacePlatform, GROUND_Y-50, widthPlatform, 50,"platform");

	parcoursPlatform.add(platform);
	parcoursPlatform.add(platform2)


	parcours = new Parcours();
	obstacle = new Obstacle(width/4+3*width, GROUND_Y, 60, 50, 0);
	obstacle2 = new Obstacle(width/2+widthPlatform/2+espacePlatform/2, GROUND_Y, espacePlatform,50,0);
	obstacleRef = new Obstacle(4000, GROUND_Y, 60, 50, 0);
	
	parcours.add(obstacle);
	parcours.add(obstacle2);
	parcours.add(obstacleRef);
	
	parcoursPiece = new ParcoursPiece();
	piece = new Piece(xpos+100,GROUND_Y);
	piece2 = new Piece(2*widthPlatform+espacePlatform,GROUND_Y-100);
	piece3 = new Piece(2*widthPlatform+espacePlatform,GROUND_Y);
	piece3 = new Piece(xpos+120,GROUND_Y);
	parcoursPiece.add(piece3);
	piece3 = new Piece(xpos+160,GROUND_Y);
	parcoursPiece.add(piece3);
	piece3 = new Piece(xpos+200,GROUND_Y);
	parcoursPiece.add(piece3);
	piece3 = new Piece(xpos+240,GROUND_Y);
	parcoursPiece.add(piece3);
	piece3 = new Piece(xpos+300,GROUND_Y);
	parcoursPiece.add(piece3);
	piece3 = new Piece(xpos+340,GROUND_Y);
	parcoursPiece.add(piece3);
	parcoursPiece.add(piece);
	parcoursPiece.add(piece2);
	parcoursPiece.add(piece3);
	
	pers.setVelocity(7);
	start = new Date();
}

function draw(){
	time = new Date();
	scoreTimeB = time-start;
	scoreTime = scoreTimeB.toString().substring(0, scoreTimeB.toString().length-3)+':'+scoreTimeB.toString().substring(scoreTimeB.toString().length-3,4);
	background(200);
	text('Time : '+scoreTime,width/2,height/2);
	text('Meilleur Score : '+best_score+' par : '+best_name,width/2,height/2+25);

	if(temps>0){
		text('Score enregistré !',width/2,height/2+50);
		temps--;
	}
	
	camera.on();
	
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && pers.getVisible() == true){
		pers.sprite.velocity.x -= 2
		pers.sprite.velocity.x = Math.max(-10, pers.sprite.velocity.x);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && pers.getVisible() == true){
		pers.sprite.velocity.x += 2
        pers.sprite.velocity.x = Math.min(10, pers.sprite.velocity.x);
	}

	updateCamera();

	parcoursPlatform.collision(pers.getSprite());
	score = parcoursPiece.collision(score,pers.getSprite());
	
	if (pers.collision(sol.getSprite())) {
		pers.setVelocity(0);
	}

	if(game){
		game = parcours.collision(pers.getSprite())
		if(score>=1000){
			res = score;
			alert('Gagné : '+pseudo+'\nTemps : '+scoreTime);
			score=0;
			sendScore();
		}
	}

	var deltaTemps = (new Date()-derniere_col)/25;
	camera.zoom=1+normale(deltaTemps-3,1,0)

	pers.incrementVelocity(2);
	pers.sprite.velocity.x *= 0.95
}

function keyPressed(){
	if (keyCode == 32 && pers.getVelocity() == 2){
		pers.decrementVelocity(jump);
	}

	if (keyCode == 82){
		pers.resetPos()
		score = 0
		temps = 0
		parcours.reset();
		parcoursPlatform.reset();
		parcoursPiece.reset();
		game = true;
		start = new Date();
		getBest();
	}
}

function normale(x,variance,mu){
	return (1/(variance*Math.sqrt(2*Math.PI))*Math.exp(-((x-mu)*(x-mu))/(2*variance*variance)))
}