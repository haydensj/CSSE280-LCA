/**
 * @fileoverview
 * Provides interactions for all pages in the UI.
 *
 * @author  Connor Mattox, Sterling Hayden
 */

/** namespace. */
var rh = rh || {};

rh.enableTextFields = () => {
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

rh.addLog = (logsController, memberId, title, description, date, startTime, endTime, hours) => {
	if (typeof date == 'string' || date instanceof String) {
		date = new Date(date);
	}
	logsController.createNewLog(memberId, title, description, date, startTime, endTime, hours);
}

rh.PageController = class {
	constructor(logsController) {
		$("#submitEvent").click(() => {
			rh.addLog(
				logsController,
				rh.authManager.uid,
				$("#inputTitle").val(),
				$("#inputDesc").val(),
				$("#inputDate").val(),
				$("#inputStart").val(),
				$("#inputEnd").val(),
				$("#inputHours").val()
			);
		});
		this._logsController = logsController;
		let isInitialized = false;
		let listener = () => {
			if (isInitialized) {
				this.updateView();
			} else {
				isInitialized = true;
			}
		}
		this._logsController.beginListening(this.updateView.bind(this));
	}

	updateView() {
		const logs = this._logsController.getLogs(rh.authManager.uid);

		const newList = $('<div id="logs" class="row justify-content-center"></div>');

		logs.forEach((log) => {
			console.log(log);
			const date = log.date.toDate();
			const time = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() + 1900);
			const card = this.createCard(log.event.name, time, log.event.startTime + " - " + log.event.endTime, log.event.description, log.hours);
			newList.append(card);
		});

		const oldList = $("#logs");
		oldList.hide();
		oldList.removeAttr("id");

		oldList.after(newList);
	}

	createCard(name, date, time, description, hours) {
		return $(
			`<div class="col-12 justify-content-center cardList">
				<div class="mdc-card">
					<h2 class="mdc-typography mdc-typography--headline5">
						<div class="row cardTitle">
							<div class="col-7 col-xl-6">
								${name}
							</div>
							<div class="col-5">
								${date}
							</div>
						</div>
					</h2>
					<h3 class="mdc-typography mdc-typography--subtitle1">
						<div class="row cardTitle">
							<div class="col-7 col-xl-6">
								${description}
							</div>
							<div class="col-5">
								${time}
								<br>
								${hours} Theta Hours
							</div>
						</div>
					</h3>
				</div>
			</div>`
		);
	}
}

$(document).ready(() => {
	console.log("Ready");
	rh.initialize(() => {
		rh.enableTextFields();
		const eventController = new rh.Fb.ThetaEventController();
		const logsController = new rh.Fb.ThetaLogsController(eventController);
		new rh.PageController(logsController);
	});
});