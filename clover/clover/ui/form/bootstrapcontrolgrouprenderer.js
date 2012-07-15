// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for input renderer.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.BootstrapControlGroupRenderer');

goog.require('clover.ui.form.ControlGroup');
goog.require('clover.ui.form.ControlGroupRenderer');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.ui.registry');



/**
 * @constructor
 * @extends {clover.ui.form.ControlGroupRenderer}
 */
clover.ui.form.BootstrapControlGroupRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.form.BootstrapControlGroupRenderer,
    clover.ui.form.ControlGroupRenderer);
goog.addSingletonGetter(clover.ui.form.BootstrapControlGroupRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.form.BootstrapControlGroupRenderer.CSS_CLASS = goog.getCssName(
    'control-group');


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.getLabelClass =
    function() {
  return goog.getCssName('control-label');
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.getContentClass =
    function() {
  return goog.getCssName('controls');
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.getBlockHelpClass =
    function() {
  return goog.getCssName('help-block');
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.getInlineHelpClass =
    function() {
  return goog.getCssName('help-inline');
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.getCssClass =
    function() {
  return clover.ui.form.BootstrapControlGroupRenderer.CSS_CLASS;
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.
    createClassByControlGroupStateMap = function() {
  var state = clover.ui.form.ControlGroup.ControlGroupState;
  /** @override */
  this.classByControlGroupState = goog.object.create(
      state.NORMAL, null,
      state.WARNING, goog.getCssName('warning'),
      state.ERROR, goog.getCssName('error'),
      state.SUCCESS, goog.getCssName('success'),
      state.UNEDITABLE, null);
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.setConfirmed = function(
    component, confirmed) {
};


/** @override */
clover.ui.form.BootstrapControlGroupRenderer.prototype.setValid = function(
    component, valid, opt_msg) {
  goog.base(this, 'setValid', component, valid, opt_msg);
  if (!valid) {
    var element = component.getElement();
    goog.dom.classes.add(element, this.getClassByControlGroupState(
        clover.ui.form.ControlGroup.ControlGroupState.ERROR));
  }
};


// Registry
goog.ui.registry.setDecoratorByClassName(
    clover.ui.form.BootstrapControlGroupRenderer.CSS_CLASS, function() {
      return new clover.ui.form.ControlGroup();
    });

goog.ui.registry.setDefaultRenderer(clover.ui.form.ControlGroup,
    clover.ui.form.BootstrapControlGroupRenderer);
