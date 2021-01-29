var Boid = function ( x, y, angle ) {
    this.x = x;
    this.y = y;

    this.angle = Math.pow( Math.random(), 20 ) + angle;
    this.dx = Math.cos( this.angle );
    this.dy = Math.sin( this.angle );

    this.life = Math.random() * 100 + 100;
    this.dead = false;

    this.update = function () {

	    context.strokeStyle = '#808080';
	    context.beginPath();
	    context.moveTo( this.x, this.y );

	    this.x += this.dx * 2;
	    this.y += this.dy * 2;
	    this.life -= 1;

	    context.lineTo( this.x, this.y );
	    context.stroke();

	    var index = ( Math.floor( this.x ) + width * Math.floor( this.y ) ) * 4;

	    if ( this.life <= 0 ) this.kill();
	    if ( data[ index + 3 ] > 0 ) this.kill();

	    if ( this.x < 0 || this.x > width ) this.kill();
	    if ( this.y < 0 || this.y > height ) this.kill();

    }

    this.kill = function () {

	    boids.splice( boids.indexOf( this ), 1 );
	    this.dead = true;

    }

}

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById( 'world' );
canvas.width = width;
canvas.height = height;

var context = canvas.getContext( '2d' );
var image, data;

var boids = [];
boids.push( new Boid( width / 2, height / 2, Math.random() * 180 * Math.PI / 180 ) );

setInterval( function () {

    image = context.getImageData( 0, 0, width, height );
    data = image.data;

    for ( var i = 0; i < boids.length; i ++ ) {

	    var boid = boids[ i ];
	    boid.update();

	    if ( !boid.dead && Math.random() > 0.5 && boids.length < 500 ) {

		    boids.push( new Boid( boid.x, boid.y, ( Math.random() > 0.5 ? 90 : - 90 ) * Math.PI / 180 + boid.angle ) );

	    }

    }

}, 1000 / 60 );

$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();

  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});
