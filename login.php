<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$SERVER = "localhost";
$username = "root";
$password = "";
$dbname = "euro_db";

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
    $sql = "SELECT username FROM registertbl WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    echo "<!DOCTYPE html><html><head><title>Login Result</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #0A3D62, #1B4F72);
        color: white;
        text-align: center;
        padding-top: 100px;
      }
      h2 {
        color: #00f0ff;
      }
      a {
        color: #00f0ff;
        text-decoration: underline;
      }
    </style>
    </head><body>";

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $name = $row['username'];
        echo "<h2>Hi!, $name</h2>";
        echo "<p>Welcome back to Euro Travel!</p>";
    } else {
        echo "<h2>Please register and become a member of Euro Travel today.</h2>";
        echo "<p><a href='Registration.html'>Go to Registration</a></p>";
    }

    echo "</body></html>";
}

$conn->close();
?>
