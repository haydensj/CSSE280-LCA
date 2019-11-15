/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.SELECTOR_NAMES = [
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

rh.enableTextFields = function () {
	rh.SELECTOR_NAMES.forEach((selectorName) => {
		new mdc.textField.MDCTextField($("." + selectorName)[0]);
		// new mdc.textField.MDCTextField($("label[for=n" + selectorName + "]")[0]);
		new mdc.notchedOutline.MDCNotchedOutline($("#n" + selectorName)[0]);
	});
}

rh.fillTextFields = (member) => {
	$("#nfName").val(member.fullName);
	$("#nlName").val(member.fullName);
	$("#nrhEmail").val(member.roseEmail);
	$("#ncurPos").val("");
	$("#ntkNum").val(member.TKNumber);
	$("#ncurMajor").val(member.major);
	$("#ngradYear").val(member.graduationYear);
	$("#nnonRhEmail").val(member.alternateEmail);
	$("#nhAddr").val(member.address.street);
	$("#nstate").val(member.address.stateAbbreviation);
	$("#ncity").val(member.address.city);
	$("#nzipCode").val(member.address.zip);
	$("#nbDay").val(member.birthday);
	$("#npNum").val(member.phoneNumber);
	$("#ntSize").val(member.tShirtSize);

	rh.SELECTOR_NAMES.forEach((name) => {

		if ($(`#n${name}`).value != "") {
			$(`label[for=n${name}]`).addClass("mdc-floating-label--float-above");
			$(`label[for=n${name}]`).addClass("mdc-notched-outline--notcheds");
			$(`.${name} > .mdc-notched-outline--upgraded`).addClass("mdc-notched-outline--notched");
			const width = $(`.${name} .mdc-notched-outline__notch`).width() * 0.78;
			$(`.${name} .mdc-notched-outline__notch`).width(width);
		} else {
			$(`#n${name}`).value = "";
		}
	})
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