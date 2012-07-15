// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.BootstrapFormRenderer');

goog.require('clover.ui.form.Form');
goog.require('clover.ui.form.FormRenderer');
goog.require('goog.ui.registry');



/**
 * @constructor
 * @extends {clover.ui.form.FormRenderer}
 */
clover.ui.form.BootstrapFormRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.form.BootstrapFormRenderer,
    clover.ui.form.FormRenderer);
goog.addSingletonGetter(clover.ui.form.BootstrapFormRenderer);


/**
 * Bootstrap provides simple markup and styles for four styles of common web
 * forms.
 * @type {object}
 */
clover.ui.form.BootstrapFormRenderer.FormClassName = {
  /** Stacked, left-aligned labels over controls. */
  VERTICAL: goog.getCssName('form-vertical'),
  /** Left-aligned label and inline-block controls for compact style. */
  HORIZONTAL: goog.getCssName('form-horizontal'),
  /** Extra-rounded text input for a typical search aesthetic. */
  INLINE: goog.getCssName('form-inline'),
  /** Float left, right-aligned labels on same line as controls. */
  SEARCH: goog.getCssName('form-search')
};


/**
 * @const
 * @type {string}
 */
clover.ui.form.BootstrapFormRenderer.CSS_CLASS = '';


/** @override */
clover.ui.form.BootstrapFormRenderer.prototype.getCssClass = function() {
  return clover.ui.form.BootstrapFormRenderer.CSS_CLASS;
};


/** @override */
clover.ui.form.BootstrapFormRenderer.prototype.getClassNames = function(form) {
  var type;
  switch (type = form.getFormType()) {
    case clover.ui.form.Form.FormType.VERTICAL:
      return clover.ui.form.BootstrapFormRenderer.FormClassName.VERTICAL;
    case clover.ui.form.Form.FormType.HORIZONTAL:
      return clover.ui.form.BootstrapFormRenderer.FormClassName.HORIZONTAL;
    case clover.ui.form.Form.FormType.INLINE:
      return clover.ui.form.BootstrapFormRenderer.FormClassName.INLINE;
    case clover.ui.form.Form.FormType.SEARCH:
      return clover.ui.form.BootstrapFormRenderer.FormClassName.SEARCH;
    default:
      throw Error('Invalied form type: ' + type);
  }
};


goog.ui.registry.setDefaultRenderer(
    clover.ui.form.Form, clover.ui.form.BootstrapFormRenderer);
