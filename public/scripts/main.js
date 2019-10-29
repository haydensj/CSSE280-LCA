var rh = rh || {};

rh.REGISTRY_TOKEN = "172f5cec-b7d2-460f-932b-c14352138ddd";

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
        if (callback) {
            callback();
        }
    });
};