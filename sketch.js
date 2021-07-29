
var path,pathImg,player,playerImg;
var score=0;
var coin=0;
var button;
function preload() {
 pathImg=loadImage("path.png");
 playerImg=loadAnimation("jake1.png","jake2.png","jake3.png","jake4.PNG","jake5.png");
 obstacleImg=loadImage("stone.png");
 coinImg=loadImage("coin.png");
}
function setup(){
createCanvas(displayWidth,displayHeight);
edges=createEdgeSprites();

invisibleBoundary1=createSprite(0,displayHeight/2,470,height);
invisibleBoundary2=createSprite(1320,displayHeight/2,370,height);
invisibleBoundary2.visible=false;
invisibleBoundary1.visible=false;

path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.scale=3;
path.velocityY=3;

player=createSprite(width/2,720);
player.addAnimation("playerImg",playerImg);

obstacleGroup= new Group();
coinsGroup= new Group();

button=createButton('Pause');
button.position(1200,50);
}

function draw(){
	background(0);


if (path.y>displayHeight) {

	path.y=height/2;
}
if(keyDown("UP_ARROW")){

player.y-=2;
}
if(keyDown("LEFT_ARROW")){

player.x-=2;
}
if(keyDown("RIGHT_ARROW")){

player.x+=2;
}

player.collide(edges);
player.collide(invisibleBoundary2);
player.collide(invisibleBoundary1);

drawSprites();

score=score+Math.round(getFrameRate()/60);

stroke("red");
fill("white");
textSize(32);
text("Score: "+score,50,50);

stroke("red");
fill("white");
textSize(32);
text("Coins: "+coin,50,90);

spawnObstacle();
spawnCoin();

for (var i = 0; i < coinsGroup.length; i++) {
if (coinsGroup.get(i).isTouching(player)){
	coin+=1;
	coinsGroup.get(i).destroy();
}
}

button.mousePressed(
    
    function(){
    coinsGroup.setVelocityYEach(0);
    obstacleGroup.setVelocityYEach(0);
    path.velocityY=0;
    
    }

	);
}

function spawnObstacle(){

if (frameCount%180===0){
obstacle=createSprite(350,40,50,50);
obstacle.x=Math.round(random(350,1000));
obstacle.addImage(obstacleImg);
obstacle.scale=0.35;
obstacle.velocityY=3;
obstacle.lifetime=350;
obstacleGroup.add(obstacle);
}
}

function spawnCoin(){

if (frameCount%140===0){
coins=createSprite(350,40,50,50);
coins.x=Math.round(random(350,1000));
coins.addImage(coinImg);
coins.scale=0.2;
coins.velocityY=3;
coins.lifetime=350;
coinsGroup.add(coins);
}
}