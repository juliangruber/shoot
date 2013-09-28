var Camera = require('..');

/**
 * Use camera's input field.
 */

var camera = new Camera({ type: ['jpg', 'gif'] });
document.body.appendChild(camera.el);

camera.on('loading', function () {
  console.log('loading');
});

camera.on('picture', function (pic) {
  var img = new Image();
  img.src = pic;
  document.body.appendChild(img);
});

/**
 * Trigger camera yourself.
 */

var camera2 = new Camera();

var manual = document.createElement('a');
manual.appendChild(document.createTextNode('shoot'));
document.body.appendChild(manual);

manual.onclick = camera2.shoot.bind(camera2, function (pic) {
  var img = new Image();
  img.src = pic;
  document.body.appendChild(img);
});
