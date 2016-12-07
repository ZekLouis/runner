/*function setup() {
  createCanvas($(window).width(), $(window).height());
}

var xpos = 100;
 
// y position variable
var ground = 500-(25/2)
var ypos = ground;
 
function draw(){
  // clear background
  background(255);
  text('Runner 1 min de trajet lol', 25, 25);
 
  // set the fill color
  fill(0, 102, 204);
 
  // black outline
  stroke(0);
 
  // set the ellipse mode
  ellipseMode(CENTER);
 
  // draw a circle
  ellipse(xpos, ypos, 25, 25);

  fill(102, 51, 0);
  rect(0, 500, $(window).width(), 500);

  if (keyIsDown(LEFT_ARROW) && xpos > 0)
    xpos-=5;

  if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width())
    xpos+=5;

	// if (keyIsDown(32) && ypos > 300){
	// 	ypos -= 5
 //    	setTimeout(function(){
 //    		if(ypos < ground)
	// 	    	ypos += 5
	// 	}, 200);
	// }
}
 
function keyPressed(){
	if (keyCode == 32 && ypos > 300){
		ypos -= 50
    	setTimeout(function(){
    		if(ypos < ground)
		    	ypos += 50
		}, 200);
	}
	console.log(xpos,ypos)
}*/

//NEW PROJECT PLAY

var xpos = 200;
var ground = 500-(25/2)
var ypos = 500;
var GROUND_Y = 450;
var speed = 0.5;
var jump = 10;
var marge_joueur_ecran = 400;
var jumping = false;

function setup(){
	createCanvas($(window).width(), $(window).height());
	pers = createSprite(xpos, ypos, 25, 25);
	pers.shapeColor = color(0, 102, 204);
	platform = createSprite(width/2, height, width, 50)
	platform.shapeColor = color(0)
	obstacle = createSprite(300, height, 60, 90);
	obstacle.shapeColor = color(0)
	pers.velocity.y = 7
}

function draw(){
	background(200);
	text('Runner 1 min de trajet lol', 25, 25);
	text('Arrow, Backspace and R', 25, 50);
	drawSprites();

	if (keyIsDown(LEFT_ARROW) && xpos > 0){
		if(pers.position.x < marge_joueur_ecran){
			obstacle.position.x += 5
		}else{
			pers.position.x -= 5;
		}
	}

	if (keyIsDown(RIGHT_ARROW) && xpos < $(window).width()){
		if(pers.position.x > $(window).width()-marge_joueur_ecran){
			obstacle.position.x -= 5
		}else{
			pers.position.x += 5;
		}
	}

	if ( pers.collide(platform) ) {
		pers.velocity.y = 0;
	}

	if ( pers.collide(obstacle) ) {
		pers.visible = false;
	}

	if ( pers.collide( platform ) ) {
		pers.velocity.y = 0;
		if (jumping) jumping = false;
	}
}

function keyPressed(){
	if (keyCode == 32 && !jumping){
		pers.velocity.y -= jump;
		jumping = true;
		setTimeout(function(){
		    	pers.velocity.y = 7
		    	jumping = false;
		}, 200);
	}

	if (keyCode == 82){
		pers.visible = true
		pers.position.x = xpos
		pers.position.y = ypos
		pers.velocity.y = 7
	}
}