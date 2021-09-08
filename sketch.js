var skyImg, sky;
var ghostImg, ghost, ghostsGroup;

var mario, marioImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  marioImg=loadImage("mario.png");
  skyImg=loadImage("sky.png");
  ghostImg=loadImage("ghost.png");
}

function setup(){
  createCanvas(600,600);
  sky = createSprite(300,300);
  sky.addImage(skyImg);
  sky.velocityY = 1;
  
 ghostsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  mario = createSprite(200,200,50,50);
  mario.scale = 0.1;
  mario.addImage(marioImg);
}

function draw() {
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      mario.x = mario.x - 3;
    }
    
    if(keyDown("right_arrow")){
      mario.x = mario.x + 3;
    }
    
    if(keyDown("space")){
      mario.velocityY = -10;
    }
    
    mario.velocityY = mario.velocityY + 0.8
    
    if(sky.y > 400){
        sky.y = 300
    }
    spawnGhosts();
    if(ghostsGroup.isTouching(mario)){
      mario.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(mario) || mario.y > 600){
        mario.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("blue");
    fill("blue");
    textSize(40);
    text("GAME OVER", 230,250)
  }

}


function spawnGhosts() {
  if (frameCount % 240 === 0) {
    var ghost = createSprite(200, -50);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = ghost.width;
    invisibleBlock.height = 2;
    
    ghost.x = Math.round(random(120,400));
    invisibleBlock.x = ghost.x;
    ghost.addImage(ghostImg);
    
    ghost.scale=0.1
    ghost.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    
    mario.depth = ghost.depth;
    mario.depth +=1;
    ghost.lifetime = 800;
    invisibleBlock.lifetime = 800;

    ghostsGroup.add(ghost);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
