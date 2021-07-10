var space_image;
var p_spaceShip, e_spaceShip, p_spaceShip_image, e_spaceShip_image;
var fire_ball_image, fire_ball;
var e_spaceShip_group;
var gameState;

function preload(){
  space_image = loadImage("space_image.png");
  p_spaceShip_image = loadImage("p_spaceship.png");
  e_spaceShip_image = loadImage("e_spaceship.png");
  fire_ball_image = loadImage("fire_ball.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(windowWidth/2,windowHeight/2,innerWidth,innerHeight);
  bg.addImage(space_image);
  bg.scale = 5.9

  // Playing Character
  p_spaceShip = createSprite(90,400,50,50);
  p_spaceShip.addImage(p_spaceShip_image);
  p_spaceShip.scale = 0.25;
  
  // NPC
  // e_spaceShip = createSprite(1000,400,50,50);
  // e_spaceShip.addImage(e_spaceShip_image);
  // e_spaceShip.scale = 0.1;

  e_spaceShip_group = new Group();
  e_spaceShip_group_ = new Group();
  fire_ball_group = new Group();
  fire_ball_i_group = new Group();

  gameState = 0;
  count=0;
  f_count=0;
  bf_count=0;
  score = 0;
  death=0;
}

function draw(){

  if (gameState === 0) {
    background("black");
    fill("red");
    textSize(15);
    text("Press [ENTER] to Start",1300,750)
    text("Press [H] for Help",700,750) 
    text("Press [S] to read Story",100,750) 
    textSize(100);
    strokeWeight(20);
    text("Welcome Gamers", 400,400)

    if(keyDown("S")){
      background("black");
      fill("red");
      textSize(25);
      strokeWeight(7);
      text("Hi Gamer,..",50,100)
      text("How are you? I hope You will be playing great....",50,150)
      text("This Game Story line as are follows:",50,200)
      text("Star Trek [Hero's spaceShip] was going in the space..Suddenly a small spaceShip came infront and crashed near by planet.",50,250)
      text("When crew of that Star Trek went near that they saw some pepole were injured. Crew of Star Trek helped them get up ",50,300)
      text("and and also gave them SPP Boster to heal Quickly, the crew asked what happen why you all landed like this.",50,350)
      text("They told that there planet is captured by a space monster. So, they are the only person to escape from his trap.",50,400)
      text("And his guard have attacked on 	them. The the leader of that crew decided to help them all and save their planet.",50,450)
      text("SO, they decided to fight with Zorad [Space Monster]. And then they started their Journey to that planet...... ",50,500)
  
      textSize(40);
      text("CAN ZORAD BE DEFEATED.... CAN THAT PLANET BE FREE.",50,600)
      textSize(25);
      text("Let's See....",50,650)
    }

    if(keyDown("H")){
      background("black");
      fill("red");
      textSize(100);
      strokeWeight(20);

      text("up",1300,400)
      textSize(30);
      text("to move ship UP",1300,500)
      textSize(100);
      text("down",1300,600)
      textSize(30);
      text("to move ship DOWN",1300,700)
      textSize(100);
      text("space",300,600)
      textSize(30);
      text("- to speed up",600,575)
      textSize(100);
      text("F",300,400)
      textSize(30);
      text("- F to Fire",400,400)
      textSize(100);
      text("H",600,400)
      textSize(30);
      text("- H to Fire a Huge Ball",700,400)

    }
  } 
  

  

  if(keyDown("ENTER")){
    gameState=1;
  }


  if(gameState === 1) {
    background(space_image);

    bg.depth = bg.depth - 1;
    bg.x -= 2 ;

    if(bg.x<1079/2){
      bg.x = windowWidth/2;
    }

    if(keyDown("UP_ARROW")){
      p_spaceShip.y = p_spaceShip.y-2; 
      f_count = f_count + 0.5
    }
    if(keyDown("DOWN_ARROW")){
      p_spaceShip.y = p_spaceShip.y+2; 
      f_count = f_count + 0.5
    }
    if(keyDown("SPACE")){
      f_count = f_count + 0.5
      bg.x -= 4 ; 
      e_spaceShip_group.setVelocityXEach(-4);
    }
    if(keyDown("F") && f_count>=20){
      f_count=0;
      bf_count = bf_count + 1;
      fire();
    }

    if(keyDown("H") && bf_count>=10){
      bf_count=0;
      big_fire();
    }
    if(e_spaceShip_group.isTouching(fire_ball_group)){
      e_spaceShip_group.destroyEach();
      fire_ball_group.destroyEach();
      score = score + 5
    }

    if(e_spaceShip_group_.isTouching(fire_ball_i_group)){
      e_spaceShip_group.destroyEach();
      score = score + 10;
      death = death + 1
      spawn_enemy_spaceship();
    }

    if(e_spaceShip_group.isTouching(p_spaceShip)){
      bg.x=0;
      e_spaceShip_group.setLifetimeEach(-1);
      e_spaceShip_group.setVelocityXEach(0);
      // p_spaceShip.y=p_spaceShip.x;
      // p_spaceShip.x=p_spaceShip.y;
      gameState=2

    }
    drawSprites();
    spawn_enemy_spaceship();

    // background("red");
    fill("white");
    textSize(45);
    strokeWeight(11);
    text("Score:",50,100)
    text(score,200,100)
  }

  if(gameState===2){
    background("red");
    fill("black");
    textSize(50);
    strokeWeight(11);
    text("GAME OVER",600,600)
  }
  if(death===3){
    background("red");
    fill("black");
    textSize(100);
    strokeWeight(20);
    text("Winner Winner!",500,400)
    textSize(50);
    text("Chicken Dinner",600,500)
  }
}

function fire(){
  fire_ball = createSprite(90,p_spaceShip.y,50,50);
  fire_ball.addImage(fire_ball_image);
  fire_ball.scale = 0.10;
  fire_ball.velocityX = 5;
  
}


function spawn_enemy_spaceship(){
  // Enemy's Army
  if(frameCount%500===0){
    count = count+1;

    if(count<=15){
      e_spaceShip = createSprite(1800,400,50,50);
      e_spaceShip.y = Math.round(random(200,600)); 
      e_spaceShip.addImage(e_spaceShip_image);
      e_spaceShip.scale = 0.1;
      e_spaceShip.velocityX = -2;

      e_spaceShip.lifetime = 600;
      e_spaceShip_group.add(e_spaceShip);
  
    }
    if(count===15){
      e_spaceShip_ = createSprite(1800,400,50,50);
      e_spaceShip_.y = Math.round(random(200,600)); 
      e_spaceShip_.addImage(e_spaceShip_image);
      e_spaceShip_.scale = 0.2;
      e_spaceShip_.velocityX = -2;
      e_spaceShip_.lifetime = 600;
      e_spaceShip_group_.add(e_spaceShip_);
      if(e_spaceShip_.x = 1000){
        e_spaceShip_.velocityX = 0;  
      }
    }
    
  }
}

function fire(){
  fire_ball = createSprite(90,p_spaceShip.y,50,50);
  fire_ball.addImage(fire_ball_image);
  fire_ball.scale = 0.10;
  fire_ball.velocityX = 5;
  fire_ball.lifetime = 350;

  fire_ball_group.add(fire_ball);
}

function big_fire(){
  fire_ball = createSprite(90,p_spaceShip.y,50,50);
  fire_ball.addImage(fire_ball_image);
  fire_ball.scale = 0.15;
  fire_ball.velocityX = 6;
  fire_ball.lifetime = 350;

  fire_ball_i_group.add(fire_ball);
}