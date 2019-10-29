/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.enableTextFields = function () {
	const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
	const notchedOutline = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.mdc-notched-outline'));
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	rh.enableTextFields();
});