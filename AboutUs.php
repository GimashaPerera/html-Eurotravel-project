<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "review";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle new review submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name   = $conn->real_escape_string($_POST['name']);
    $email  = $conn->real_escape_string($_POST['email']);
    $rating = (int)$_POST['rating'];
    $review = $conn->real_escape_string($_POST['review']);

    $sql = "INSERT INTO reviews (name, email, rating, review) 
            VALUES ('$name', '$email', '$rating', '$review')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $conn->error;
    }
}

// Fetch all reviews
$result = $conn->query("SELECT * FROM reviews ORDER BY id DESC");
$reviews = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

$conn->close();
?>
