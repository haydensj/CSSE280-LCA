/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox, Sterling Hayden
 */

/** namespace. */
var rh = rh || {};


rh.CreateCard = (fullName, major, graduationYear, tkNumber) => {
	return $(
		`<div class="row justify-content-center cardList">
			<div class="col">
				<div class="mdc-card">
					<h2 class="mdc-typography mdc-typography--headline5">
						<div class="row cardTitle">
							<div class="col-7 col-xl-6">
								${fullName}
							</div>
							<div class="col-5">
								${major} ${graduationYear}
							</div>
						</div>
					</h2>
					<h3 class="mdc-typography mdc-typography--subtitle1">
						<div class="row cardTitle">
							<div class="col-7 col-xl-6">
								TK${tkNumber}
							</div>
							<div class="col-5">
								Active Member
							</div>
						</div>
					</h3>
				</div>
			</div>
			<div class="col-0 col-lg-4 col-md-3 col-sm-2 col-xs-0"></div>
		</div>`
	);
}

rh.AddMember = (member) => {
	const card = rh.CreateCard(member.fullName, member.major, member.graduationYear, member.TKNumber);
	$("#activeslist-page").append(card);
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		const membersController = new rh.Fb.MembersController();
		membersController.beginListening(() => {
			const members = membersController.getMembers(true);
			members.forEach(rh.AddMember);
		})
	});
});