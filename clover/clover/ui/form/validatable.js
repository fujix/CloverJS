// This script licensed under the MIT.
// http://orgachem.mit-license.org

/**
 * @fileoverview Script for validatable object.
 * @author orga.chem.job@gmail.com (Orga Chem)
 */

goog.provide('clover.ui.form.Validatable');



/**
 * Validatable objct.
 * For example input element that has a format.
 * @typedef {clover.ui.form.Form|clover.ui.form.FieldSet|clover.ui.form.Input|
 *     clover.format.Format}
 */
clover.ui.form.Validatable;


/**
 * Validates given object. Returns true, if the object returns true or the
 * object does'n have a isValied() method. Otherwise false.
 * @param {clover.ui.form.Validatable} validatable Object to validate.
 * @return {boolean} Whther given object is valied or not validatable.
 */
clover.ui.form.Validatable.isValied = function(validatable) {
  return validatable.isValied ? validatable.isValied() : true;
};
