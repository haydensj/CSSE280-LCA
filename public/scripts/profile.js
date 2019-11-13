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
		"lName",
		"rhEmail",
		"curPos",
		"tkNum",
		"curMajor",
		"gradYear",
		"nonRhEmail",
		"hAddr",
		"state",
		"city",
		"zipCode",
		"bDay",
		"pNum",
		"tSize"
	];
	selectorNames.forEach((selectorName) => {
		new mdc.textField.MDCTextField(document.querySelector("." + selectorName));
		new mdc.notchedOutline.MDCNotchedOutline(document.querySelector("#n" + selectorName));
	});
}

rh.fillTextFields = (member) => {
	console.log("Hello");
	document.querySelector("#nfName").value = member.fullName;
	document.querySelector("#nlName").value = member.fullName;
	document.querySelector("#nrhEmail").value = member.roseEmail;
	document.querySelector("#ncurPos").value = "";
	document.querySelector("#ntkNum").value = member.TKNumber;
	document.querySelector("#ncurMajor").value = member.major;
	document.querySelector("#ngradYear").value = member.graduationYear;
	document.querySelector("#nnonRhEmail").value = member.alternateEmail;
	document.querySelector("#nhAddr").value = member.address.street;
	document.querySelector("#nstate").value = member.address.stateAbbreviation;
	document.querySelector("#ncity").value = member.address.city;
	document.querySelector("#nzipCode").value = member.address.zip;
	document.querySelector("#nbDay").value = member.birthday;
	document.querySelector("#npNum").value = member.phoneNumber;
	document.querySelector("#ntSize").value = member.tShirtSize;
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		rh.enableTextFields();
		const membersController = new rh.Fb.MembersController();
		membersController.beginListening(() => {
			const member = membersController.getMemberWithUsername(rh.authManager.uid);
			console.log(member);
			rh.fillTextFields(member);
		});
	});
});