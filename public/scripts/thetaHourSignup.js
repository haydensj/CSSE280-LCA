/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox
 */

/** namespace. */
var rh = rh || {};

rh.DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

rh.enableTabs = function () {
	new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
	new mdc.tab.MDCTab(document.querySelector('.mdc-tab'));
}

rh.PageController = class {
	constructor(eventController) {
		this._eventController = eventController;
		this._day = rh.DAYS[0];
		rh.DAYS.forEach((day) => {
			const button = $(`#${day}Button`);
			button.click(() => {
				this._day = day;
				this.updateView();
			})
		})
		eventController.beginListening(() => {
			this.updateView();
		});
	}

	createCard(id1, id2, name, date, description, startTime, endTime, hours) {
		const card = $(
			`<div class="col mdc-card">
				<h2 class="row cardTitle mdc-typography mdc-typography--headline5">
					<div class="col-7 col-xl-6">${name}</div>
					<div class="col-5">${date}</div>
				</h2>
				<h3 class="row cardTitle mdc-typography mdc-typography--subtitle1">
					<div class="col-7 col-xl-6">${description}</div>
					<div class="col-5">${startTime} - ${endTime}<br>${hours} Theta Hours</div>
				</h3>
				<h3 class="row cardTitlemdc-typography mdc-typography--subtitle1">
					<div class="col mdc-text-field mdc-text-field--outlined">
						<input type="text" id="${id1}" class="mdc-text-field__input">
						<div class="mdc-notched-outline">
							<div class="mdc-notched-outline__leading"></div>
							<div class="mdc-notched-outline__notch">
								<label for="${id1}" class="mdc-floating-label">Volunteer 1</label>
							</div>
							<div class="mdc-notched-outline__trailing"></div>
						</div>
					</div>
					<div class="col mdc-text-field mdc-text-field--outlined">
						<input type="text" id="${id2}" class="mdc-text-field__input">
						<div class="mdc-notched-outline">
							<div class="mdc-notched-outline__leading"></div>
							<div class="mdc-notched-outline__notch">
								<label for="${id2}" class="mdc-floating-label">Volunteer 2</label>
							</div>
							<div class="mdc-notched-outline__trailing"></div>
						</div>
					</div>
					<div class="col my-auto">
						<button class="btn btn-light">SIGN UP</button>
					</div>
				</h3>
			</div>`
		);

		let input = card.find(`#${id1}`);
		new mdc.textField.MDCTextField(input.parent()[0]);
		new mdc.notchedOutline.MDCNotchedOutline(input[0]);
		input = card.find(`#${id2}`);
		new mdc.textField.MDCTextField(input.parent()[0]);
		new mdc.notchedOutline.MDCNotchedOutline(input[0]);

		return card;
	}

	updateView() {
		const events = this._eventController.getEvents();

		rh.DAYS.forEach((day) => {
			const oldList = $(`#${day}`);
			oldList.hide();
			oldList.removeAttr("id");
			const newList = $(`<div id="${day}" class="row justify-content-center"></div>`);
			if (this._day != day) {
				newList.hide();
			}
			oldList.after(newList);
		})

		let i = 0;
		events.forEach((event) => {
			const date = (typeof event.date == 'string' || event.date instanceof String) ?
				event.date : 
				rh.DAYS[event.date.toDate().getDay()];
			const card = this.createCard(`vol${i}`, `vol${i + 1}`, event.name, date,
				event.description, event.startTime, event.endTime, event.hours);
			$(`#${date}`).append(card);
			
			i += 2;
		});
	}
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		const eventController = new rh.Fb.ThetaEventController();
		new rh.PageController(eventController);
		rh.enableTabs();
	});
});