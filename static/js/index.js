//
// TaiVec2D
//

function TaiVec2D(){}
TaiVec2D.prototype.constructor = function( x, y ){
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

function TaiGraphics(){}

TaiGraphics.prototype.constructor = function( pixiStage, pixiRenderer ){
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

function TaiDrawable(){}

TaiDrawable.prototype.constructor = function( pixiStage, pixiTexture ){
  var pixiSprite = new PIXI.Sprite( pixiTexture );
  pixiSprite.position = new PIXI.Point( 0, 0 );
  pixiSprite.anchor.set(0.5);
  pixiStage.addChild( pixiSprite );
  this.pixiSprite = pixiSprite;
}

//
// TaiEntity
//

function TaiEntity(){}

TaiEntity.prototype.constructor = function(){
  this.position = new TaiVec2D( 0, 0 );
  this.components = [];
}

TaiEntity.prototype.AddComponent = function( component ){
  this.components.push( component ); 
  component.entity = this;
}

//
// Taiga
//

function Taiga(){}

Taiga.prototype.constructor = function(){
  this.app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
  $("body").prepend(this.app.view);

  this.objectContainer = [];

  // Create systems
  this.graphics = new TaiGraphics( this.app.stage, this.app.renderer );

  // Populate scene
  this.LoadTextures();
  this.CreateBunny();

  window.requestAnimationFrame(this.Update.bind(this));
}

Taiga.prototype.Update = function(time){
  this.delta = time - this.then;
  this.then = time;
  graphics.Update();
  // console.log(this.delta);
  window.requestAnimationFrame(this.Update.bind(this));
}

Taiga.prototype.LoadTextures = function(){
  this.bunnyTexture = PIXI.Texture.fromImage("sprite.png");
}

Taiga.prototype.CreateEntity = function(){
  var entity = new TaiEntity();
  this.objectContainer.push( entity );
  return entity;
}

Taiga.prototype.CreateBunny = function(){
  var drawable = this.graphics.SpawnDrawable( this.bunnyTexture );
  var bunny = this.CreateEntity();
  bunny.AddComponent( drawable );
  bunny.position.x = 200;
  bunny.position.y = 100;
}

$(document).ready(function(){
  var taiga = new Taiga();
});

