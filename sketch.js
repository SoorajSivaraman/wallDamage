var bullet, wall;
var speed, weight, thickness, damage;
var startTime = null;
var latestTime = null;
var elapsedTime = 0;
var gameState = "";
var thicknessChanged = false;

function setup() 
{
  createCanvas(1600, 400);
  startTime = new Date();
  speed = 0;
  weight = 0;
  thickness = 0;
  damage = 0;
  createBullet();
  wall = createSprite(1500, 196, thickness, 322);
  wall.shapeColor = "white";
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
    damage = 0;
    bullet.x = 50;
    bullet.y = 200;
    if(thicknessChanged === false) 
    {
      thickness = random(22, 83);
      thicknessChanged = true;
    }  
    wall.width = thickness;
    wall.shapeColor = "white";
    gameState = "play";
  }
  if(gameState === "play")
  {
    speed = random(223, 321);
    weight = random(30, 52);
    bullet.velocityX = speed;
    if(hasCollided(bullet, wall))
    {
      bullet.velocityX = 0;
      bulletCreated = true;
      damage = (0.5 * weight * speed * speed)/ (thickness * thickness * thickness);
      if(damage > 10) wall.shapeColor = "red";
      else wall.shapeColor = "green";
      gameState = "end";      
    }   
  }
    if(gameState === "end")
    {
      thicknessChanged = false;
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
}