// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for form modules.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.FormRenderer');

goog.require('clover.ui.RendererContentHelper');
goog.require('clover.ui.form.FieldSet');
goog.require('goog.array');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classes');
goog.require('goog.object');
goog.require('goog.ui.registry');



/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
clover.ui.form.FormRenderer = function() {
  this.helper = new clover.ui.RendererContentHelper(this, true);
};
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


/**
 * Default implementation of {@code decorate} for {@link goog.ui.Component}s.
 * Decorates the element with the component, and attempts to decorate its child
 * elements.  Returns the decorated element.
 * @param {goog.ui.Component} component Component to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
clover.ui.form.FormRenderer.prototype.decorate = function(component, element) {
  // Set the component's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    component.setId(element.id);
  }

  // Configure the component's state based on the CSS class names it has.
  var baseClass = this.getCssClass();
  var hasBaseClass = false;

  if (!hasBaseClass) {
    // Make sure the component's root element has the renderer's own CSS class.
    goog.dom.classes.add(element, baseClass);
  }

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

  // Decorate the element's children, if applicable.  This should happen after
  // the component's own state has been initialized, since how children are
  // decorated may depend on the state of the component.
  this.decorateChildren(component, this.getContentElement(element));
  return element;
};


/**
 * Takes a component and an element that may contain child elements, decorates
 * the child elements, and adds the corresponding components to the component
 * as child components.  Any non-element child nodes (e.g. empty text nodes
 * introduced by line breaks in the HTML source) are removed from the element.
 * @param {goog.ui.Container} component Container whose children are to be
 *     discovered.
 * @param {Element} element Element whose children are to be decorated.
 * @param {Element=} opt_firstChild the first child to be decorated.
 * @suppress {visibility} setElementInternal
 */
clover.ui.form.FormRenderer.prototype.decorateChildren = function(component,
    element, opt_firstChild) {
  if (element) {
    var node = opt_firstChild || element.firstChild, next;
    // Tag soup HTML may result in a DOM where siblings have different parents.
    while (node && node.parentNode == element) {
      // Get the next sibling here, since the node may be replaced or removed.
      next = node.nextSibling;
      if (node.nodeType == goog.dom.NodeType.ELEMENT) {
        // Decorate element node.
        var child = this.getDecoratorForChild(/** @type {Element} */(node));
        if (child) {
          // addChild() may need to look at the element.
          child.setElementInternal(/** @type {Element} */(node));
          // If the component is disabled, mark the child disabled too.  See
          // bug 1263729.  Note that this must precede the call to addChild().
          if (!component.isEnabled()) {
            child.setEnabled(false);
          }
          component.addChild(child);
          child.decorate(/** @type {Element} */(node));
        }
      } else if (!node.nodeValue || goog.string.trim(node.nodeValue) == '') {
        // Remove empty text node, otherwise madness ensues (e.g. controls that
        // use goog-inline-block will flicker and shift on hover on Gecko).
        element.removeChild(node);
      }
      node = next;
    }
  }
};


/** @override */
clover.ui.form.FormRenderer.prototype.getDecoratorForChild = function(element) {
  return goog.ui.registry.getDefaultRenderer(element);
};
