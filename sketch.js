var tower,towerImg;
var ghost,ghostImg;
var door,doorImg;
var climber,climberImag;
var climberGroup,doorGroup;
var gameState="PLAY";
var score=0;
function preload() {
  towerImg=loadImage("tower.png");
  ghostImg=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
}

function setup() {
  createCanvas(600,600);
  tower=createSprite(300,300,10,20);
  tower.addImage(towerImg);
  tower.velocityY=1;
  ghost=createSprite(200,200,10,10);
  ghost.addAnimation("ghoat",ghostImg);
  ghost.scale=0.5;
  climberGroup=createGroup();
  doorGroup=createGroup();
  
  
}

function draw() {
  if (gameState==="PLAY") {
  if(tower.y>600) {
    tower.y=tower.width/2;
  }
  if(keyDown("space")) {
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.3;
  if(keyDown("right_Arrow")) {
    ghost.x=ghost.x+3;
  }
  if(keyDown("left_Arrow")) {
ghost.x=ghost.x-3;
  }
  if (doorGroup.isTouching(ghost) ||climberGroup.isTouching(ghost)||ghost.y>600) {
 gameState="END";   
  }
  spawnDoor();
    score=score+Math.round(frameCount/100);
  }
  
  drawSprites();
  fill("white");
  text("SCORE "+score,50,50);
  if(gameState==="END") {
  tower.velocityY=0;
    ghost.destroy();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    textSize(60);
    fill("red");
    text("GAME OVER",150,200);
  }
}

function spawnDoor() {
  if(frameCount%250===0) {
    door=createSprite(200,-50,20,20);
    door.addImage(doorImg);
    door.velocityY=1;
    climber=createSprite(200,10,10,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    door.x=Math.round(random(50,400));
    climber.x=door.x;
    climberGroup.add(climber);
      doorGroup.add(door);            
    
  }
}

