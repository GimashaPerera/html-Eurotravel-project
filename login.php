<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

    $SERVER = "localhost";
    $username ="root";
    $password = "Gimasha@123";
    $dbname = "eurotravel_db";


// Create connection
$conn = new mysqli($SERVER, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Query to check if user exists
    $sql = "SELECT * FROM registertbl WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);


    if (mysqli_num_rows($sql)===TRUE) {
      
      header("Location: Reservation.html");
        exit();
    } else
     {
        echo "Error" . $conn->error; 
    }

}

$conn->close();
?>
