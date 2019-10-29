var rh = rh || {};

rh.initialize = (callback) => {
    $("#navbar").load("partials/navbar.html", callback);
};