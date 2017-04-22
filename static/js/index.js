//
// TaiVec2D
//

function TaiVec2D( x, y ){
  this.x = x;
  this.y = y;
}

function TaiVec2DAdd( vec0, vec1 ){
  return new TaiVec2D(
    vec0.x + vec1.x,
    vec0.y + vec1.y );
}

function TaiVec2DScale( vec, scale )
{
  return new TaiVec2D(
    vec.x * scale,
    vec.y * scale );
}

//
// Tai Math <--> PIXI Math interface
//

function TaiVec2DToPixiPoint( taiVec )
{
  return new PIXI.Point( taiVec.x, taiVec.y );
}

//
// TaiGraphics
//

function TaiGraphics( pixiStage, pixiRenderer ){
  this.drawables = [];
  this.pixiStage = pixiStage;
  this.pixiRenderer = pixiRenderer;
}

TaiGraphics.prototype.SpawnDrawable = function( pixiTexture ){
  var drawable = new TaiDrawable( this.pixiStage, pixiTexture );
  this.drawables.push( drawable );
  return drawable;
}

TaiGraphics.prototype.Update = function(){
  // TODO: Compute the pixel coordinates based on
  // - camera pos/orientatoin
  // - entity's world coords
  // ( For now, treat world coords as pixel coords )
  for( let drawable of this.drawables ){
    pixiSprite = drawable.pixiSprite;
    pixiSprite.position = TaiVec2DToPixiPoint( drawable.entity.position );
  }
}

//
// TaiDrawable
//

function TaiDrawable( pixiStage, pixiTexture ){
  var pixiSprite = new PIXI.Sprite( pixiTexture );
  pixiSprite.position = new PIXI.Point( 0, 0 );
  pixiSprite.interactive = false; // Allow object to respond to mouse and touch events
  pixiSprite.buttonMode  = false; // If the hand cursor appears when you mouse over
  pixiSprite.anchor.set(0.5);     // Center the anchor point
  pixiSprite.scale.set(1);        // Scale
  pixiStage.addChild( pixiSprite );
  this.pixiSprite = pixiSprite;
  this.componentName = "Drawable";
}

//
// TaiEntity
//

function TaiEntity(){
  this.position = new TaiVec2D( 0, 0 );
  this.components = [];
}

// Debug stuff: Press the + and - keys to zoom in and out
var keys = {};
$(document).keydown(function(e){
  keys[e.key] = true;
});
$(document).keyup(function(e){
  delete keys[e.key];
});

TaiEntity.prototype.GetComponent = function( componentName ){
  for( let component of this.components ){
    if( component.componentName == componentName ){
      return component;
    }
  }
}

TaiEntity.prototype.AddComponent = function( component ){
  this.components.push( component ); 
  component.entity = this;
}

//
// Taiga
//

function Taiga(){
  this.textures        = {};
  this.objectContainer = [];
  this.objects         = {};
  this.screenWidth     = 800;
  this.screenHeight    = 600;
  this.scalar          = 1;
  this.runningIndex    = 0;
  this.app = new PIXI.Application(
    this.screenWidth,
    this.screenHeight,
    {backgroundColor : 0xff8888});
  $("body").prepend(this.app.view);

  this.objectContainer = [];

  // Create systems
  this.graphics = new TaiGraphics( this.app.stage, this.app.renderer );

  // Populate scene
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

  window.requestAnimationFrame(this.Update.bind(this));
}

Taiga.prototype.CreateEntity = function(){
  var entity = new TaiEntity();
  this.objectContainer.push( entity );
  return entity;
}

Taiga.prototype.LoadTextures = function(){
  this.LoadTexture("planet.png");
  this.LoadTexture("player.png");
  this.LoadTexture("enemy1.png");
  this.LoadTexture("enemy2.png");
  this.LoadTexture("enemy3.png");
  this.LoadTexture("enemy4.png");
  this.LoadTexture("enemy5.png");
  this.LoadTexture("enemy6.png");
  this.LoadTexture("enemy7.png");
  this.LoadTexture("enemy8.png");
  this.LoadTexture("run0.png");
  this.LoadTexture("run1.png");
  this.LoadTexture("run2.png");
  this.LoadTexture("run3.png");
  this.LoadTexture("run4.png");
}

Taiga.prototype.LoadTexture = function(textureName){
  this.textures[textureName] = PIXI.Texture.fromImage(textureName);
}

Taiga.prototype.CreatePlanet = function(){
  var texture = this.textures["planet.png"];
  var drawable = this.graphics.SpawnDrawable( texture );
  var entity = this.CreateEntity();
  entity.AddComponent( drawable );
  entity.position.x = 0;
  entity.position.y = 0;
}

Taiga.prototype.CreatePlayer = function(){
  var texture = this.textures["player.png"];
  var drawable = this.graphics.SpawnDrawable( texture );
  var entity = this.CreateEntity();
  entity.AddComponent( drawable );
  entity.position.x = 0;
  entity.position.y = 0;
  this.objects["player"] = entity;
}

Taiga.prototype.CreateEnemy = function(textureName, scale, x, y){
  var texture = this.textures[textureName];
  var drawable = this.graphics.SpawnDrawable( texture );
  var entity = this.CreateEntity();
  entity.AddComponent( drawable );
  entity.position.x = x;
  entity.position.y = y;
  drawable.pixiSprite.scale.set( scale );
}

Taiga.prototype.Update = function(time){
  this.delta = time - this.then;
  this.then  = time;

  if(typeof keys["ArrowRight"] === "undefined" && this.runningIndex > 0){
    // this.runningIndex = 0;
  }

  var player = this.objects["player"];
  var drawable = player.GetComponent( "Drawable" );
  var pixiSprite = drawable.pixiSprite;

  if(keys["ArrowLeft"]){
    pixiSprite.rotation -= 0.04;
    pixiSprite.scale.x = -1;
    pixiSprite.setTexture(this.textures[`run${this.runningIndex++}.png`]);
    if(this.runningIndex == 5)
      this.runningIndex = 0;
  }else if(keys["ArrowRight"]){
    pixiSprite.rotation += 0.04;
    pixiSprite.scale.x = 1;
    pixiSprite.setTexture(this.textures[`run${this.runningIndex++}.png`]);
    if(this.runningIndex == 5)
      this.runningIndex = 0;
  }

  this.app.stage.position.x = this.screenWidth/2;
  this.app.stage.position.y = this.screenHeight/2;

  // Game logic
  // for(var i = 0; i < objectContainer.length; i++){
  // }

  this.graphics.Update();
  window.requestAnimationFrame(this.Update.bind(this));
}

$(document).ready(function(){
  new Taiga();
});

