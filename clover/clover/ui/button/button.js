// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for Button module. The module borrow
 *    urmuzov/closure-bootstrap's bootstrap.Button.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.button.Button');

goog.require('bootstrap.Button');
goog.require('bootstrap.ButtonRenderer');
goog.require('goog.ui.registry');



/**
 * A button control, rendered as a native browser button styled with Twitter
 * Bootstrap.
 *
 * @param {goog.ui.ControlContent} content Text caption or existing DOM
 *    structure to display as the button's caption.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *    decorate the button; defaults to {@link bootstrap.ButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM hepler, used for
 *    document interaction.
 * @constructor
 * @extends {bootstrap.Button}
 */
clover.ui.button.Button = function(content, opt_renderer, opt_domHelper) {
  goog.base(this, content, opt_renderer ||
      goog.ui.registry.getDefaultRenderer(this.constructor), opt_domHelper);
};
goog.inherits(clover.ui.button.Button, bootstrap.Button);


/**
 * Button sizes.
 * @enum {string}
 */
clover.ui.button.Button.Size = bootstrap.Button.Size;


/**
 * Button kinds.
 * @enum {string}
 */
clover.ui.Button.Kind = bootstrap.Button.Kind;


goog.ui.registry.setDefaultRenderer(clover.ui.button.Button,
    bootstrap.ButtonRenderer);
