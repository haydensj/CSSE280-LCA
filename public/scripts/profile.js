/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox, Sterling Hayden
 */

/** namespace. */
var rh = rh || {};

rh.SELECTOR_NAMES = [
	"fName",
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

rh.BUTTON_SCALE = 0.78;

rh.enableTextFields = function () {
	rh.SELECTOR_NAMES.forEach((selectorName) => {
		new mdc.textField.MDCTextField($("." + selectorName)[0]);
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
			const width = $(`.${name} .mdc-notched-outline__notch`).width() * rh.BUTTON_SCALE;
			$(`.${name} .mdc-notched-outline__notch`).width(width);
		}
	})
}

rh.saveMember = (member, memberController) => {
	member.fullName = $("#nfName").val();
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
		const memberController = new rh.Fb.MemberController(rh.authManager.uid);
		memberController.beginListening(() => {
			const member = memberController.member;
			rh.fillTextFields(member);

			$("#save").click(() => {
				rh.BUTTON_SCALE = 1;
				rh.saveMember(member, memberController);
			});

			$("#logout").click(() => {
				rh.authManager.signOut();
				window.location.href = "/";
			});
		});
	});
});