/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.enableTabs = function () {
	const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
	const tab = new mdc.tab.MDCTab(document.querySelector('.mdc-tab'));
}

rh.enableTextFields = function () {
	const selectorNames = [
		"volOne0",
		"volTwo0",
		"volOne1",
		"volTwo1"
	];
	selectorNames.forEach((selectorName) => {
		new mdc.textField.MDCTextField(document.querySelector("." + selectorName));
		new mdc.notchedOutline.MDCNotchedOutline(document.querySelector("#n" + selectorName));
	});
}


$(document).ready(() => {
	console.log("Ready");
	rh.initialize((params) => {
		rh.enableTabs();
		rh.enableTextFields();
	});
});