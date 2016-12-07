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
	pers = createSprite(xpos, GROUND_Y, 25, 25);
	pers.shapeColor = color(0, 102, 204);
	platform = createSprite(width/2, height, width, 50)
	platform.shapeColor = color(0)
	platform2 = createSprite(width, GROUND_Y-50, width-500, 50)
	platform2.shapeColor = color(0)
	/*obstacles = Group()
	obstacle = createSprite(300, height, 60, 90);
	obstacle.shapeColor = color(0)
	obstacle.addToGroup(obstacles)
	obstacle = createSprite(800, height, 60, 90);
	obstacle.shapeColor = color(0)
	obstacle.addToGroup(obstacles)*/

	//Listes contenants 
	obstaclesSp = Group()
	obstacles = [];
	for(var i = 0; i < 10 ; i++){
		x = Math.random() * (3000 - 600) + 600;
		obstacle = new Obstacle(x, GROUND_Y, 60, 50, 0, x, GROUND_Y)
		obstacles.push(obstacle)
		obstacle.sprite.addToGroup(obstaclesSp)
	}
	obstacleRef = new Obstacle(4000, GROUND_Y, 60, 50, 0, x, GROUND_Y)
	obstacles.push(obstacleRef)
	obstacleRef.sprite.addToGroup(obstaclesSp)
	pers.velocity.y = 7
}

function draw(){
	background(200);
	text('Runner 1 min de trajet lol', 25, 25);
	text('Arrow, Backspace and R', 25, 50);
	text(score, 25, 75)
	drawSprites();
	//console.log(platform2.position.x);

	if (keyIsDown(LEFT_ARROW) && xpos > 0 && pers.visible == true){
		platform2.position.x += 5
		for(var i = 0; i<obstaclesSp.length; i++)
			obstaclesSp[i].position.x += 5
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width() && pers.visible == true){
		platform2.position.x -= 5
		score += 10
		for(var i = 0; i<obstaclesSp.length; i++)
			obstaclesSp[i].position.x -= 5
	}

	if ( pers.collide(platform) || pers.collide(platform2)) {
		pers.velocity.y = 0;
	}

	for(var i = 0; i<obstaclesSp.length; i++){
		if ( pers.collide(obstaclesSp[i]) ) {
			pers.visible = false;
			alert('Perdu !')
		}
	}

	if ( pers.collide( platform ) ) {
		pers.velocity.y = 0;
		if (jumping) jumping = false;
	}

	if(obstacleRef.sprite.position.x < pers.position.x && !gagne){
		alert('Gagné !')
		gagne = true
	}
		

	pers.velocity.y += 2;
}

function keyPressed(){
	if (keyCode == 32 && pers.velocity.y == 2){
		pers.velocity.y -= jump;
	}

	if (keyCode == UP_ARROW){
		if(pers.height < 50)
			pers.height = 50;
	}

	if (keyCode == DOWN_ARROW){
		if(pers.height == 50)
			pers.height = 25;
	}

	if (keyCode == 82){
		pers.visible = true
		pers.position.x = xpos
		pers.position.y = GROUND_Y
		pers.velocity.y = 7
		score = 0
		for(var i = 0; i<obstacles.length; i++){
			obstacles[i].resetPos();
		}
		platform2.position.x = width;
		platform2.position.y = GROUND_Y-50
	}
}