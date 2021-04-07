//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,alien1,alien2,fruit1,fruit2,fruit3,fruit4;
var knifeImage,alien1Img,alien2Img,fruit1Img,fruit2Img,
    fruit3Img,fruit4Img,gameOverSound,gameOver,gameOverImg,
    knifeSound ;
var aliensG,fruitG;

function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  alien1Img = loadImage("alien1.png");
  alien2Img = loadImage("alien2.png");
  gameOverImg = loadImage("gameover.png");
  
  gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwoosh.mp3");
}



function setup() {
  createCanvas(600, 600);
   
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);
  knife.debug=true;
  score=0;
  //create fruit and monster Group variable here
  aliensG = new Group();
  fruitsG = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    fruits();
    
    aliens();
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
   // Increase score if knife touching fruit
    if(fruitsG.isTouching(knife)){
    fruitsG.destroyEach();
    knifeSound.play();
    score=score+1;
  }
    else{
      if(aliensG.isTouching(knife)){
    gameState=END;
    gameOverSound.play();
    fruitsG.destroyEach();
    aliensG.destroyEach();
    fruitsG.setVelocityXEach(0);
    aliensG.setVelocityXEach(0);
    knife.addImage(gameOverImg);
    knife.scale=2;
    knife.x=300;
    knife.y=300;
   }
      
    }
   // Go to end state if knife touching enemy
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
function aliens(){
  if(World.frameCount % 200 ===0){
  alien1 = createSprite(400,200,20,20);
   alien1.addImage("alien1",alien1Img);
   alien1.y=Math.round(random(100,550))
   alien1.velocityX=-(8+(score/10));
   alien1.setLifetime=50;
   aliensG.add(alien1);
 
  }
}


function fruits(){
 if(World.frameCount % 80 === 0){
   position =Math.round(random(1,2));
  fruit = createSprite(400,200,20,20)
   
   
   
  if(position==1) {
     fruit.x=600;
     fruit.velocityX=-(7+(score/4));
   } else { if(position==2){ 
     fruit.x=0;
     fruit.velocityX=(7+(score/4));
   }
          } // closing brackets should have been added here.
   fruit.scale=0.2;
    r=Math.round(random(1,4))
   if (r == 1) 
   { fruit.addImage(fruit1Img);
   } else if (r == 2) 
   { fruit.addImage(fruit2Img); } 
           else if (r == 3) 
           { fruit.addImage(fruit3Img);
           } else 
           { fruit.addImage(fruit4Img); }
   fruit.y=Math.round(random(50,550))
   fruit.setLifetime=550;
   fruitsG.add(fruit);
          //} This is the extra bracket. Which is not required. 
  }
}
