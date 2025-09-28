<?php
$servername = "localhost";
$username = "root"; // update if needed
$password = "";     // update if needed
$dbname = "euro";   // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

//Get the user inputs from the userform.html
$name= $_POST ['name'];
$email= $_POST ['email'];
$phone= $_POST ['phone'];
$message= $_POST ['message'];


    // Insert into your actual table columns
    $sql = "INSERT INTO getintouch (name, email, phone, message) 
            VALUES ('$name', '$email', '$phone', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully! ✅";
    } else {
        echo "Error: " . $conn->error;
    }


$conn->close();
?>








