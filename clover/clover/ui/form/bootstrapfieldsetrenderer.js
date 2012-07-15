// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for input renderer.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.BootstrapFieldSetRenderer');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.ui.ContainerRenderer');



/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
clover.ui.form.BootstrapFieldSetRenderer = function() {
  goog.base(this);
};
goog.inherits(
    clover.ui.form.BootstrapFieldSetRenderer, clover.ui.form.FieldSetRenderer);
goog.addSingletonGetter(clover.ui.form.BootstrapFieldSetRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.form.BootstrapFieldSetRenderer.CSS_CLASS = '';


/**
 * Returns default CSS class to be applied to the label element of components
 * rendered by this renderer.
 * @return {string?} Default CSS class.
 * @protected
 */
clover.ui.form.BootstrapFieldSetRenderer.prototype.getLegendClass = function() {
  return null;
};


/** @override */
clover.ui.form.BootstrapFieldSetRenderer.prototype.getCssClass = function() {
  return clover.ui.form.BootstrapFieldSetRenderer.CSS_CLASS;
};


goog.ui.registry.setDefaultRenderer(
    clover.ui.form.FieldSet, clover.ui.form.BootstrapFieldSetRenderer);
