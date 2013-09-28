# shoot

Take pictures on mobile phones or just pick one on a desktop.

**Try it out on [requirebin](http://requirebin.com/embed?gist=6181429)**!

## Example

Insert the camera's `<input>` field into the dom and wait for someone to click
on it:

```js
var Camera = require('shoot');
var camera = new Camera();

camera.on('picture', function (pic) {
  var img = new Image();
  img.src = pic;
  document.body.appendChild(img);
});

document.body.appendChild(camera.el);
```

Trigger the camera yourself:

```js
var Camera = require('shoot');
var camera = new Camera();

var shoot = document.getElementById('shoot');
shoot.onclick = camera.shoot.bind(camera, function (pic) {
  var img = new Image();
  img.src = pic;
  document.body.appendChild(img);
});

document.body.appendChild(shoot);
```

## API

### Camera([opts])

Create a new camera.

Possible options:

* `type`: The accepted file type. Can be a `String`, like `'jpeg'`, or an
`Array`, like `['jpeg', 'gif']`. By default all images are accepted.

### Camera#shoot(fn)

Take a picture and call `fn` with the data uri.

### Camera#el

The camera's dom element - a `<input>` field.

### Camera#on('picture', fn)

`fn` is called when a picture is taken.

### Camera#on('loading', fn)

`fn` is called when the camera starts processing a file.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install shoot
```

Then bundle for the browser with
[browserify](https://github.com/substack/node-browserify).

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
