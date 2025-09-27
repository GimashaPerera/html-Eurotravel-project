<?php
// Basic PHP Insert Script

$servername = "localhost";
$username = "root";
$password = "Nipun";
$dbname = "euro_db";

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $package = $_POST['package'];
    $people = $_POST['people'];
    $fromDate = $_POST['fromDate'];
    $toDate = $_POST['toDate'];
    $notes = $_POST['notes'];

    $sql = "INSERT INTO reservation (package, noofpax, DateFrom, DateTo, notes) VALUES ('$package', '$people', '$fromDate', '$toDate', '$notes')";



    if ($conn->query($sql) === TRUE) {
        header("Location: Homepage.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
