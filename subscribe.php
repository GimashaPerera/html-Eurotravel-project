<?php
// Database connection
$servername = "localhost";
$username = "root";  // your DB username
$password = "";      // your DB password
$dbname = "Europe";  // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST['email'])){
    $email = $_POST['email'];

    // Check for duplicate emails
    $stmt = $conn->prepare("SELECT id FROM subscribers WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if($stmt->num_rows > 0){
        echo "You are already subscribed!";
    } else {
        $stmtInsert = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
        $stmtInsert->bind_param("s", $email);
        if($stmtInsert->execute()){
            echo "Thank you for subscribing!";
        } else {
            echo "Error: " . $stmtInsert->error;
        }
        $stmtInsert->close();
    }

    $stmt->close();
}

$conn->close();
?>
