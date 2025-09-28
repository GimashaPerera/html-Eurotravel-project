<?php
    $SERVER = "localhost";
    $username ="root";
    $password = "Gimasha@123";
    $dbname = "eurotravel_db";
  

  $conn = new mysqli($SERVER, $username, $password, $dbname);

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
         header("Location: HomePage.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }


$conn->close();
?>








