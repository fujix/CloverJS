// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for input renderer.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.FieldSetRenderer');

goog.require('clover.ui.RendererContentHelper');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.ui.ContainerRenderer');



/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
clover.ui.form.FieldSetRenderer = function() {
  goog.base(this);
  this.helper_ = new clover.ui.RendererContentHelper(this, true);
  this.helper_.addContentSetter('legend', this.setLegendContent);
  this.helper_.addContentElementGetter('legend', this.getLegendContentElement);
};
goog.inherits(clover.ui.form.FieldSetRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(clover.ui.form.FieldSetRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.form.FieldSetRenderer.CSS_CLASS = goog.getCssName('clover-fieldset');


/**
 * Returns default CSS class to be applied to the label element of components
 * rendered by this renderer.
 * @return {?string} Default CSS class.
 * @protected
 */
clover.ui.form.FieldSetRenderer.prototype.getLegendClass = function() {
  return goog.getCssName('clover-fieldset-legend');
};


/** @override */
clover.ui.form.FieldSetRenderer.prototype.getCssClass = function() {
  return clover.ui.form.FieldSetRenderer.CSS_CLASS;
};


/** @override */
clover.ui.form.FieldSetRenderer.prototype.canDecorate = function(element) {
  return element.tagName === goog.dom.TagName.FIELDSET;
};


/**
 * Default implementation of {@code decorate} for {@link
 * clover.ui.form.FieldSet}s. Decorates the element with the input, and
 * attempts to decorate its child elements.  Returns the decorated element.
 * The method expect a DOM structure below.
 *
 * <ul>
 *  <li>fieldset
 *  <ul>
 *   <li>legend (if exists)
 *    <li>(clover.ui.form.ControlGroup)
 *    <li>(clover.ui.form.ControlGroup)
 *    <li>..
 *  </ul>
 * </ul>
 *
 * @param {clover.ui.form.FieldSet} component Component to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
clover.ui.form.FieldSetRenderer.prototype.decorate = function(
    component, element) {
  var result = goog.base(this, 'decorate', component, element);
  var dom = component.getDomHelper();
  goog.dom.classes.add(element, this.getCssClass());
  var legend = this.getContentElement(element, 'legend');
  if (legend) {
    // TODO: remove childNodes access
    component.setContentInternal(legend.childNodes, 'legend');
  }
  return result;
};


/**
 * Sets content to the legend element fot the fieldset.
 * @param {Element} element Element to set content.
 * @param {clover.ui.form.LegendContent} content Content to append the legend
 *     element.
 * @protected
 */
clover.ui.form.FieldSetRenderer.prototype.setLegendContent = function(
    element, content) {
  var dom = goog.dom.getDomHelper(element);
  var contentElement = this.getContentElement(element, 'legend');
  if (content) {
    if (contentElement) {
      dom.removeChildren(contentElement);
      dom.append(contentElement, content);
    } else {
      dom.insertChildAt(element, this.createLegend(content, dom), 0);
    }
  } else {
    dom.removeNode(contentElement);
  }
};


/**
 * Returns a legent element from given element.
 * @param {Element} element Element contains legent element.
 * @return {Element} The legend element.
 * @protected
 */
clover.ui.form.FieldSetRenderer.prototype.getLegendContentElement = function(
    element) {
  return goog.dom.getElementsByTagNameAndClass(
      /* tag name  */ goog.dom.TagName.LEGEND,
      /* css class */ this.getLegendClass(),
      /* element   */ element)[0];
};


/** @override */
clover.ui.form.FieldSetRenderer.prototype.createDom = function(
    component) {
  var dom = component.getDomHelper();
  var legendContent = component.getContent('legend');
  if (legendContent) {
    var legend = this.createLegend(legendContent, dom);
  }
  var element = dom.createDom(
      /* tag name    */ goog.dom.TagName.FIELDSET,
      /* attributes? */ this.getClassNames(component).join(' '),
      /* appendables */ legend, component.getContent('legend'));
  return element;
};


/**
 * Create legend element with a content.
 * @param {clover.ui.form.LegendContent} content Legend content.
 * @param {goog.dom.DomHelper} dom DOM helper from where the component to
 *     render.
 * @return
 */
clover.ui.form.FieldSetRenderer.prototype.createLegend = function(
    content, dom) {
  return dom.createDom(
        /* tag name    */ goog.dom.TagName.LEGEND,
        /* attributes? */ this.getLegendClass(),
        /* appendables */ content);
};
