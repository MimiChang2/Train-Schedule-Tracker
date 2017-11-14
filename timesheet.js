/* global firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCh8Pf9AOqLzMB3aP1rIqYhP3D_XTfD1EY",
    authDomain: "trainhw-8be78.firebaseapp.com",
    databaseURL: "https://trainhw-8be78.firebaseio.com",
    projectId: "trainhw-8be78",
    storageBucket: "trainhw-8be78.appspot.com",
    messagingSenderId: "287650217415"
};
firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var destination = "";
var time = "";
var frequency = 0;


$("#submitButton").on("click", function() {

    train = $("#train").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(train);

    database.ref().push({
        trainName: train,
        destination: destination,
        trainTime: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});


database.ref().on("child_added", function(snapshot) {

    $("#input").append(
        "<tr><td>" + snapshot.val().trainName + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        "<td>" + snapshot.val().frequency + "</td></tr>"
    );

});
