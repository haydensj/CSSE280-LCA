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
	const curMajor = new mdc.textField.MDCTextField(document.querySelector('.curMajor'));
	const gradYear = new mdc.textField.MDCTextField(document.querySelector('.gradYear'));
	const nonRhEmail = new mdc.textField.MDCTextField(document.querySelector('.nonRhEmail'));
	const hAddr = new mdc.textField.MDCTextField(document.querySelector('.hAddr'));
	const state = new mdc.textField.MDCTextField(document.querySelector('.state'));
	const city = new mdc.textField.MDCTextField(document.querySelector('.city'));
	const zipCode = new mdc.textField.MDCTextField(document.querySelector('.zipCode'));
	const bDay = new mdc.textField.MDCTextField(document.querySelector('.bDay'));
	const pNum = new mdc.textField.MDCTextField(document.querySelector('.pNum'));
	const tSize = new mdc.textField.MDCTextField(document.querySelector('.tSize'));

	const nfName = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nfName'));
	const nlName = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nlName'));
	const nrhEmail = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nrhEmail'));
	const ncurPos = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ncurPos'));
	const ntkNum = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ntkNum'));
	const ncurMajor = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ncurMajor'));
	const ngradYear = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ngradYear'));
	const nnonRhEmail = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nnonRhEmail'));
	const nhAddr = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nhAddr'));
	const nstate = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nstate'));
	const ncity = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ncity'));
	const nzipCode = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nzipCode'));
	const nbDay = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.nbDay'));
	const npNum = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.npNum'));
	const ntSize = new mdc.notchedOutline.MDCNotchedOutline(document.querySelector('.ntSize'));
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(rh.enableTextFields);
});