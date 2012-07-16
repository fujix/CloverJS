// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for content management helpers.
 * These classes provide easy and unified component-to-renderer contents access.
 *
 * For example, your class inherits {@link goog.ui.Control}, and the class has
 * some elements such as a caption or help message. Then you may implement too
 * many methods such as below (** is your content name) if you want to use an
 * implementation pattern in common with {@link goog.ui.Control} and {@link
 * goog.ui.ControlRenderer}. It is not desirable.
 *
 * <ul>
 * <li> Component class
 * <ul>
 *   <li> get**Content() => content
 *   <li> get**ContentElement() => element
 *   <li> set**Content(content)
 *   <li> set**ContentInternal(content)
 * </ul>
 * <li> Renderer class
 * <ul>
 *   <li> get**ContentElement(element) => element
 *   <li> set**Content(element, content)
 * </ul>
 * </ul>
 * * content := {Array|Node|NodeList|string|null}
 * ** element := Element
 *
 * <pre>var componentHelper = new clover.ui.ComponentContentHelper(this)</pre>
 * <pre>var rendererHelper = new clover.ui.RendererContentHelper(this)</pre>
 * <ul>
 * <li> Component content helper
 * <ul>
 *   <li> componentHelper.getContent(content_name) => content
 *   <li> componentHelper.getContentElement(content_name) => element
 *   <li> componentHelper.setContent(content, content_name)
 *   <li> componentHelper.setContentInternal(content, content_name)
 * </ul>
 * <li> Renderer content helper
 * <ul>
 *   <li> rendererHelper.getContentElement(element, content_name) => element
 *   <li> rendererHelper.setContent(element, content, content_name)
 * </ul>
 * </ul>
 *
 * Additinary you should override your component and renderer or give true to
 * 2nd parameter of helper's constructor.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.ComponentContentHelper');
goog.provide('clover.ui.RendererContentHelper');

goog.require('goog.Disposable');



/**
 * Component-side content management helper.
 * The class provide easy and unified component-to-renderer contents access.
 *
 * USAGE:
 * <pre>var componentHelper = new clover.ui.ComponentContentHelper(this)</pre>
 * <ul>
 * <li> componentHelper.getContent(content_name) => content
 * <li> componentHelper.getContentElement(content_name) => element
 * <li> componentHelper.setContent(content, content_name)
 * <li> componentHelper.setContentInternal(content, content_name)
 * </ul>
 * @constructor
 * @param {*} component Component like instance. The instance MUST has 4 methods
 *     (getContent, getContentElement, setContent, setContentInternal).
 * @param {boolean=} opt_allowOverride Whether allow override methods in the
 *     components prototype of given component instance to methods of this
 *     helper. You should override manually.
 * @extends {goog.Disposable}
 */
clover.ui.ComponentContentHelper = function(component, opt_allowOverride) {
  goog.base(this);

  if (component.getContent) {
    this.getContent_ = goog.bind(component.getContent, component);
  }
  if (component.getContentElement) {
    this.getContentElement_ = goog.bind(component.getContentElement, component);
  }
  if (component.setContent) {
    this.setContent_ = goog.bind(component.setContent, component);
  }
  if (component.setContentInternal) {
    this.setContentInternal_ = goog.bind(
        component.setContentInternal, component);
  }

  this.component_ = component;
  this.contentMap_ = {};
  if (opt_allowOverride) this.overrideMethods();
};
goog.inherits(clover.ui.ComponentContentHelper, goog.Disposable);


/**
 * @type {*}
 * @private
 */
clover.ui.ComponentContentHelper.prototype.component_ = null;


/**
 * @type {Object}
 * @private
 */
clover.ui.ComponentContentHelper.prototype.contentMap_ = null;


/**
 * Text caption or DOM structure displayed in the component.
 * @type {Array|Node|NodeList|string|null}
 * @private
 */
clover.ui.ComponentContentHelper.prototype.content_ = null;


/**
 * Borrowed method from given component.
 * @return {Array|Node|NodeList|string|null} Text caption or DOM structure
 *     comprising the component's contents. Returns null if the content name
 *     is not found in the registry.
 * @private
 */
clover.ui.ComponentContentHelper.prototype.getContent_ = function() {
  return this.content_;
};


/**
 * Borrowed method from given component.
 * @return {Element} Element to contain child elements (null if none).
 * @private
 */
clover.ui.ComponentContentHelper.prototype.getContentElement_ = function() {
  var renderer = this.getRenderer();
  var element = this.getElement();
  var contentElement = renderer.getContentElement(element);
  return contentElement;
};


/**
 * Borrowed method from given component.
 * @param {Array|Node|NodeList|string|null} content Text caption or DOM
 *     structure to set as the component's contents.
 * @private
 */
clover.ui.ComponentContentHelper.prototype.setContent_ = function(content) {
  var renderer = this.getRenderer();
  var element = this.getElement();
  renderer.setContent(element, content);
  this.setContentInternal(content);
};


/**
 * Borrowed method from given component.
 * @param {Array|Node|NodeList|string|null} content Text caption or DOM
 *     structure to set as the component's contents.
 * @private
 */
clover.ui.ComponentContentHelper.prototype.setContentInternal_ = function(
    content) {
  this.content_ = content;
};


/** @override */
clover.ui.ComponentContentHelper.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.contentMap_;
  delete this.component_;
  this.recoveryMethods();
  delete this.content_;
  delete this.getContent_;
  delete this.getContentElement_;
  delete this.setContent_;
  delete this.setContentInternal_;
};


/**
 * Returns the renderer used by this component to render itself or to decorate
 * an existing element.
 * @return {*} Renderer used by the component (undefined if none).
 * @protected
 */
clover.ui.ComponentContentHelper.prototype.getRenderer = function() {
  return this.component_.getRenderer();
};


/**
 * Gets the component's element.
 * @return {Element} The element for the component.
 * @protected
 */
clover.ui.ComponentContentHelper.prototype.getElement = function() {
  return this.component_.getElement();
};


/**
 * Returns the text caption or DOM structure displayed in the component by given
 * content name. Returns a result by getContent, if content name is
 * not given.
 *
 * @param {string=} opt_contentName Content name. Returns default content if the
 *     value is undefined.
 * @return {Array|Node|NodeList|string|null} Text caption or DOM structure
 *     comprising the component's contents. Returns null if the content name is
 *     not found in the registry.
 */
clover.ui.ComponentContentHelper.prototype.getContent = function(
    opt_contentName) {
  if (opt_contentName) {
    return this.contentMap_[opt_contentName] || null;
  } else {
    return this.getContent_.call(this.component_, opt_contentName);
  }
};


/**
 * Returns the DOM element into which child components are to be rendered by
 * given content name, or null if the control itself hasn't been rendered yet.
 * Overrides {@link goog.ui.Component#getContentElement} by delegating to the
 * renderer.
 * @param {string=} opt_contentName Content name. Returns default content
 *     element if the value is undefined.
 * @return {Element} Element to contain child elements (null if none).
 */
clover.ui.ComponentContentHelper.prototype.getContentElement = function(
    opt_contentName) {
  if (opt_contentName) {
    return this.getRenderer().getContentElement(
        this.getElement(), opt_contentName);
  } else {
    return this.getContentElement_.call(this.component_, opt_contentName);
  }
};


/**
 * Sets the component's content to the given text caption, element, or array of
 * nodes.  (If the argument is an array of nodes, it must be an actual array,
 * not an array-like object.)
 * @param {Array|Node|NodeList|string|null} content Text caption or DOM
 *     structure to set as the component's contents.
 * @param {string=} opt_contentName Content name.
 */
clover.ui.ComponentContentHelper.prototype.setContent = function(
    content, opt_contentName) {
  if (arguments.length === 2) {
    // Controls support pluggable renderers and should overrided setContent()
    // with RendererContentHelper's method; delegate to the renderer.
    this.getRenderer().setContent(this.getElement(), content, opt_contentName);

    // setContentInternal needs to be after the renderer, since the
    // implementation may depend on the content being in the DOM.
    this.setContentInternal(content, opt_contentName);
  } else {
    this.setContent_.call(this.component_, content, opt_contentName);
  }
};


/**
 * Sets the component's content to the given text caption, element, or array
 * of nodes.  Unlike {@link #setContent}, doesn't modify the component's DOM.
 * Called by renderers during element decoration.  Considered protected; should
 * only be used within this package and by subclasses.
 * @param {Array|Node|NodeList|string|null} content Text caption or DOM
 *     structure to set as the component's contents.
 * @param {string=} opt_contentName Content name.
 */
clover.ui.ComponentContentHelper.prototype.setContentInternal = function(
    content, opt_contentName) {
  if (arguments.length === 2) {
    this.contentMap_[opt_contentName] = content;
  } else {
    this.setContentInternal_.call(this.component_, content, opt_contentName);
  }
};


/**
 * Overrides 4 methods (getContent, getContentElement, setContent,
 * setContentInternal).
 * @protected
 */
clover.ui.ComponentContentHelper.prototype.overrideMethods = function() {
  this.component_.getContent = goog.bind(
      this.getContent, this);
  this.component_.getContentElement = goog.bind(
      this.getContentElement, this);
  this.component_.setContent = goog.bind(
      this.setContent, this);
  this.component_.setContentInternal = goog.bind(
      this.setContentInternal, this);
};


/**
 * Recovery original 4 methods (getContent, getContentElement, setContent,
 * setContentInternal).
 * @protected
 */
clover.ui.ComponentContentHelper.prototype.recoveryMethods = function() {
  this.component_.getContent = this.getContent_;
  this.component_.getContentElement =
      this.getContentElement_;
  this.component_.setContent = this.setContent_;
  this.component_.setContentInternal =
      this.setContentInternal_;
};



/**
 * Renderer-side content management helper.
 * The class provide easy and unified renderer-to-renderer contents access.
 *
 * USAGE:
 * <pre>var rendererHelper = new clover.ui.RendererContentHelper(this)</pre>
 * <ul>
 *   <li> rendererHelper.getContentElement(content_name, element) => element
 *   <li> rendererHelper.setContent(content_name, element, content)
 * </ul>
 * @constructor
 * @param {*} renderer Renderer like instance. The instance MUST has 4 methods
 *     (getContent, getContentElement, setContent, setContentInternal).
 * @param {boolean=} opt_allowOverride Whether allow override methods in the
 *     renderers prototype of given renderer instance to methods of this
 *     helper. You should override manually.
 * @extends {goog.Disposable}
 */
clover.ui.RendererContentHelper = function(renderer, opt_allowOverride) {
  goog.base(this);

  if (renderer.getContentElement) {
    this.getContentElement_ = goog.bind(renderer.getContentElement, renderer);
  }
  if (renderer.setContent) {
    this.setContent_ = goog.bind(renderer.setContent, renderer);
  }

  this.renderer_ = renderer;
  this.contentSetterMap_ = {};
  this.contentElementGetterMap_ = {};
  if (opt_allowOverride) this.overrideMethods();
};
goog.inherits(clover.ui.RendererContentHelper, goog.Disposable);


/**
 * @type {*}
 * @private
 */
clover.ui.RendererContentHelper.prototype.renderer_ = null;


/**
 * @type {Object.<Function>}
 * @private
 */
clover.ui.RendererContentHelper.prototype.contentSetterMap_ = null;


/**
 * @type {Object.<Function>}
 * @private
 */
clover.ui.RendererContentHelper.prototype.contentElementGetterMap_ = null;


/**
 * Borrowed method from given renderer.
 * @param {Element} element Root element of the control whose content element
 *     is to be returned.
 * @return {Element} Element to contain child elements (null if none).
 * @private
 */
clover.ui.RendererContentHelper.prototype.getContentElement_ = function(
    element) {
  return element;
};


/**
 * Borrowed method from given renderer.
 * @param {Element} element The control's root element.
 * @param {Array|Node|NodeList|string|null} content Text caption or DOM
 *     structure to set as the renderer's contents.
 * @private
 */
clover.ui.RendererContentHelper.prototype.setContent_ = function(
    element, content) {
  goog.dom.append(element, content);
};


/** @override */
clover.ui.RendererContentHelper.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.contentMap_;
  delete this.renderer_;
  this.recoveryMethods();
  delete this.getContentElement_;
  delete this.setContent_;
};


/**
 * Sets content element getter that used in {@link #getContentElement}.
 * @param {string=} opt_contentName Content name.
 * @param {Function} fn Content setter that takes a root element contains the
 *     content and returns the parent element of the control's contents.
 */
clover.ui.RendererContentHelper.prototype.addContentElementGetter = function(
    opt_contentName, fn) {
  this.contentElementGetterMap_[opt_contentName] = fn;
};


/**
 * Takes the control's root element and returns the parent element of the
 * control's contents.  Since by default controls are rendered as a single
 * DIV, the default implementation returns the element itself.  Subclasses
 * with more complex DOM structures must override this method as needed.
 * @param {Element} element Root element of the control whose content element
 *     is to be returned.
 * @param {string=} opt_contentName Content name.
 * @return {Element} The control's content element.
 */
clover.ui.RendererContentHelper.prototype.getContentElement = function(
    element, opt_contentName) {
  if (opt_contentName) {
    var getter = this.contentElementGetterMap_[opt_contentName];
    return getter ? getter.call(this.renderer_, element) : null;
  } else {
    return this.getContentElement_(element, opt_contentName);
  }
};


/**
 * Sets content stter that used in {@link #setContent}.
 * @param {string=} opt_contentName Content name.
 * @param {Function} fn Content setter that takes a content by given name and
 *     sets its content to the given text caption or DOM structure.
 */
clover.ui.RendererContentHelper.prototype.addContentSetter = function(
    opt_contentName, fn) {
  this.contentSetterMap_[opt_contentName] = fn;
};


/**
 * Takes a control's root element, and sets its content to the given text
 * caption or DOM structure.  The default implementation replaces the children
 * of the given element.  Renderers that create more complex DOM structures
 * must override this method accordingly.
 * @param {Element} element The control's root element.
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to be
 *     set as the control's content. The DOM nodes will not be cloned, they
 *     will only moved under the content element of the control.
 * @param {?string=} opt_contentName Content name.
 */
clover.ui.RendererContentHelper.prototype.setContent = function(
    element, content, opt_contentName) {
  if (opt_contentName) {
    var setter = this.contentSetterMap_[opt_contentName];
    if (setter) setter.call(this.renderer_, element, content);
  } else {
    this.setContent_(element, content, opt_contentName);
  }
};


/**
 * Overrides 4 methods (getContent, getContentElement, setContent,
 * setContentInternal).
 * @protected
 */
clover.ui.RendererContentHelper.prototype.overrideMethods = function() {
  this.renderer_.getContentElement = goog.bind(
      this.getContentElement, this);
  this.renderer_.setContent = goog.bind(
      this.setContent, this);
};


/**
 * Recovery original 4 methods (getContent, getContentElement, setContent,
 * setContentInternal).
 * @protected
 */
clover.ui.RendererContentHelper.prototype.recoveryMethods = function() {
  this.renderer_.getContentElement =
      this.getContentElement_;
  this.renderer_.setContent = this.setContent_;
};
