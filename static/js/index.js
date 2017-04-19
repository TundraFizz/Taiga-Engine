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
}

var TaiEntity = function( texture )
{
}

var sean;
var shawn;
var shayn;
var shane;

var lastMsec;

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
  lastMsec = performance.now();
}

var lastMsec = null;

function update() {
  var currMsec = performance.now();
  var deltaSecs = ( currMsec - lastMsec ) / 1000;
  for( let entity of sean.entities )
  {
    entity.sprite.position = PIXIPointAdd(
      entity.sprite.position,
      PIXIPointScale( entity.velocity, deltaSecs ) );
  }

  renderer.render(stage);

  lastMsec = currMsec;
  requestAnimationFrame(update);
}
