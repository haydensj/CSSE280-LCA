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
		if ($(`#n${name}`).val() == "") {
			$(`#n${name}`).val("");
		} else {
			$(`label[for=n${name}]`).addClass("mdc-floating-label--float-above");
			$(`label[for=n${name}]`).addClass("mdc-notched-outline--notcheds");
			$(`.${name} > .mdc-notched-outline--upgraded`).addClass("mdc-notched-outline--notched");
			const width = $(`.${name} .mdc-notched-outline__notch`).width() * 0.78;
			$(`.${name} .mdc-notched-outline__notch`).width(width);
		}
	})
}

rh.saveMember = (member, memberController) => {
	member.fullName = $("#nfName").val();
	member.fullName = $("#nlName").val();
	member.roseEmail = $("#nrhEmail").val();
	member.TKNumber = $("#ntkNum").val();
	member.major = $("#ncurMajor").val();
	member.graduationYear = $("#ngradYear").val();
	member.alternateEmail = $("#nnonRhEmail").val();
	member.address.street = $("#nhAddr").val();
	member.address.stateAbbreviation = $("#nstate").val();
	member.address.city = $("#ncity").val();
	member.address.zip = $("#nzipCode").val();
	member.birthday = $("#nbDay").val();
	member.phoneNumber = $("#npNum").val();
	member.tShirtSize = $("#ntSize").val();

	memberController.update(member);
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		rh.enableTextFields();
		console.log(rh.authManager.uid);
		const memberController = new rh.Fb.MemberController(rh.authManager.uid);
		memberController.beginListening(() => {
			rh.fillTextFields(memberController.member);

			$("#save").click(() => {
				rh.saveMember(member, memberController);
			});
		});
	});
});