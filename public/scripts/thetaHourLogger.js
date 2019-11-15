/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.enableTextFields = function () {
	const selectorNames = [
		"fName",
		"tkNum",
		"cHours",
		"lHours"
	];
	selectorNames.forEach((selectorName) => {
		new mdc.textField.MDCTextField(document.querySelector("." + selectorName));
		new mdc.notchedOutline.MDCNotchedOutline(document.querySelector("#n" + selectorName));
	});
}


$(document).ready(() => {
	console.log("Ready");
	rh.initialize((params) => {
		rh.enableTextFields();
	});
});