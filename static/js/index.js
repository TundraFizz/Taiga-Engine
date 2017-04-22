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

var objectContainer = [];
var screenWidth     = 800;
var screenHeight    = 600;

function Taiga(){}

Taiga.prototype.Initialize = function(){
  this.app = new PIXI.Application(screenWidth, screenHeight, {backgroundColor : 0x1099bb});
  $("body").prepend(this.app.view);

  this.LoadTextures();
  this.CreatePlanet();

  window.requestAnimationFrame(this.Update.bind(this));
}

Taiga.prototype.LoadTextures = function(){
  this.textures = [];
  this.textures.push(PIXI.Texture.fromImage("planet.png"));
}

Taiga.prototype.CreatePlanet = function(){
  var object = new PIXI.Sprite(this.textures[0]);
  object.interactive = true; // Allow object to respond to mouse and touch events
  object.buttonMode = false; // If the hand cursor appears when you mouse over
  object.anchor.set(0.5);    // Center the anchor point
  object.scale.set(1);       // Scale

  // move the sprite to its designated position
  object.x = 0;
  object.y = 0;

  // Time to setup the events
  // object
  //     .on('pointerdown', onDragStart)
  //     .on('pointerup', onDragEnd)
  //     .on('pointerupoutside', onDragEnd)
  //     .on('pointermove', onDragMove);

      // For mouse-only events
      // .on('mousedown', onDragStart)
      // .on('mouseup', onDragEnd)
      // .on('mouseupoutside', onDragEnd)
      // .on('mousemove', onDragMove);

      // For touch-only events
      // .on('touchstart', onDragStart)
      // .on('touchend', onDragEnd)
      // .on('touchendoutside', onDragEnd)
      // .on('touchmove', onDragMove);


  // Add to the stage
  objectContainer.push(object);
  this.app.stage.addChild(object);
}

Taiga.prototype.Update = function(time){
  this.delta = time - this.then;
  this.then  = time;

  this.app.stage.scale.x -= .001;
  this.app.stage.scale.y -= .001;
  this.app.stage.position.x = screenWidth/2;
  this.app.stage.position.y = screenHeight/2;

  // this.app.stage.pivot.x = -screenWidth/2;
  // this.app.stage.pivot.y = -screenHeight/2;


  // for(var i = 0; i < objectContainer.length; i++){
  //   var scale = objectContainer[i].scale._x - .001;
  //   console.log(scale);
  //   objectContainer[i].scale.set(scale);
  // }

  window.requestAnimationFrame(this.Update.bind(this));
}

$(document).ready(function(){
  var taiga = new Taiga();
  taiga.Initialize();
});

function Bunny(){
  // create our little bunny friend..
  var bunny = new PIXI.Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.buttonMode = true;

  // center the bunny's anchor point
  bunny.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  bunny.scale.set(3);

  // setup events for mouse + touch using
  // the pointer events
  bunny
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);

      // For mouse-only events
      // .on('mousedown', onDragStart)
      // .on('mouseup', onDragEnd)
      // .on('mouseupoutside', onDragEnd)
      // .on('mousemove', onDragMove);

      // For touch-only events
      // .on('touchstart', onDragStart)
      // .on('touchend', onDragEnd)
      // .on('touchendoutside', onDragEnd)
      // .on('touchmove', onDragMove);

  // move the sprite to its designated position
  // bunny.x = x;
  // bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);
}

function Init(){
  var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
  $("body").prepend(app.view);

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("sprite.png");



  // Scale mode for pixelation
  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  // mid = new PIXI.Sprite(texture);
  // mid.position.x = 0;
  // mid.position.y = 128;
  // app.addChild(mid);

  // for (var i = 0; i < 10; i++) {
  //   createBunny(
  //       Math.floor(Math.random() * app.renderer.width),
  //       Math.floor(Math.random() * app.renderer.height)
  //   );
  // }
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
