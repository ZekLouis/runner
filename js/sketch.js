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
var gagne = false;
var score = 0;

function setup(){
	createCanvas($(window).width(), $(window).height());

	//Initialisation des objets 
	pers = new Personnage(xpos,GROUND_Y);
	parcours = new Parcours();

	platform = createSprite(width/2, height, width, 50)
	platform.shapeColor = color(0)
	platform2 = createSprite(width, GROUND_Y-50, width-500, 50)
	platform2.shapeColor = color(0)

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
	text('Runner 1 min de trajet lol', 25, 25);
	text('Arrow, Backspace and R', 25, 50);
	text(score, 25, 75)
	
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && pers.getVisible() == true){
		platform2.position.x += 5
		// for(var i = 0; i<obstaclesSp.length; i++)
		// 	obstaclesSp[i].position.x += 5
		parcours.move('+',5);
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && pers.getVisible() == true){
		platform2.position.x -= 5
		parcours.move('-',5);
	}

	if ( pers.collision(platform) || pers.collision(platform2)) {
		pers.setVelocity(0);
	}

	parcours.collision(pers.getSprite())

	if (pers.collision(platform) ) {
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
		platform2.position.x = width;
		platform2.position.y = GROUND_Y-50
	}
}