//
// TaiVec2D
//

function TaiVec2D( x, y ){
  this.x = x;
  this.y = y;
}

TaiVec2D.prototype.Set = function( x, y ){
  this.x += x;
  this.y += y;
}

TaiVec2D.prototype.Add = function( vec ){
    this.x += vec.x;
    this.y += vec.y;
}

TaiVec2D.prototype.Copy = function( vec ){
  this.x = vec.x;
  this.y = vec.y;
}

TaiVec2D.prototype.Equals = function( vec ){
  result
    = this.x == vec1.x
    && this.y == vec1.y;
  return result;
}

TaiVec2D.prototype.Quadrance = function(){
  var result = this.Dot( this );
  return result;
}

TaiVec2D.prototype.Len = function(){
  var quadrance = this.Quadrance();
  var result = Math.sqrt( quadrance );
  return result;
}

TaiVec2D.prototype.Dot = function( vec ){
  var result
    = this.x * vec.x
    + this.y * vec.y;
  return result;
}

TaiVec2D.prototype.RotateTowardsRads = function( vec, maxAngleRads )
{
  angleRads
    = Math.min( this.AngleBetweenRads( vec ), maxAngleRads )
    * this.RotateDirection( vec );
  this.RotateRads( angleRads );
}

TaiVec2D.prototype.RotateRads = function( angleRads ) {
  // [x1] = [c,-s] * [x0]
  // [y1]   [s, c]   [y0]
  var c = Math.cos( angleRads );
  var s = Math.sin( angleRads );
  var x = c * this.x - s * this.y;
  var y = s * this.x + c * this.y;
  this.x = x;
  this.y = y;
}

TaiVec2D.prototype.Scale = function( scale ){
    this.x *= scale;
    this.y *= scale;
}

TaiVec2D.prototype.AngleBetweenRads = function( vec ){
  var numer = this.Dot( vec );
  var denom = this.Len() * vec.Len();
  return Math.acos( numer / denom );
}

TaiVec2D.prototype.RotateDirection = function( vec ){
  var crossZ = this.x * vec.y - this.y * vec.x;
  var result = crossZ > 0 ? 1 : -1;
  return result;
}

function TaiVec3DCross( u, v ) {
  return new TaiVec3D(
    u.y * v.z - u.z * v.y,
    u.z * v.x - u.x * v.z,
    u.x * v.y - u.y * v.x );
}

function TaiVec3D( x, y, z ){
  this.x = x;
  this.y = y;
  this.z = z;
}

//
// Tai Math Helpers
//

function TaiSquare( val ) {
  return val * val;
}

function TaiToDegrees( radians ) {
  return radians * 180 / Math.PI;
}

function TaiToRads( degrees ) {
  return degrees * Math.PI / 180;
}

//
// Tai Math <--> PIXI Math interface
//

function TaiVec2DToPixiPoint( taiVec ) {
  return new PIXI.Point( taiVec.x, taiVec.y );
}

