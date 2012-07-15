// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.FormRenderer');

goog.require('clover.ui.form.FieldSet');
goog.require('goog.array');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.registry');



/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
clover.ui.form.FormRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.form.FormRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(clover.ui.form.FormRenderer);


/**
 * @const
 * @type {string}
 */
clover.ui.form.FormRenderer.CSS_CLASS = goog.getCssName('clover-form');


/**
 * Returns the CSS class to be applied to the root element of forms
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @protected
 */
clover.ui.form.FormRenderer.prototype.getCssClass = function() {
  return clover.ui.form.FormRenderer.CSS_CLASS;
};


/** @override */
clover.ui.form.FormRenderer.prototype.getClassNames = function(form) {
  var classNames = goog.base(this, 'getClassNames', form);

  return classNames.push(this.getClassForFormType(form.getFormType()));
};


/**
 * Creates the lookup table of formTypes to classes, used during formType
 * changes.
 * @private
 */
clover.ui.form.FormRenderer.prototype.createClassByFormTypeMap_ = function() {
  var type = clover.ui.form.Form.FormType;
  var baseClass = this.getCssClass();

  /**
   * Form must provides simple markup and styles for four styles of common web
   * forms.
   * @type {Object}
   * @private
   */
  this.classByFormType_ = goog.object.create(
      /** Stacked, left-aligned labels over forms. */
      type.VERTICAL, goog.getCssName(baseClass, 'vertical'),
      /** Left-aligned label and inline-block forms for compact style. */
      type.HORIZONTAL, goog.getCssName(baseClass, 'horizontal'),
      /** Extra-rounded text input for a typical search aesthetic. */
      type.INLINE, goog.getCssName(baseClass, 'inline'),
      /** Float left, right-aligned labels on same line as forms. */
      type.SEARCH, goog.getCssName(baseClass, 'search'));
};


/**
 * Sets the form's formType based on the given CSS class name, encountered
 * during decoration.  CSS class names that don't represent form formTypes
 * are ignored.  Considered protected; subclasses should override this method
 * to support more formTypes and CSS class names.
 * @param {clover.ui.form.Form} form Form to update.
 * @param {string} className CSS class name.
 * @protected
 */
clover.ui.form.FormRenderer.prototype.setFormTypeFromClassName = function(form,
    className) {
  form.setFormType(this.getFormTypeFromClass(className));
};


/**
 * Creates the lookup table of classes to formTypes, used during decoration.
 * @private
 */
clover.ui.form.FormRenderer.prototype.createFormTypeByClassMap_ = function() {
  // We need the classByFormType_ map so we can transpose it.
  if (!this.classByFormType_) {
    this.createClassByFormTypeMap_();
  }

  /**
   * Map of formType-specific structural class names to component formTypes,
   * used during element decoration.  Precomputed and cached on first use
   * to minimize object allocations and string concatenation.
   * @type {Object}
   * @private
   */
  this.formTypeByClass_ = goog.object.transpose(this.classByFormType_);
};


/** @override */
clover.ui.form.FormRenderer.prototype.getContentElement = function(element) {
  return element;
};


/**
 * Takes a single {@link clover.ui.form.Form.FormType}, and returns the
 * corresponding CSS class name (null if none).
 * @param {clover.ui.form.Form.FormType} type A type of form.
 * @return {string|undefined} CSS class representing the given formType
 *     (undefined if none).
 * @protected
 */
clover.ui.form.FormRenderer.prototype.getClassForFormType = function(type) {
  if (!this.classByFormType_) {
    this.createClassByFormTypeMap_();
  }
  return this.classByFormType_[type];
};


/**
 * Takes a single CSS class name which may represent a component formType, and
 * returns the corresponding component form type.
 * @param {string} className CSS class name, possibly representing a component
 *     formType.
 * @return {clover.ui.form.Form.FormType} formType Form type corresponding
 *     to the given CSS class.
 * @protected
 */
clover.ui.form.FormRenderer.prototype.getFormTypeFromClass = function(
    className) {
  if (!this.formTypeByClass_) {
    this.createFormTypeByClassMap_();
  }
  return this.formTypeByClass_[className];
};


/** @override */
clover.ui.form.FormRenderer.prototype.createDom = function(component) {
  var dom = component.getDomHelper();
  return dom.createDom(
      /* tag name    */ goog.dom.TagName.FORM,
      /* attributes? */ { 'method': 'POST' });
};


/** @override */
clover.ui.form.FormRenderer.prototype.canDecorate = function(element) {
  return element.tagName === goog.dom.TagName.FORM;
};


/** @override */
clover.ui.form.FormRenderer.prototype.decorate = function(component, element) {
  var classNames = goog.dom.classes.get(element);
  if (classNames) {
    goog.array.some(classNames, function(cssClass) {
      var formType = this.getFormTypeFromClass(cssClass);
      if (formType) {
        component.setFormType(formType);
        return false;
      }
    }, this);
  }
  return goog.base(this, 'decorate', component, element);
};


/** @override */
clover.ui.form.FormRenderer.prototype.getDecoratorForChild = function(element) {
  var Ctor = this.defultRenderer;
  if (Ctor) return new Ctor();
  console.log(Ctor);
  return goog.base(this, 'getDecoratorForChild', element);
};


/**
 * A default renderer for form children.
 * Sets null, if you need to get your decorator by the class.
 * @type {?clover.ui.form.FieldSet}
 */
clover.ui.form.FormRenderer.prototype.defultRenderer = clover.ui.form.FieldSet;
