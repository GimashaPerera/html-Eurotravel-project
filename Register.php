<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

    $SERVER = "localhost";
    $username ="root";
    $password = "Gimasha@123";
    $dbname = "eurotravel_db";

    //create connection

    $conn = new mysqli($SERVER, $username, $password, $dbname);

    //check the connection

    if($conn->connect_error)
        {
            die("connection faild : " . $conn->connect_error);
        }

    //get user inputs
    if($_SERVER['REQUEST_METHOD']=="POST"){
    $Fullname = $_POST['Fullname'];
    $contactno = $_POST['tel'];
    $email =  $_POST['email'];
    $country =  $_POST['country'];
    $password =  $_POST['password'];
    

    //insert data in to the table
    $sql = "INSERT INTO registertbl (Fullname, contactno, email, country, `password`) VALUES ('$Fullname','$contactno','$email','$country','$password')";


    //check the conncetion
    
    if($conn->query($sql)===TRUE)
    {
        
        header("Location: Reservation.html");
        exit();

    }
    else
    {
       echo "Error" . $conn->error; 
    }
     
}

    $conn->close();

?>