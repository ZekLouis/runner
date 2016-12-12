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

function sendScore() {
	$.getJSON( "php/postScore.php?pseudo="+pseudo+"&score="+scoreTimeB+"&num_requete=1",function(data){
		console.log(data[1]);
	});
};

function setup(){
	createCanvas($(window).width(), $(window).height());
	pseudo = prompt("Pseudo : ","Nobody");
	//Initialisation des objets 
	pers = new Personnage(xpos,GROUND_Y);
	
	sol = new Platform(width/2,height,width,50,"floor");
	
	
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
	text('Time : '+scoreTime,25,25);
	text('Arrow, Backspace and R', 25, 50);
	text(score, 25, 75);
	text('Take the 3 coins', 25, 100);
	
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && pers.getVisible() == true){
		parcoursPlatform.move('+',5);
		parcoursPiece.move('+',5);
		parcours.move('+',5);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && pers.getVisible() == true){
		parcoursPlatform.move('-',5);
		parcoursPiece.move('-',5);
		parcours.move('-',5);
	}

	parcoursPlatform.collision(pers.getSprite());
	score = parcoursPiece.collision(score,pers.getSprite());
	
	if (pers.collision(sol.getSprite())) {
		pers.setVelocity(0);
	}

	if(game){
		game = parcours.collision(pers.getSprite())
		if(score>=30){
			res = score;
			alert('Gagné : '+pseudo+'\nScore : '+score+'\nTemps : '+scoreTime);
			score=0;
			sendScore();
		}
	}

	pers.incrementVelocity(2);
}

function keyPressed(){
	if (keyCode == 32 && pers.getVelocity() == 2){
		pers.decrementVelocity(jump);
	}

	if (keyCode == 82){
		pers.resetPos()
		score = 0
		parcours.reset();
		parcoursPlatform.reset();
		parcoursPiece.reset();
		game = true;
		start = new Date();
	}
}

window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
}