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
	parcours = new Parcours();

	sol = new Platform(width/2,height,width,50,"floor");
	platform = new Platform(width, GROUND_Y-50, width-500, 50,"platform");

	//Objet aléatoire
	x = Math.random() * (3000 - 600) + 600;
	obstacle = new Obstacle(x, GROUND_Y, 60, 50, 0, x, GROUND_Y)
	parcours.add(obstacle);
	
	obstacleRef = new Obstacle(4000, GROUND_Y, 60, 50, 0, x, GROUND_Y)
	parcours.add(obstacleRef)
	
	pers.setVelocity(7);
}

function draw(){
	background(200);
	//background(bg);
	text('Arrow, Backspace and R', 25, 50);
	text(score, 25, 75)
	
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && pers.getVisible() == true){
		platform.incrementPosition(5);
		// for(var i = 0; i<obstaclesSp.length; i++)
		// 	obstaclesSp[i].position.x += 5
		parcours.move('+',5);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && pers.getVisible() == true){
		platform.decrementPosition(5);
		parcours.move('-',5);
	}

	if ( pers.collision(platform.getSprite()) || pers.collision(sol.getSprite())) {
		pers.setVelocity(0);
	}

	if(game){
		game = parcours.collision(pers.getSprite())
	}

	if (pers.collision(sol.getSprite()) ) {
		pers.setVelocity(0);
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
		platform.resetPos();
		game = true;
	}
}

window.onresize = function() {
  resizeCanvas(windowWidth, windowHeight);
};