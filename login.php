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
    $Fullname = $_POST['Fullname'];
    $password = $_POST['password'];

    // Query to check if user exists
<<<<<<< HEAD
    $sql = "SELECT Fullname FROM registertbl WHERE Fullname = '$Fullname' AND password = '$password'";
=======
    $sql = "SELECT * FROM registertbl WHERE Fullname = '$Fullname' AND password = '$password'";
>>>>>>> 6932ee4430e575a2352f5080133ad0a440b2510f
    $result = $conn->query($sql);


<<<<<<< HEAD
    if ($result && $result->num_rows > 0) {
        // Show greeting and JS alert
        echo "<script>alert('Hi $Fullname! Welcome to Euro Travel!');</script>";
        echo "<h2>Hi!, $Fullname</h2>";
        echo "<p>Welcome back to Euro Travel!</p>";
        echo "<p><a href='HomePage.html'> Go back to Home</a> </p>";
    } else {
        echo "<h2>Please register and become a member of Euro Travel today.</h2>";
        echo "<p><a href='Registration.html'>Go to Registration</a></p>";
=======
    if (mysqli_num_rows($sql)===TRUE) {
      
      header("Location: Reservation.html");
        exit();
    } else
     {
        echo "Error" . $conn->error; 
>>>>>>> 6932ee4430e575a2352f5080133ad0a440b2510f
    }

}

$conn->close();
?>
