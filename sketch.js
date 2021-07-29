var backgroundImg
var manImg, man
var ground,groundImg, shadowImg, shadow1
var meds1, meds1Img, meds2, meds2Img
var e1,e1Img,e2,e2Img,e3,e3Img
var enemyGroup, medGroup, powerupGroup
var pu1, pu2, pu1Img, pu2Img
var gamestate = "play"
var health, frame
var gameoverImg, restart, restartImg
var invisible

function preload(){
  gameoverImg = loadImage("Images/gameover.png")
  pu2Img = loadImage("Images/powerup2.png")
  pu1Img = loadImage("Images/powerup1.png")
  e3Img = loadImage("Images/virus3.png")
  e2Img = loadImage("Images/virus2.png")
  e1Img = loadImage("Images/virus1.png")
  meds2Img = loadImage("Images/meds2.png")
  meds1Img = loadImage("Images/meds1.png")
  groundImg = loadImage("Images/platform.png")
  shadowImg = loadImage("Images/shadow.png")
  backgroundImg = loadImage("Images/background.jpg")
  manImg = loadAnimation("Images/man1.png","Images/man2.png","Images/man3.png","Images/man4.png","Images/man5.png","Images/man6.png","Images/man7.png","Images/man8.png","Images/man9.png","Images/man10.png")
  manImg.frameDelay = 3
  restartImg = loadImage("Images/restart2.png")
}

function setup() {

  createCanvas(800,600);

  ground = createSprite(400,500)
  ground.scale = 1.5
  ground.addImage(groundImg)
  //ground.debug = true
  ground.setCollider("rectangle",10,0,390,60)
 
  shadow1 = createSprite(100,100)
  shadow1.addImage(shadowImg)
  shadow1.scale = 0.05

  man = createSprite(180,410)
  man.addAnimation("running",manImg)
  man.velocityX = 5
  man.setCollider("rectangle",0,0,200,480)
  //man.debug = true
  man.scale = 0.2

  enemyGroup = createGroup()
  medGroup = createGroup()
  powerupGroup = createGroup()

  health = 100

}

function draw() {

  if(gamestate == "play"){

    p = "No"

    if(man.isTouching(enemyGroup) && health<=100 && health>=1){
      health = health -25
      enemyGroup.destroyEach()
    }

     if(man.isTouching(medGroup) && health<=99){
      health = health + 25
      medGroup.destroyEach()
    }

    man.velocityY = 15

    if(keyWentDown(32)){

      if(man.velocityX == 5){
      man.velocityX = -5
      man.mirrorX(-1) 
      }
  
      else if(man.velocityX == -5 && keyWentDown(32)){
        man.mirrorX(1)
        man.velocityX = 5   
      }
  
    }

    spawnEnemy();
    spawnMeds();
    spawnPowerup();

    if(health == 0 ){
      gamestate = "end"
    }

    background(backgroundImg);

    textSize(20)
    fill("black")
    stroke("black")
    text(health + "%", 685,55)

    push()
    stroke("black")
    fill("Black ")
    textSize(20)
    text("Health : ",610,55)
    pop()
  }


  if(gamestate == "end"){

    p = "No"

    man.visible = false

    background(gameoverImg)

    medGroup.destroyEach()

    ground.visible = false

    shadow1.visible = false

    enemyGroup.destroyEach()

    powerupGroup.destroyEach()

    restart = createSprite(width/2, 500, 100, 100)
    restart.addImage(restartImg)
    restart.scale = 0.5

    invisible = createSprite(width/2,500,180,70)
    invisible.visible = false

  }

  if(gamestate == "immune"){
 
    p = "Yes"

    setTimeout(setStatePlay,5000)

     if(man.isTouching(medGroup) && health<=99){
      health = health + 25
      medGroup.destroyEach()
    }

    man.velocityY = 15

    if(keyWentDown(32)){

      if(man.velocityX == 5){
      man.velocityX = -5
      man.mirrorX(-1) 
      }
  
      else if(man.velocityX == -5 && keyWentDown(32)){
        man.mirrorX(1)
        man.velocityX = 5   
      }
  
    }

    spawnEnemy();
    spawnMeds();
    spawnPowerup();

    if(health == 0 ){
      gamestate = "end"
    }

    background(backgroundImg);

    push()
    textSize(20)
    fill("black")
    stroke("black")
    text(health + "%", 685,55)
    pop()

    push()
    stroke("black")
    fill("Black ")
    textSize(20)
    text("Health : ",610,55)
    pop()
  }

  if(man.y > height){
    gamestate = "end"
  }
  
if(powerupGroup.isTouching(man)){
  powerupGroup.destroyEach()
  gamestate = "immune"
}


  ground.depth = man.depth
  man.depth = man.depth + 1

  ground.depth = shadow1.depth
  shadow1.depth = shadow1.depth + 1



  
  man.collide(ground)

  shadow1.x = man.x-20
  shadow1.y = man.y+60

 

  if(shadow1.x <= 100 || shadow1.x>= 700){
    shadow1.visible = false
  }

  if(shadow1.x >= 100 || shadow1.x <= 700){
    shadow1.visible = true
  }

  console.log(gamestate)

  if(mousePressedOver(invisible) && gamestate == "end"){
    reset()
  }

  drawSprites();

}

function spawnEnemy(){

  var randomVirus = round(random(1,3))
  frame = 12

  if(frameCount % frame == 0){
    if(randomVirus == 1){
      e1 = createSprite(width/2-50,-100,0,0)
      e1.addImage(e1Img)
      e1.scale = 0.2
      e1.velocityY = 9
      e1.x =round(random(200,650))
      enemyGroup.add(e1)
      e1.lifetime = 65
      //e1.debug = true
      e1.setCollider("circle",0,0,90)
      ground.depth = e1.depth
      e1.depth = e1.depth + 1
    }
    else if(randomVirus == 2){
      e2 = createSprite(width/2-100,-100,0,0)
      e2.addImage(e2Img)
      e2.scale = 0.2
      e2.velocityY = 9
      e2.x =round(random(200,650))
      enemyGroup.add(e2)
      e2.lifetime = 65
      //e2.debug = true
      e2.setCollider("circle",0,0,90)
      ground.depth = e2.depth
      e2.depth = e2.depth + 1
    }
    else {
      e3 = createSprite(width/2-150,-100,0,0)
      e3.addImage(e3Img)
      e3.scale = 0.2
      e3.velocityY = 9
      e3.x =round(random(200,650))
      e3.lifetime = 65
      enemyGroup.add(e3)
      //e3.debug = true
      e3.setCollider("circle",0,0,90)
      ground.depth = e3.depth
      e3.depth = e3.depth + 1
    }
  }
}

function spawnMeds(){

  var randomMed = round(random(1,2))

  if(frameCount % 400 == 0){
    if(randomMed == 1){
      meds1 = createSprite(width/2,-100,0,0)
      meds1.addImage(meds1Img)
      meds1.scale = 0.2
      meds1.x = round(random(160,680))
      meds1.velocityY = 9
      medGroup.add(meds1)
      //meds1.debug = true
      meds1.lifetime = 70
      meds1.setCollider("circle",0,0,75)
      ground.depth = meds1.depth
      meds1.depth = meds1.depth + 1
    }
    else {
      meds2 = createSprite(width/2+50,-100,0,0)
      meds2.addImage(meds2Img)
      meds2.scale = 0.13
      meds2.x = round(random(160,680))
      meds2.velocityY = 9
      medGroup.add(meds2)
      //meds2.debug = true
      meds2.lifetime = 70
      meds2.setCollider("circle",0,0,150)
      e1.setCollider("circle",0,0,150)
      ground.depth = meds2.depth
      meds2.depth = meds2.depth + 1
    }
  }
}

function spawnPowerup(){
  var randomPowerUp = round(random(1,2))
  if(frameCount % 200 == 0){
    if(randomPowerUp == 1){
      pu1 = createSprite(0,0,0,0)
      pu1.x = round(random(160,680))
      pu1.y = -100
      pu1.addImage(pu1Img)
      pu1.scale = 0.07
      pu1.velocityY = 9
      pu1.lifetime = 65
      powerupGroup.add(pu1)
      //pu1.debug = true
      pu1.setCollider("circle",0,0,200)
      ground.depth = pu1.depth
      pu1.depth = pu1.depth + 1
    }
    else if(randomPowerUp = 2){
      pu2 = createSprite(0,0,0,0)
      pu2.x = round(random(160,680))
      pu2.y = -100
      pu2.addImage(pu2Img)
      pu2.scale = 0.07
      pu2.velocityY = 9
      pu2.lifetime = 65
      powerupGroup.add(pu2)
      //pu2.debug = true
      pu2.setCollider("circle",0,0,200)
      ground.depth = pu2.depth
      pu2.depth = pu2.depth + 1
    }
  }
}

function setStatePlay(){
  gamestate = "play"
}

function reset(){
  gamestate = "play"
  man.x = 180
  man.y = 350
  restart.destroy()
  man.visible = true
  ground.visible = true
  shadow1.visible = true
  man.velocityX = 5
  man.mirrorX(1)
}