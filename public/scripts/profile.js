/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.enableTextFields = function () {
	const fName = new mdc.textField.MDCTextField(document.querySelector('.fName'));
	const lName = new mdc.textField.MDCTextField(document.querySelector('.lName'));
	const rhEmail = new mdc.textField.MDCTextField(document.querySelector('.rhEmail'));
	const curPos = new mdc.textField.MDCTextField(document.querySelector('.curPos'));
	const tkNum = new mdc.textField.MDCTextField(document.querySelector('.tkNum'));

	const nfName = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nfName'));
	const nlName = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nlName'));
	const nrhEmail = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nrhEmail'));
	const ncurPos = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ncurPos'));
	const ntkNum = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ntkNum'));
}

/* Main */
$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		rh.enableTextFields();
	});
});