// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for input renderer.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.ControlGroupRenderer');

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.a11y');
goog.require('goog.dom.classes');
goog.require('goog.ui.ControlRenderer');


/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
clover.ui.form.ControlGroupRenderer = function() {
  goog.base(this);
};
goog.inherits(clover.ui.form.ControlGroupRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(clover.ui.form.ControlGroupRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
clover.ui.form.ControlGroupRenderer.CSS_CLASS = goog.getCssName('clover-input');


/** 
 * Returns default CSS class to be applied to the label element of components
 * rendered by this renderer.
 * @return {string} Default CSS class.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getLabelClass = function() {
  return goog.getCssName('clover-input-label');
};


/** 
 * Returns default CSS class to be applied to the block help element of
 * components rendered by this renderer.
 * @return {string} Default CSS class.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getBlockHelpClass = function() {
  return goog.getCssName('clover-input-help-block');
};


/** 
 * Returns default CSS class to be applied to the inline help element of
 * components rendered by this renderer.
 * @return {string} Default CSS class.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getInlineHelpClass = function() {
  return goog.getCssName('clover-input-help-inline');
};


/** 
 * Returns default CSS class to be applied to the content element of components
 * rendered by this renderer.
 * Content element is a wrapper element has a child component DOM.
 * @return {string} Default CSS class.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getContentClass = function() {
  return goog.getCssName('clover-input-content');
};


/** @override */
clover.ui.form.ControlGroupRenderer.prototype.getCssClass = function() {
  return clover.ui.form.ControlGroupRenderer.CSS_CLASS;
};


/**
 * Default implementation of {@code decorate} for {@link
 * clover.ui.form.ControlGroup}s. Decorates the element with the input, and
 * attempts to decorate its child elements.  Returns the decorated element.
 * The method expect a DOM structure below.
 *
 * <ul>
 *  <li>div
 *  <ul>
 *   <li>label
 *   <li>div
 *   <ul>
 *    <li>input
 *    <li>..
 *   </ul>
 *  </ul>
 * </ul>
 *
 * @param {clover.ui.form.Form} component Component to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
clover.ui.form.ControlGroupRenderer.prototype.decorate = function(
    component, element) {
  var dom = component.getDomHelper();
  goog.dom.classes.add(element, this.getCssClass());
  var label = this.getLabelContentElement(element);
  goog.dom.classes.add(label, this.getLabelClass());
  if (label) component.setLabelContent(label);

  var inlineHelp = this.getInlineHelpContentElement(element);
  if (inlineHelp) {
    component.setInlineHelpContent(goog.dom.getChildren(inlineHelp));
  }

  var blockHelp = this.getBlockHelpContentElement(element);
  if (blockHelp) {
    component.setBlockHelpContent(goog.dom.getChildren(blockHelp));
  }

  var content = this.getContentElement(element);
  goog.dom.classes.add(content, this.getContentClass());

  return goog.base(this, 'decorate', component, element);
};


/**
 * Inspects the element, and creates an instance of {@link goog.ui.Control} or
 * an appropriate subclass best suited to decorate it.  Returns the control (or
 * null if no suitable class was found).  This default implementation uses the
 * element's CSS class to find the appropriate control class to instantiate.
 * May be overridden in subclasses.
 * @param {Element} element Element to decorate.
 * @return {clover.ui.form.Control?} A new control suitable to decorate the
 *     element (null if none).
 * @override
 */
clover.ui.form.ControlGroupRenderer.prototype.getDecoratorForChild = function(
    ) {
  return (/** @type {clover.ui.form.Control} */
      goog.ui.registry.getDecorator(element));
};


/** @override */
clover.ui.form.ControlGroupRenderer.prototype.getContentElement = function(
    element) {
  return goog.dom.getElementsByTagNameAndClass(
      goog.dom.TagName.DIV, this.getContentClass(), element)[0];
};


/**
 * Returns a label element by given element.
 * @param {Element} element Element to get label element.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getLabelContentElement = function(
    element) {
  return goog.dom.getElementsByTagNameAndClass(
      goog.dom.TagName.LABEL, this.getLabelClass(), element)[0];
};


/**
 * Returns a element of label content by given element.
 * @param {Element} element Element to get label element.
 * @param {clover.ui.form.LabelContent} content Content to set into the label.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.setLabelContent = function(
    element, content) {
  goog.dom.append(element, content);
};


/**
 * Returns a element of label content by given element.
 * @param {Element} element Element to get label element.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getLabelContent = function(
    element) {
  return element;
};


/**
 * Returns a block help element from given element.
 * @param {Element} element An element that contains a block help element.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getBlockHelpContentElement =
    function(element) {
  return goog.dom.getElementsByTagNameAndClass(
      goog.dom.TagName.P, this.getBlockHelpClass(), element)[0] || null;
};


/**
 * Returns an block help content element from given element.
 * @param {Element} element A block help element.
 * @param {clover.ui.form.BlockHelpContent} content Content to set the element.
 */
clover.ui.form.ControlGroupRenderer.prototype.setBlockHelpContent = function(
    element, content) {
  var contentElement = this.getBlockHelpContentElement(element);
  goog.dom.append(contentElement, content);
};


/**
 * Returns a inline help element from given element.
 * @param {Element} element An element that contains an inline help element.
 * @return {Element} The block help element.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.getInlineHelpContentElement =
    function(element) {
  return goog.dom.getElementsByTagNameAndClass(
      goog.dom.TagName.SPAN, this.getInlineHelpClass(), element)[0] || null;
};


/**
 * Returns an inline help content element from given element.
 * @param {Element} element A inline help element.
 * @param {clover.ui.form.BlockHelpContent} content Content to set the element.
 */
clover.ui.form.ControlGroupRenderer.prototype.setInlineHelpContent = function(
    element, content) {
  var contentElement = this.getInlineHelpContentElement(element);
  goog.dom.append(contentElement, content);
};


/** @override */
clover.ui.form.ControlGroupRenderer.prototype.createDom = function(
    component) {
  var dom = component.getDomHelper();

  var content = dom.createDom(goog.dom.TagName.DIV, this.getContentClass());

  var input = this.createInputElement();
  dom.append(content, input);

  var inlineHelpContent = component.getInlineHelpContent();
  if (inlineHelpContent) {
    var inlineHelp = this.createInlineHelpContentElement(
        dom, inlineHelpContent);
    dom.append(content, inlineHelp);
  }

  var blockHelpContent = component.getBlockHelpContent();
  if (blockHelpContent) {
    var blockHelp = this.createBlockHelpContentElement(dom, blockHelpContent);
    dom.append(content, blockHelp);
  }

  var label = dom.createDom(
      goog.dom.TagName.LABEL, this.getLabelClass(), component.getLabel());

  var element = dom.createDom(
      goog.dom.TagName.DIV, this.getClassNames(component).join(' '),
      null, label, content);
  return element;
};


/**
 * Returns a block help content element.
 * @param {goog.dom.DomHelper} dom Dom helper.
 * @param {clover.ui.form.BlockHelpContent} content Content to set a block help.
 * @return {Element} The created element. 
 */
clover.ui.form.ControlGroupRenderer.prototype.createBlockHelpContentElement =
    function(dom, content) {
  return dom.createDom(
          /* tag name    */ goog.dom.TagName.P,
          /* attributes? */ this.getBlockHelpClass(),
          /* appendables */ content);
};


/**
 * Returns a inline help content element.
 * @param {goog.dom.DomHelper} dom Dom helper.
 * @param {clover.ui.form.InlineHelpContent} content Content to set a inline
 *     help.
 * @return {Element} The created element. 
 */
clover.ui.form.ControlGroupRenderer.prototype.createInlineHelpContentElement =
    function(dom, content) {
  return dom.createDom(
          /* tag name    */ goog.dom.TagName.SPAN,
          /* attributes? */ this.getInlineHelpClass(),
          /* appendables */ content);
};


/**
 * Change component style to confirmed mode. Maybe the input element is under
 * confirmed mode, the input is uneditable but not looks liked disable.
 * @param {clover.ui.form.ControlGroup} component A input component to confirm.
 * @param {boolean} confirmed Whether the component will be confirmed.
 */
clover.ui.form.ControlGroupRenderer.prototype.setConfirmed = function(
    component, confirmed) {
};


/**
 * Sets a block content of help for the input.
 * @param {clover.ui.form.ControlGroup} component An input component to add the
 *     help.
 * @param {clover.ui.form.BlockHelpContent} content The block content of help
 *     for input.
 */
clover.ui.form.ControlGroupRenderer.prototype.setBlockHelpContent = function(
    component, content) {
  var dom = component.getDomHelper();
  var element = component.getBlockHelpContentElement();
  if (content) {
    if (element) {
      dom.removeChildren(element);
      dom.append(element, content);
    } else {
      element = this.createBlockHelpContentElement(dom, content);
      dom.append(component.getContentElement(), element);
      component.setBlockHelpContentElement(element);
    }
  } else if (element) {
    dom.removeNode(element)
  }
};


/**
 * Sets a inline content of help for the input.
 * @param {clover.ui.form.ControlGroup} component An input component to add the
 *     help.
 * @param {clover.ui.form.InlineHelpContent} content The inline content of help
 *     for input.
 */
clover.ui.form.ControlGroupRenderer.prototype.setInlineHelpContent = function(
    component, content) {
  var dom = component.getDomHelper();
  var element = component.getInlineHelpContentElement();
  if (content) {
    if (element) {
      dom.removeChildren(element);
      dom.append(element, content);
    } else {
      element = this.createInlineHelpContentElement(dom, content);
      dom.insertChildAt(component.getContentElement(), element, 2);
      component.setInlineHelpContentElement(element);
    }
  } else if (element) {
    dom.removeNode(element)
  }
};


/**
 * Change component style to invalid mode. Maybe the input element is under
 * invalid mode.
 * @param {clover.ui.form.ControlGroup} component A input component to confirm.
 * @param {boolean} valid Whether the component will be valid.
 * @param {?string=} opt_msg A help message that showed when the input is
 *     invalid.
 */
clover.ui.form.ControlGroupRenderer.prototype.setValid = function(
    component, valid, opt_msg) {
  var inputs = this.getInnerInputs();
  goog.dom.a11y.setState(goog.dom.a11y.State.INVALIED, !valid);
};


/**
 * Creates the lookup table of states to classes, used during state changes.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.
    createClassByControlGroupStateMap = function() {
  var state = clover.ui.form.ControlGroup.ControlGroupState;
  var baseName = this.getCssClass();


  /**
   * Map of component states to state-specific structural class names,
   * used when changing the DOM in response to a state change.  Precomputed
   * and cached on first use to minimize object allocations and string
   * concatenation.
   * @type {Object}
   * @protected
   */
  this.classByControlGroupState = goog.object.create(
        state.NORMAL, goog.getCssName(baseName, 'normal'),
        state.WARNING, goog.getCssName(baseName, 'warning'),
        state.ERROR, goog.getCssName(baseName, 'error'),
        state.SUCCESS, goog.getCssName(baseName, 'success'),
        state.UNEDITABLED, goog.getCssName(baseName, 'uneditable'),
        state.DISABLED, goog.getCssName(baseName, 'disabled')
      );
};


/**
 * Creates the lookup table of classes to states, used during decoration.
 * @protected
 */
clover.ui.form.ControlGroupRenderer.prototype.
    createControlGroupStateFromClassMap = function() {
  // We need the classByControlGroupState_ map so we can transpose it.
  if (!this.classByControlGroupState) {
    this.createClassByControlGroupStateMap();
  }

  /**
   * Map of state-specific structural class names to component states,
   * used during element decoration.  Precomputed and cached on first use
   * to minimize object allocations and string concatenation.
   * @type {Object}
   * @protected
   */
  this.controlGroupStateFromClass = goog.object.transpose(
      this.classbyControlGroupState);
};


/**
 * Takes a single {@link clover.ui.form.ControlGroup.ControlGroupState}, and
 * returns the corresponding CSS class name (null if none).
 * @param {clover.ui.form.ControlGroup.ControlGroupState} state A state of the
 *     control group.
 * @return {string} CSS class for the control group state.
 */
clover.ui.form.ControlGroupRenderer.prototype.getClassByControlGroupState =
    function(state) {
  if (!this.classByControlGroupState) {
    this.createClassByControlGroupStateMap();
  }
  return this.classByControlGroupState[state];
};


/**
 * Takes a single CSS class name which may represent a cotrol group state, and
 * returns the corresponding control group state .
 * @param {string} className CSS class for the control group state.
 * @return {clover.ui.form.ControlGroup.ControlGroupState} A state of the
 *     control group.
 */
clover.ui.form.ControlGroupRenderer.prototype.getControlGroupStateFromClass =
    function(className) {
  if (this.controlGroupStateFromClass) {
    this.createControlGroupStateFromClassMap();
  }
  return this.controlGroupStateFromClass[className];
};


/**
 * Updates the appearance of the control group in response to a state change.
 * @param {clover.ui.form.ControlGroup} component Control group instance to
 *     update.
 * @param {clover.ui.form.ControlGroup.ControlGroupState} state State to enable
 *     or disable.
 * @param {boolean} enable Whether the control is entering or exiting the state.
 */
clover.ui.form.ControlGroupRenderer.prototype.setControlGroupState =
    function(component, state) {
  var element = component.getElement();
  goog.dom.classes.addRemove(
      element, goog.object.getValues(this.classByControlGroupState),
      this.getClassByControlGroupState(state));
};
