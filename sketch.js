var bullet, wall;
var speed, weight, thickness, damage;
var startTime = null;
var latestTime = null;
var elapsedTime = 0;
var gameState = "";
var bulletCreated = false;

function setup() 
{
  createCanvas(1600, 400);
  startTime = new Date();
  speed = 0;
  weight = 0;
  thickness = 0;
  damage = 0;
  bullet = null;
  wall = null;
}

function draw()
{
  background("black");
  latestTime = new Date();
  elapsedTime = (latestTime - startTime)/1000;
  fill(rgb(199, 128, 36));
  textFont("Lucida Calligraphy");
  textSize(15);
  text("A bullet will be shot every 10 seconds !!", 700, 30);
  text("Elapsed Time: " + Math.round(elapsedTime), 700, 70);
  if(Math.round(elapsedTime) % 10 === 0) 
  {
    speed = 0;
    weight = 0;
    thickness = 0;
    damage = 0;
    gameState = "play";
    bulletCreated = false;
  }
  if(gameState === "play")
  {
    thickness = random(22, 83);
    speed = random(223, 321);
    weight = random(30, 52);
    if(wall != null) wall.destroy();  
    wall = createSprite(1500, 196, thickness, 322);
    wall.shapeColor = "white";
    if(bulletCreated === false) createBullet();
    bullet.velocityX = speed;  
    if(hasCollided(bullet, wall))
    {
      bullet.velocityX = 0;
      damage = (0.5 * weight * speed * speed)/ (thickness * thickness * thickness);
      if(damage > 10) wall.shapeColor = "red";
      else wall.shapeColor = "green";
      gameState = "end";      
    }   
  }
    if(gameState === "end")
    {
      bulletCreated = true;
      if(damage > 10) fill("red");
      else fill("green");
      textFont("Lucida Calligraphy");
      textSize(15);
      text("Bullet Weight = " +  Math.round(weight), 700, 115);
      text("Bullet Speed = " + Math.round(speed), 700, 185);
      text("Wall Thickness = " + Math.round(thickness), 700, 255);
      text("Damage = " + Math.round(damage), 700, 325);
    }
  drawSprites();
}
function hasCollided(lBullet, lWall)
{
  if(lWall.x - lBullet.x < lWall.width/2 + lBullet.width/2)
  {
    lBullet.x = lWall.x - lWall.width/2;

    return true;
  }
  return false;
}
function createBullet()
{
  if(bullet != null) bullet.destroy();
  bullet = createSprite(50, 200, 10, 5);
  bullet.shapeColor = "white";
  bulletCreated = true;
}