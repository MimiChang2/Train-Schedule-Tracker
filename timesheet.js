/* global firebase */
/* global moment */

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
var frequency = "";


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

    //var firebaseTrain = "snapshot.val().";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var timeConverted = moment((snapshot.val().trainTime), "HH:mm").subtract(1, "years").format("HH:mm");
    //timeConverted = moment(timeConverted).format("HH:mm");
    console.log("Time Converted: " + timeConverted);



    // Current Time
    var currentTime = moment().format("HH:mm");
    console.log("Current Time: " + currentTime);

    // Difference between the times
    var diffTime = moment().diff(moment(timeConverted, "HH:mm"), "minutes");
    console.log("Diff Time: " + diffTime);

    // Remaining Time
    var remainder = diffTime % snapshot.val().frequency;
    console.log(remainder + "!");

    // Minutes Away
    var minutesAway = snapshot.val().frequency - remainder;
    console.log("Minutes Away: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("Next Arrival: " + moment(nextTrain).format("HH:mm"));

    $("#input").append(
        "<tr><td>" + snapshot.val().trainName + "</td>" +
        "<td>" + snapshot.val().destination + "</td>" +
        // "<td>" + snapshot.val().trainTime + "</td>" +
        "<td>" + snapshot.val().frequency + "</td>" +
        "<td>" + nextTrain + "</td>" +
        "<td>" + minutesAway + "</td></tr>"
    );

    // $("#input > tbody").append("<tr><td>" + firebaseTrain.trainName + "</td><td>" + firebaseTrain.destination + "</td><td>" +
    // firebaseTrain.trainTime + "</td><td>" + firebaseTrain.frequency + "</td><td>" + nextTrain + "</td><td>" + minTillTrain + "</td></tr>");

});
