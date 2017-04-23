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

function TaiVec2DCopy( dst, src ){
  dst.x = src.x;
  dst.y = src.y;
}

function TaiVec2DEquals( vec0, vec1 ){
  result
    = vec0.x == vec1.x
    && vec0.y == vec1.y;
  return result;
}

function TaiVec2DQuadrance( vec ){
  var result = TaiVec2DDot( vec, vec );
  return result;
}

function TaiVec2DLen( vec ){
  var quadrance = TaiVec2DQuadrance( vec );
  var result = Math.sqrt( quadrance );
  return result;
}

function TaiVec2DDot( vec0, vec1 )
{
  var result
    = vec0.x * vec1.x
    + vec0.y * vec1.y;
  return result;
}

function TaiVec2DScale( vec, scale ){
  return new TaiVec2D(
    vec.x * scale,
    vec.y * scale );
}

function TaiVec2DAngleBetweenRads( vec0, vec1 ){
  var numer = TaiVec2DDot( vec0, vec1 );
  var denom = TaiVec2DLen( vec0 ) * TaiVec2DLen( vec1 );
  return Math.acos( numer / denom );
}

function TaiVec3DCross( u, v )
{
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

function TaiSquare( val )
{
  return val * val;
}

function TaiToDegrees( radians )
{
  return radians * 180 / Math.PI;
}

function TaiToRads( degrees )
{
  return degrees * Math.PI / 180;
}

//
// Tai Math <--> PIXI Math interface
//

function TaiVec2DToPixiPoint( taiVec )
{
  return new PIXI.Point( taiVec.x, taiVec.y );
}

