var rh = rh || {};

// Registry Token for Auth
rh.REGISTRY_TOKEN = "172f5cec-b7d2-460f-932b-c14352138ddd";

// static fields for the database
rh.Fb = {};

rh.Fb.COLLECTION_MEMBERS = "members";
rh.Fb.TK_NUMBER = "TKNumber";
rh.Fb.ALTERNATE_EMAIL = "alternateEmail";
rh.Fb.BIRTHDAY = "birthday";
rh.Fb.CITY = "city";
rh.Fb.FULL_NAME = "fullName";
rh.Fb.GRADUATION_YEAR = "graduationYear";
rh.Fb.IS_ACTIVE = "isActive";
rh.Fb.MAJOR = "major";
rh.Fb.PHONE_NUMBER = "phoneNumber";
rh.Fb.ROSE_EMAIL = "roseEmail";
rh.Fb.STATE_ABBREVIATION = "stateAbbreviation";
rh.Fb.STREET = "street";
rh.Fb.T_SHIRT_SIZE = "tShirtSize";
rh.Fb.USER_NAME = "userName";
rh.Fb.ZIP = "zip";

rh.Fb.COLLECTION_THETA_LOGS = "thetaEventLogs";
rh.Fb.EVENT_ID = "eventId";
rh.Fb.IS_VALID = "isValid";
rh.Fb.MEMBER_ID = "memberId";
rh.Fb.TIME = "time";

rh.Fb.Address = class {
	constructor(street, city, stateAbbreviation, zip) {
		this.street = street;
		this.city = city;
		this.stateAbbreviation = stateAbbreviation;
		this.zip = zip;
	}

	duplicate() {
		return new rh.Fb.Address(this.street, this.city, this.stateAbbreviation, this.zip);
	}
}

rh.Fb.Member = class {
	constructor(id, userName, TKNumber, phoneNumber, fullName, alternateEmail,
		roseEmail, tShirtSize, address, major, graduationYear, birthday,
		isActive) {
		this.id = id;
		this.userName = userName;
		this.TKNumber = TKNumber;
		this.phoneNumber = phoneNumber;
		this.fullName = fullName;
		this.alternateEmail = alternateEmail;
		this.roseEmail = roseEmail;
		this.tShirtSize = tShirtSize;
		this.address = address;
		this.major = major;
		this.graduationYear = graduationYear;
		this.birthday = birthday;
		this.isActive = isActive;
	}

	duplicate() {
		return new rh.Fb.Member(this.id, this.userName, this.TKNumber,
			this.phoneNumber, this.fullName, this.alternateEmail,
			this.roseEmail, this.tShirtSize, this.address.duplicate(),
			this.major, this.graduationYear, this.birthday, this.isActive);
	}
}

rh.Fb.ThetaLog = class {
	constructor(id, eventId, isValid, memberId, time) {
		this.id = id;
		this.eventId = eventId;
		this.isValid = isValid;
		this.memberId = memberId;
		this.time = time;
	}
}

rh.Fb.MemberConstroller = class {
	constructor(memberId) {
		this._ref = firebase.firestore()
			.collection(rh.Fb.COLLECTION_MEMBERS).doc(memberId);
		this.member = null;
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		this._unsubscribe = this._ref.onSnapshot((doc) => {
			if (doc.exists) {
				this.member = this._createMember(doc);
				if (changeListener) {
					changeListener();
				}
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	update(member) {
		this._ref.update({
			[rh.Fb.TK_NUMBER]: member.TKNumber,
			[rh.Fb.ALTERNATE_EMAIL]: member.alternateEmail,
			[rh.Fb.BIRTHDAY]: member.birthday,
			[rh.Fb.CITY]: member.address.city,
			[rh.Fb.FULL_NAME]: member.fullName,
			[rh.Fb.GRADUATION_YEAR]: member.graduationYear,
			[rh.Fb.IS_ACTIVE]: member.isActive,
			[rh.Fb.MAJOR]: member.major,
			[rh.Fb.PHONE_NUMBER]: member.phoneNumber,
			[rh.Fb.ROSE_EMAIL]: member.roseEmail,
			[rh.Fb.STATE_ABBREVIATION]: member.address.stateAbbreviation,
			[rh.Fb.STREET]: member.address.street,
			[rh.Fb.T_SHIRT_SIZE]: member.tShirtSize,
			[rh.Fb.USER_NAME]: member.userName,
			[rh.Fb.ZIP]: member.address.zip
		}).then((docRef) => {
			console.log("Member updated");
		})
	}

	_createMember(document) {
		const address = new rh.Fb.Address(
			document.get(rh.Fb.STREET),
			document.get(rh.Fb.CITY),
			document.get(rh.Fb.STATE_ABBREVIATION),
			document.get(rh.Fb.ZIP)
		);

		return new rh.Fb.Member(
			document.id,
			document.get(rh.Fb.USER_NAME),
			document.get(rh.Fb.TK_NUMBER),
			document.get(rh.Fb.PHONE_NUMBER),
			document.get(rh.Fb.FULL_NAME),
			document.get(rh.Fb.ALTERNATE_EMAIL),
			document.get(rh.Fb.ROSE_EMAIL),
			document.get(rh.Fb.T_SHIRT_SIZE),
			address,
			document.get(rh.Fb.MAJOR),
			document.get(rh.Fb.GRADUATION_YEAR),
			document.get(rh.Fb.BIRTHDAY),
			document.get(rh.Fb.IS_ACTIVE)
		)
	}
}

rh.Fb.MembersController = class {
	constructor() {
		this._ref = firebase.firestore().collection(rh.Fb.COLLECTION_MEMBERS);
		this._documentSnapshots = [];
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		this._unsubscribe = this._ref.orderBy(rh.Fb.USER_NAME, "desc").onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			console.log("Updating member list");
			if (changeListener) {
				changeListener();
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	getMembers(isActive) {
		let memberList = [];
		this._documentSnapshots.forEach((document) => {
			console.log(document);
			const member = this._createMember(document);
			if (member.isActive == isActive) {
				memberList.push(member);
			}
		});
		return memberList;
	}

	_createMember(document) {
		const address = new rh.Fb.Address(
			document.get(rh.Fb.STREET),
			document.get(rh.Fb.CITY),
			document.get(rh.Fb.STATE_ABBREVIATION),
			document.get(rh.Fb.ZIP)
		);

		return new rh.Fb.Member(
			document.id,
			document.get(rh.Fb.USER_NAME),
			document.get(rh.Fb.TK_NUMBER),
			document.get(rh.Fb.PHONE_NUMBER),
			document.get(rh.Fb.FULL_NAME),
			document.get(rh.Fb.ALTERNATE_EMAIL),
			document.get(rh.Fb.ROSE_EMAIL),
			document.get(rh.Fb.T_SHIRT_SIZE),
			address,
			document.get(rh.Fb.MAJOR),
			document.get(rh.Fb.GRADUATION_YEAR),
			document.get(rh.Fb.BIRTHDAY),
			document.get(rh.Fb.IS_ACTIVE)
		)
	}
}

rh.Fb.ThetaLogsController = class {
	constructor() {
		this._ref = firebase.firestore().collection(rh.Fb.COLLECTION_THETA_LOGS);
		this._documentSnapshots = [];
		this._unsubscribe = null;
	}

	beginListening(changeListener) {
		this._unsubscribe = this._ref.orderBy(rh.Fb.MEMBER_ID, "desc").onSnapshot((querySnapshot) => {
			this._documentSnapshots = querySnapshot.docs;
			console.log("Updating theta log list");
			if (changeListener) {
				changeListener();
			}
		});
	}

	stopListening() {
		this._unsubscribe();
	}

	getLogs(memberId) {
		let logs = [];
		this._documentSnapshots.forEach((document) => {
			const log = this._createLog(document);
			if(log.memberId == memberId) {
				logs.push(this._createLog(document));
			}
		});
		return logs;
	}

	_createLog(document) {
		return new rh.Fb.ThetaLog(
			document.get(rh.Fb.UID),
			document.get(rh.Fb.EVENT_ID),
			document.get(rh.Fb.IS_VALID),
			document.get(rh.Fb.MEMBER_ID),
			document.get(rh.Fb.TIME)
		);
	}
}

rh.AuthManager = class {
	constructor() {
		this._user = null;
	}

	get uid() {
		return this._user.uid;
	}

	get isSignedIn() {
		return !!this._user;
	}

	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
			console.log("Auth State changed to", user);
			this._user = user;
			changeListener();
		});
	}

	signIn() {
		Rosefire.signIn(rh.REGISTRY_TOKEN, (err, rfUser) => {
			if (err) {
				console.log("Error signing in to Rose-Hulman.");
				return;
			}

			console.log("Successful Rose login.", rfUser);
			firebase.auth().signInWithCustomToken(rfUser.token).then((authData) => {
				console.log("Successful Firebase login.");
			}, (error) => {
				console.log("Firebase login failed.");
			});
		});
	}

	signOut() {
		firebase.auth().signOut();
	}
}

rh.NavbarController = class {
	constructor(authManager) {
		this._authManager = authManager;

		this._authManager.beginListening(this.updateView.bind(this))

		$("#login").click(() => {
			if (this._authManager.isSignedIn) {
				console.log("Login while signed in");
				window.location.href = "/profile.html";
				return;
			}
			this._authManager.signIn();
		});
	}

	updateView() {
		console.log("Updating view");
		if (this._authManager.isSignedIn) {
			$("#login").html(this._authManager.uid);
		} else {
			$("#login").html("Log In");
		}
	}
}

rh.initialize = (callback) => {
	$("#footer").load("partials/footer.html");
	$("#navbar").load("partials/navbar.html", () => {
		new rh.NavbarController(new rh.AuthManager());
		
		const membersController = new rh.Fb.MembersController();
		var memberController = null;
		membersController.beginListening(() => {
			const members = membersController.getMembers(true);
			console.log(members);
			memberController = new rh.Fb.MemberConstroller(members[0].id);
			memberController.beginListening(() => {
				console.log(memberController.member);
			})
		});
		// const thetaLogsController = new rh.Fb.ThetaLogsController();
		// thetaLogsController.beginListening(() => {
		// 	console.log(thetaLogsController.getLogs());
		// });
		
		if (callback) {
			callback();
		}
	});
};