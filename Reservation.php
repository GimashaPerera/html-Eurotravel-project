
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

    $SERVER = "localhost";
    $username ="root";
    $password = "Gimasha@123";
    $dbname = "eurotravel_db";

// Connect to database
    $conn = new mysqli($SERVER, $username, $password, $dbname);

if ($conn->connect_error) 
    {
    die("Connection failed: " . $conn->connect_error);
    }

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $package = $_POST['package'];
    $people = $_POST['people'];
    $fromDate = $_POST['fromDate'];
    $toDate = $_POST['toDate'];
    $notes = $_POST['notes'];

    $sql = "INSERT INTO reservation (package, noofpax, DateFrom, DateTo, notes) VALUES ('$package','$people','$fromDate','$toDate','$notes')";



    if ($conn->query($sql) === TRUE) 
        {
        header("Location: HomePage.html");
        exit();
        } 
    else 
        {
        echo "Error: " . $conn->error;
        }
}

$conn->close();

?>