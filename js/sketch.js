//TODO Gérer collision latérale plateform

//NEW PROJECT PLAY

var xpos = 400;
var ground = 500-(25/2)
var ypos = 500;
var GROUND_Y = ($(window).height()-50);
var speed = 0.5;
var jump = 30;
var marge_joueur_ecran = 400;
var jumping = false;
var score = 0;
var game = true;

function setup(){
	createCanvas($(window).width(), $(window).height());

	//Initialisation des objets 
	pers = new Personnage(xpos,GROUND_Y);
	
	sol = new Platform(width/2,height,width,50,"floor");
	
	
	parcoursPlatform = new ParcoursPlatform();
	platform = new Platform(width, GROUND_Y-50, width-500, 50,"platform");
	platform2 = new Platform(width+600, GROUND_Y-50, width-500, 50,"platform");

	parcoursPlatform.add(platform);
	parcoursPlatform.add(platform2)


	parcours = new Parcours();
	obstacle = new Obstacle(width, GROUND_Y, 60, 50, 0, width+500, GROUND_Y)
	obstacleRef = new Obstacle(4000, GROUND_Y, 60, 50, 0, 4000, GROUND_Y)
	
	parcours.add(obstacle);
	parcours.add(obstacleRef);
	
	parcoursPiece = new ParcoursPiece();
	piece = new Piece(xpos+100,GROUND_Y);
	parcoursPiece.add(piece);
	
	pers.setVelocity(7);
}

function draw(){
	background(200);
	text('Arrow, Backspace and R', 25, 50);
	text(score, 25, 75)
	
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
	}
}

window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
};