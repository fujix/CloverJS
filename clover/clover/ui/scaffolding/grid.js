// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Fixed Grid Row module.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.scaffolding.Grid');
goog.provide('clover.ui.scaffolding.GridRenderer');
goog.require('clover.ui.scaffolding.AbstractGrid');
goog.require('clover.ui.scaffolding.AbstractGridRenderer');
goog.require('goog.math');
goog.require('goog.object');
goog.require('goog.ui.registry');



/**
 * The default grid system provided in Bootstrap utilizes 12 columns that render
 * out at widths of 724px, 940px (default without responsive CSS included), and
 * 1170px. Below 767px viewports, the columns become fluid and stack vertically.
 *
 * <pre>&lt;div class=&quot;row&quot;&gt;
 * &lt;div class=&quot;span4&quot;&gt; ... &lt;div&gt;
 * &lt;div class=&quot;span8&quot;&gt; ... &lt;div&gt;
 * &lt;div&gt;</pre>
 *
 * As shown here, a basic layout can be created with two "columns", each
 * spanning a number of the 12 foundational columns we defined as part of our
 * grid system.
 * @param {text|Element} content Text caption or DOM structure to display as the
 *    content of the component (if any).
 * @param {number} width Grid width.
 * @param {?number=} opt_offset Offset from left end.
 * @param {?clover.ui.scaffolding.AbstractGridRenderer=} opt_renderer
 *    Renderer used to render or decorate the component.
 * @param {?goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGrid}
 */
clover.ui.scaffolding.Grid = function(content, width, opt_offset, opt_renderer,
    opt_domHelper) {
  goog.base(this, content, width, opt_offset, opt_renderer ||
      clover.ui.scaffolding.GridRenderer.getInstance(), opt_domHelper);
};
goog.inherits(clover.ui.scaffolding.Grid,
    clover.ui.scaffolding.AbstractGrid);


/**
 * Checks if the value is a integer if {@link goog.asserts.ENABLE_ASSERTS} is
 * true.
 * @param {number} number The number to check.
 * @return {number} Checked number.
 * @private
 */
clover.ui.scaffolding.Grid.prototype.assertInteger_ = function(number) {
  goog.asserts.assert(goog.math.isInt(number),
      'Expected integer but got not integer: %s.', number);
  return number;
};


/**
 * Checks if the value is a 0 if {@link goog.asserts.ENABLE_ASSERTS} is true.
 * @param {number} number The number to check.
 * @return {number} Checked number.
 * @private
 */
clover.ui.scaffolding.Grid.prototype.assertZero_ = function(number) {
  goog.asserts.assert(number !== 0,
      'Expected zero but got not 0: %s.', number);
  return number;
};


/**
 * Sets width of the grid.
 * @param {number} width No description.
 */
clover.ui.scaffolding.Grid.prototype.setWidth = function(width) {
  goog.asserts.assertNumber(width);
  this.assertInteger_(width);
  this.assertIntegert(width);
  goog.asserts.assert(width <= 12,
      'Expected width but got greater than 13: %s.', width);
  goog.base(this, 'setWidth', width);
};


/**
 * Sets offset of the grid.
 * @param {number} offset No description.
 */
clover.ui.scaffolding.Grid.prototype.setOffset = function(offset) {
  goog.asserts.assertNumber(offset);
  this.assertInteger_(offset);
  this.assertIntegert(offset);
  goog.asserts.assert(offset <= 12,
      'Expected offset but got greater than 13: %s.', offset);
  goog.base(this, 'setOffset', offset);
};



/**
 * Default renderer for clover.ui.scaffolding.Grid.
 * @constructor
 * @extends {clover.ui.scaffolding.AbstractGridRenderer}
 */
clover.ui.scaffolding.GridRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.scaffolding.GridRenderer,
    clover.ui.scaffolding.AbstractGridRenderer);
goog.addSingletonGetter(clover.ui.scaffolding.GridRenderer);


/**
 * @enum {string}
 */
clover.ui.scaffolding.GridRenderer.CssClasses = {
  WIDTH_1: goog.getCssName('span1'),
  WIDTH_2: goog.getCssName('span2'),
  WIDTH_3: goog.getCssName('span3'),
  WIDTH_4: goog.getCssName('span4'),
  WIDTH_5: goog.getCssName('span5'),
  WIDTH_6: goog.getCssName('span6'),
  WIDTH_7: goog.getCssName('span7'),
  WIDTH_8: goog.getCssName('span8'),
  WIDTH_9: goog.getCssName('span9'),
  WIDTH_10: goog.getCssName('span10'),
  WIDTH_11: goog.getCssName('span11'),
  WIDTH_12: goog.getCssName('span12')
};


/**
 * @enum {string}
 * @private
 */
clover.ui.scaffolding.GridRenderer.WidthClassMap_ = function() {
  var classes = clover.ui.scaffolding.GridRenderer.CssClasses;
  return {
    1: classes.WIDTH_1,
    2: classes.WIDTH_2,
    3: classes.WIDTH_3,
    4: classes.WIDTH_4,
    5: classes.WIDTH_5,
    6: classes.WIDTH_6,
    7: classes.WIDTH_7,
    8: classes.WIDTH_8,
    9: classes.WIDTH_9,
    10: classes.WIDTH_10,
    11: classes.WIDTH_11,
    12: classes.WIDTH_12
  };
}();


/**
 * Returns width by Css Class string.
 * @param {string} className Class name to get width.
 * @return {number} Grid width.
 */
clover.ui.scaffolding.GridRenderer.getWidthByClassName = function(className) {
  var map = clover.ui.scaffolding.GridRenderer.WidthClassMap_;
  var key = goog.object.findKey(map, function(value) {
    return value === className;
  });
  if (isNaN(key)) return null;
  return Number(key);
};


/**
 * @enum {string}
 */
clover.ui.scaffolding.GridRenderer.OffsetCssClasses = {
  OFFSET_0: '',
  OFFSET_1: goog.getCssName('offset1'),
  OFFSET_2: goog.getCssName('offset2'),
  OFFSET_3: goog.getCssName('offset3'),
  OFFSET_4: goog.getCssName('offset4'),
  OFFSET_5: goog.getCssName('offset5'),
  OFFSET_6: goog.getCssName('offset6'),
  OFFSET_7: goog.getCssName('offset7'),
  OFFSET_8: goog.getCssName('offset8'),
  OFFSET_9: goog.getCssName('offset9'),
  OFFSET_10: goog.getCssName('offset10'),
  OFFSET_11: goog.getCssName('offset11'),
  OFFSET_12: goog.getCssName('offset12')
};



/**
 * Creates and returns the grid's root element.  The default simply creates a
 * DIV and applies the renderer's own CSS class name to it.
 * To be overridden in subclasses.
 * @param {clover.ui.scaffolding.Grid} grid Grid to render.
 * @return {Element} Root element for the grid.
 * @override
 */
clover.ui.scaffolding.GridRenderer.prototype.createDom = function(grid) {
  return grid.getDomHelper().createDom('div',
      this.getClassNames(grid).join(' '), grid.getContent());
};


/**
 * Returns Css class by grid width.
 * @param {clover.ui.scaffolding.Grid} grid No description.
 * @return {string} Css Class string.
 * @override
 */
clover.ui.scaffolding.GridRenderer.prototype.getCssClass = function(grid) {
  var width = grid.getWidth();
  var css = clover.ui.scaffolding.GridRenderer.WidthClassMap_[width];
  goog.asserts.assertString(css);
  return css;
};


/**
 * Returns all CSS class names applicable to the given grid, based on its
 * state.  The array of class names returned includes the renderer's own CSS
 * class, followed by a CSS class indicating the grid's orientation,
 * followed by any state-specific CSS classes.
 * @param {clover.ui.scaffolding.Grid} grid Grid whose CSS classes are to be
 *    returned.
 * @return {Array.<string>} Array of CSS class names applicable to the grid.
 */
clover.ui.scaffolding.GridRenderer.prototype.getClassNames = function(grid) {
  return [this.getCssClass(grid), this.getOffsetCssClass(grid)];
};


/** @override */
clover.ui.scaffolding.GridRenderer.prototype.getOffsetCssClass = function(
    grid) {
  var classes = clover.ui.scaffolding.GridRenderer.OffsetCssClasses;
  var offset = grid.getOffset();
  switch (offset) {
    case 0:
      return classes.OFFSET_0;
    case 1:
      return classes.OFFSET_1;
    case 2:
      return classes.OFFSET_2;
    case 3:
      return classes.OFFSET_3;
    case 4:
      return classes.OFFSET_4;
    case 5:
      return classes.OFFSET_5;
    case 6:
      return classes.OFFSET_6;
    case 7:
      return classes.OFFSET_7;
    case 8:
      return classes.OFFSET_8;
    case 9:
      return classes.OFFSET_9;
    case 10:
      return classes.OFFSET_10;
    case 11:
      return classes.OFFSET_11;
    case 12:
      return classes.OFFSET_12;
    default:
      throw Error('Invalied offset: ' + offset);
  }
};


/**
 * Sets width of the grid.
 * @param {clover.ui.scaffolding.Grid} grid No description.
 * @param {number} width No description.
 */
clover.ui.scaffolding.GridRenderer.prototype.setWidth = function(grid,
    width) {
  var classes = goog.object.getValues(
      clover.ui.scaffolding.GridRenderer.CssClasses);
  goog.dom.classes.addRemove(grid.getElement(), width, classes);
};


/**
 * Sets offset of the grid.
 * @param {clover.ui.scaffolding.Grid} grid No description.
 * @param {number} offset No description.
 */
clover.ui.scaffolding.GridRenderer.prototype.setOffset = function(
    grid, offset) {
  var classes = goog.object.getValues(
      clover.ui.scaffolding.GridRenderer.OffsetCssClasses);
  goog.dom.classes.addRemove(grid.getElement(), offset, classes);
};


// Register a decorator factory function for Grid
goog.object.forEach(clover.ui.scaffolding.GridRenderer.CssClasses,
    function(css) {
      goog.ui.registry.setDecoratorByClassName(css, function() {
        var width = clover.ui.scaffolding.GridRenderer.getWidthByClassName(css);
        return new clover.ui.scaffolding.Grid(null, width);
      });
    });
