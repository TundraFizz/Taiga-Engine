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

$(document).ready(function(){Init();});


function Init(){
  var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
  $("body").prepend(app.view);

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("sprite.png");





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
  bunny.x = x;
  bunny.y = y;

  // add it to the stage
  app.stage.addChild(bunny);











  // Scale mode for pixelation
  // texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  mid = new PIXI.Sprite(texture);
  mid.position.x = 0;
  mid.position.y = 128;
  app.addChild(mid);

  // for (var i = 0; i < 10; i++) {
  //   createBunny(
  //       Math.floor(Math.random() * app.renderer.width),
  //       Math.floor(Math.random() * app.renderer.height)
  //   );
  // }
}

function createBunny(x, y) {

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
    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    app.stage.addChild(bunny);
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
