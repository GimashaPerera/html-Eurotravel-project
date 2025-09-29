<?php
include 'db_connect.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
   
    $email = $conn->real_escape_string($_POST['email']);
   
    // Insert data into the database
    $sql = "INSERT INTO subscribers ( email)
            VALUES ('$email')";

if ($conn->query($sql) === TRUE) {
    // Redirect to the registration page with a success parameter
    header("Location: registration.html?success=1");
    exit(); 
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close(); 
}
?>
