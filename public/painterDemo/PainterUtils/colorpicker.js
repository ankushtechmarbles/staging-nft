var ColorPicker = (function () {
  "use strict";

  var WIDTH = 300;
  var HEIGHT = 200;

  //coordinates are all relative to [left, bottom]

  var ALPHA_SLIDER_X = 220;
  var ALPHA_SLIDER_Y = 10;
  var ALPHA_SLIDER_WIDTH = 20;
  var ALPHA_SLIDER_HEIGHT = 180;

  //center of the hue circle
  var CIRCLE_X = 100;
  var CIRCLE_Y = 100;

  var INNER_RADIUS = 75;
  var OUTER_RADIUS = 90;

  //dimensions of the inner saturation brightness square
  var SQUARE_WIDTH = INNER_RADIUS * Math.sqrt(2);

  //edits a HSVA array
  function ColorPicker(
    painter,
    parameterName,
    wgl,
    canvas,
    shaderSources,
    left,
    bottom,
    display
  ) {
    this.wgl = wgl;
    this.canvas = canvas;
    this.display = display;

    //painter[parameterName] points to the HSVA array this picker edits
    this.painter = painter;
    this.parameterName = parameterName;

    this.left = left;
    this.bottom = bottom;

    //whether we're currently manipulating the hue or the saturation/lightness
    this.huePressed = false;
    this.saturationLightnessPressed = false;
    this.alphaPressed = false;

    this.pickerProgram = wgl.createProgram(
      shaderSources["shaders/picker.vert"],
      shaderSources["shaders/picker.frag"],
      { a_position: 0 }
    );

    this.pickerProgramRGB = wgl.createProgram(
      shaderSources["shaders/picker.vert"],
      "#define RGB \n " + shaderSources["shaders/picker.frag"],
      { a_position: 0 }
    );

    this.quadVertexBuffer = wgl.createBuffer();
    wgl.bufferData(
      this.quadVertexBuffer,
      wgl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]),
      wgl.STATIC_DRAW
    );
  }

  ColorPicker.prototype.draw = function (rgbModel) {
    return;
  };

  ColorPicker.prototype.overControl = function (x, y) {
    return (
      this.overHue(x, y) ||
      this.overSaturationLightness(x, y) ||
      this.overAlpha(x, y)
    );
  };

  ColorPicker.prototype.overHue = function (x, y) {
    //x and y are relative to the canvas
    x -= this.left;
    y -= this.bottom;

    var xDist = x - CIRCLE_X;
    var yDist = y - CIRCLE_Y;

    var distance = Math.sqrt(xDist * xDist + yDist * yDist);

    return distance < OUTER_RADIUS && distance > INNER_RADIUS;
  };

  ColorPicker.prototype.overSaturationLightness = function (x, y) {
    //x and y are relative to the canvas
    x -= this.left;
    y -= this.bottom;

    var xDist = x - CIRCLE_X;
    var yDist = y - CIRCLE_Y;

    return (
      Math.abs(xDist) <= SQUARE_WIDTH / 2 && Math.abs(yDist) <= SQUARE_WIDTH / 2
    );
  };

  ColorPicker.prototype.overAlpha = function (x, y) {
    //x and y are relative to the canvas
    x -= this.left;
    y -= this.bottom;

    return (
      x >= ALPHA_SLIDER_X &&
      x <= ALPHA_SLIDER_X + ALPHA_SLIDER_WIDTH &&
      y >= ALPHA_SLIDER_Y &&
      y <= ALPHA_SLIDER_Y + ALPHA_SLIDER_HEIGHT
    );
  };

  ColorPicker.prototype.onMouseDown = function (x, y) {
    //x and y are relative to the canvas
    if (this.overHue(x, y)) {
      this.huePressed = true;
    } else if (this.overSaturationLightness(x, y)) {
      this.saturationLightnessPressed = true;
    } else if (this.overAlpha(x, y)) {
      this.alphaPressed = true;
    }

    this.onMouseMove(x, y);
  };

  ColorPicker.prototype.isInUse = function () {
    return (
      this.huePressed || this.saturationLightnessPressed || this.alphaPressed
    );
  };

  ColorPicker.prototype.onMouseUp = function (x, y) {
    this.huePressed = false;
    this.saturationLightnessPressed = false;
    this.alphaPressed = false;
  };

  ColorPicker.prototype.onMouseMove = function (mouseX, mouseY) {
    //make relative to the picker
    mouseX -= this.left;
    mouseY -= this.bottom;

    if (
      this.huePressed ||
      this.saturationLightnessPressed ||
      this.alphaPressed
    ) {
      var hsva = this.painter[this.parameterName];

      if (this.huePressed) {
        var angle = Math.atan2(mouseY - CIRCLE_Y, mouseX - CIRCLE_X);
        if (angle < 0) angle += 2.0 * Math.PI; //[-PI, PI] -> [0, 2 * PI]
        //hue
        hsva[0] = angle / (2.0 * Math.PI);
      } else if (this.saturationLightnessPressed) {
        //saturation
        hsva[1] = (mouseX - (CIRCLE_X - SQUARE_WIDTH / 2)) / SQUARE_WIDTH;
        hsva[1] = Utilities.clamp(hsva[1], 0.0, 1.0);

        //brightness
        hsva[2] = (mouseY - (CIRCLE_Y - SQUARE_WIDTH / 2)) / SQUARE_WIDTH;
        hsva[2] = Utilities.clamp(hsva[2], 0.0, 1.0);
      } else if (this.alphaPressed) {
        //alpha
        hsva[3] = Utilities.clamp(
          (mouseY - ALPHA_SLIDER_Y) / ALPHA_SLIDER_HEIGHT,
          0,
          1
        );
      }
    }
  };

  return ColorPicker;
})();
