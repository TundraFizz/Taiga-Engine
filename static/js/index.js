function PIXIPointAdd( point0, point1 )
{
  return new PIXI.Point(
    point0.x + point1.x,
    point0.y + point1.y );
}

function PIXIPointScale( point, scale )
{
  return new PIXI.Point(
    point.x * scale,
    point.y * scale );
}

var TaiScene = function( stage )
{
  this.stage = stage;
  this.entities = [];
  this.lastMsec = performance.now();
  this.CreateEntity = function( position, velocity, texture )
  {
    sprite = new PIXI.Sprite( texture );
    sprite.position = position;
    stage.addChild( sprite );

    entity = new TaiEntity();
    entity.sprite = sprite;
    entity.velocity = velocity;

    this.entities.push( entity );
    return entity;
  }
  this.Frame = function()
  {
    var currMsec = performance.now();
    var deltaSecs = ( currMsec - this.lastMsec ) / 1000;
    this.lastMsec = currMsec;
    for( let entity of this.entities )
    {
      entity.sprite.position = PIXIPointAdd(
        entity.sprite.position,
        PIXIPointScale( entity.velocity, deltaSecs ) );
    }
  }
}

var TaiEntity = function( texture )
{
}

var sean;
var shawn;
var shayn;
var shane;

function init() {
  stage = new PIXI.Container();
  renderer = PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  var farTexture = PIXI.Texture.fromImage("bg-far.png");
  var midTexture = PIXI.Texture.fromImage("bg-mid.png");

  sean = new TaiScene( stage );
  shawn = new TaiScene( stage );
  shayn = new TaiScene( stage );
  shane = new TaiScene( stage );

  sean.CreateEntity(
    new PIXI.Point( 0, 0 ),
    new PIXI.Point( 8, 0 ),
    farTexture );

  sean.CreateEntity(
    new PIXI.Point( 0, 128 ),
    new PIXI.Point( 38, 0 ),
    midTexture );

  requestAnimationFrame(update);
}


function update() {

  sean.Frame();

  renderer.render(stage);

  requestAnimationFrame(update);
}
