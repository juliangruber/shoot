
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * Expose `Camera`.
 */

module.exports = Camera;

/**
 * Camera component.
 *
 * @param {Object=} opts
 */

function Camera (opts) {
  if (!(this instanceof Camera)) return new Camera();
  Emitter.call(this);
  this.el = createInput(opts && opts.type);
  this.load = load.bind(null, this);
  this.el.addEventListener('change', this.load);
}

inherits(Camera, Emitter);

/**
 * Shoot a picture.
 *
 * @param {Function} fn
 * @api public
 */

Camera.prototype.shoot = function (fn) {
  if (typeof fn == 'function') this.once('picture', fn);
  var ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  this.el.dispatchEvent(ev);
};

/**
 * Remove from dom and clean up.
 *
 * @api public
 */

Camera.prototype.remove = function () {
  this.el.removeEventListener('change', this.load);
  if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
};

/**
 * Get an image from the dom event.
 *
 * @param {Event} ev
 * @api private
 */

function load (self, ev) {
  var files = ev.target.files;
  if (!files || !files.length) return;

  var file = files[0];
  var reader = new FileReader();

  reader.onload = function(ev) {
    var data = ev.target.result;
    self.emit('picture', data);
  }

  self.emit('loading');
  reader.readAsDataURL(file);
};

/**
 * Create camera input field.
 *
 * @param {String|Array=} type
 * @return {Element}
 */

function createInput (type) {
  var input = document.createElement('input');
  input.type = 'file';
  input.capture = 'camera';
  input.accept = accept(type);
  return input;
}

/**
 * Accept field value helper.
 *
 * @param {String|Array=} type
 * @return {String}
 */

function accept(type) {
  if (typeof type == 'string') return 'image/' + type;
  if (Array.isArray(type)) return type
      .map(function(type) { return 'image/' + type })
      .join(',');
  if (!type) return 'image/*';
  throw new Error('unknown type');
}

