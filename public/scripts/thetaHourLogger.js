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

rh.PageController = class {
	constructor(logsController, eventController) {
		this._logsController = logsController;
		this._eventController = eventController;
		let isInitialized = false;
		let listener = () => {
			if (isInitialized) {
				this.updateView()
			} else {
				isInitialized = true;
			}
		}
		this._logsController.beginListening(listener);
		this._eventController.beginListening(listener);
	}

	updateView() {
		const events = this._eventController.getEvents();
		const logs = this._logsController.getLogs(rh.authManager.uid);

		const oldList = $("#logs");
		oldList.hide();
		oldList.removeAttr("id");
		const newList = $('<div id="logs" class="row justify-content-center"></div>');

		logs.forEach((log) => {
			events.forEach((event) => {
				if (log.eventId == event.id) {
					const date = log.time.toDate();
					const time = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() + 1900);
					const card = this.createCard(event.name, time, event.startTime + " - " + event.endTime, event.description, 	log.hours);
					newList.append(card);
				}
			});
		});

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
		const logsController = new rh.Fb.ThetaLogsController();
		const eventController = new rh.Fb.ThetaEventController();
		new rh.PageController(logsController, eventController);
	});
});