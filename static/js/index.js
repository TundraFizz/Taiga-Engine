/*

function init(){
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  var farTexture = PIXI.Texture.fromImage("js/game/bg-far.png");
  far = new PIXI.Sprite(farTexture);
  far.position.x = 0;
  far.position.y = 0;
  stage.addChild(far);

  var midTexture = PIXI.Texture.fromImage("js/game/bg-mid.png");
  mid = new PIXI.Sprite(midTexture);
  mid.position.x = 0;
  mid.position.y = 128;
  stage.addChild(mid);

  requestAnimationFrame(update);
}

function update(){
  far.position.x -= 0.128;
  mid.position.x -= 0.64;

  renderer.render(stage);

  requestAnimationFrame(update);
}

*/

// ------------------------------------------------------------

// Debug stuff: Press the + and - keys to zoom in and out
var keys = {};
$(document).keydown(function(e){
  keys[e.key] = true;
});
$(document).keyup(function(e){
  delete keys[e.key];
});

function Taiga(){}

Taiga.prototype.Initialize = function(){
  var self             = this;
  this.textures        = {};
  this.objectContainer = [];
  this.objects         = {};
  this.screenWidth     = 800;
  this.screenHeight    = 600;
  this.scalar          = 1;
  this.runningIndex    = 0;

  this.app = new PIXI.Application(this.screenWidth, this.screenHeight, {backgroundColor : 0x00ffff});
  $("body").prepend(this.app.view);

  this.LoadTextures();
  this.CreatePlanet();
  this.CreatePlayer();
  this.CreateEnemy("enemy1.png", 0.25, -200,  -200);
  this.CreateEnemy("enemy2.png", 0.5,  -350,  -350);
  this.CreateEnemy("enemy3.png", 1.0,  -700,  -700);
  this.CreateEnemy("enemy4.png", 2.0,  -1200, -1200);
  this.CreateEnemy("enemy5.png", 4.0,  -2500, -2500);
  this.CreateEnemy("enemy6.png", 6.0,  -4000, -4000);
  this.CreateEnemy("enemy7.png", 8.0,  -6500, -6500);
  this.CreateEnemy("enemy8.png", 10.0, -8000, -8000);

  $(document).mousedown(function(e){
    self.ShootBullet();
  });

  window.requestAnimationFrame(this.Update.bind(this));
}

Taiga.prototype.LoadTextures = function(){
  this.LoadTexture("planet.png");
  this.LoadTexture("player.png");
  this.LoadTexture("bullet.png");
  this.LoadTexture("run0.png");
  this.LoadTexture("run1.png");
  this.LoadTexture("run2.png");
  this.LoadTexture("run3.png");
  this.LoadTexture("run4.png");
  this.LoadTexture("enemy1.png");
  this.LoadTexture("enemy2.png");
  this.LoadTexture("enemy3.png");
  this.LoadTexture("enemy4.png");
  this.LoadTexture("enemy5.png");
  this.LoadTexture("enemy6.png");
  this.LoadTexture("enemy7.png");
  this.LoadTexture("enemy8.png");
}

Taiga.prototype.LoadTexture = function(textureName){
  this.textures[textureName] = PIXI.Texture.fromImage(textureName);
}

Taiga.prototype.CreatePlanet = function(){
  var object = new PIXI.Sprite(this.textures["planet.png"]);
  object.interactive = false; // Allow object to respond to mouse and touch events
  object.buttonMode  = false; // If the hand cursor appears when you mouse over
  object.anchor.set(0.5);     // Center the anchor point
  object.scale.set(1);        // Scale

  // move the sprite to its designated position
  object.x = 0;
  object.y = 0;

  // Add to the stage
  this.objectContainer.push(object);
  this.app.stage.addChild(object);
}

Taiga.prototype.CreatePlayer = function(){
  var object = new PIXI.Sprite(this.textures["player.png"]);

  object.interactive = false; // Allow object to respond to mouse and touch events
  object.buttonMode  = false; // If the hand cursor appears when you mouse over
  object.anchor.set(0.5);     // Center the anchor point
  object.scale.set(1);        // Scale

  // move the sprite to its designated position
  object.x = 0;
  object.y = 0;

  this.objectContainer.push(object);
  this.app.stage.addChild(object);
  this.objects["player"] = object;
}

Taiga.prototype.ShootBullet = function(){
  var object = new PIXI.Sprite(this.textures["bullet.png"]);

  object.interactive = false; // Allow object to respond to mouse and touch events
  object.buttonMode  = false; // If the hand cursor appears when you mouse over
  object.anchor.set(0.5);     // Center the anchor point
  object.scale.set(1);        // Scale

  // move the sprite to its designated position
  object.x = this.objects["player"].x;
  object.y = this.objects["player"].y;

  this.objectContainer.push(object);
  this.app.stage.addChild(object);
  // this.objects["player"] = object;
}

Taiga.prototype.CreateEnemy = function(tex, scale, x, y){
  // var object = new PIXI.Sprite(this.textures["planet.png"]);
  var object = new PIXI.Sprite(this.textures[tex]);
  object.anchor.set(0.5);    // Center the anchor point
  object.scale.set(scale);   // Scale

  // move the sprite to its designated position
  object.x = x;
  object.y = y;

  // Add to the stage
  this.objectContainer.push(object);
  this.app.stage.addChild(object);
}

Taiga.prototype.Update = function(time){
  this.delta = time - this.then;
  this.then  = time;

  if(typeof keys["ArrowLeft"] === "undefined" && typeof keys["ArrowRight"] === "undefined"){
    this.runningIndex = 0;
    this.objects["player"].setTexture(this.textures[`player.png`]);
  }

  if(keys["ArrowLeft"]){
    this.objects["player"].rotation -= 0.04;
    this.objects["player"].scale.x = -1;
    this.objects["player"].setTexture(this.textures[`run${this.runningIndex++}.png`]);
    if(this.runningIndex == 5)
      this.runningIndex = 0;
  }else if(keys["ArrowRight"]){
    this.objects["player"].rotation += 0.04;
    this.objects["player"].scale.x = 1;
    this.objects["player"].setTexture(this.textures[`run${this.runningIndex++}.png`]);
    if(this.runningIndex == 5)
      this.runningIndex = 0;
  }

  this.app.stage.position.x = this.screenWidth/2;
  this.app.stage.position.y = this.screenHeight/2;

  // Game logic
  // for(var i = 0; i < objectContainer.length; i++){
  // }

  window.requestAnimationFrame(this.Update.bind(this));
}

$(document).ready(function(){
  var taiga = new Taiga();
  taiga.Initialize();
});
