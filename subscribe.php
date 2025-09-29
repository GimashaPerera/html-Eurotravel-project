<?php
// Database connection
$servername = "localhost";
$username   = "root";   // phpMyAdmin default
$password   = "";       // leave blank if no password
$dbname     = "test_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);

    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
        $stmt->bind_param("s", $email);

        if ($stmt->execute()) {
            echo "<p style='color:green;'>✅ Thank you for subscribing, " . htmlspecialchars($email) . "!</p>";
        } else {
            if ($conn->errno == 1062) {
                echo "<p style='color:orange;'>⚠️ You are already subscribed!</p>";
            } else {
                echo "<p style='color:red;'>❌ Error: " . $conn->error . "</p>";
            }
        }

        $stmt->close();
    } else {
        echo "<p style='color:red;'>❌ Invalid email address</p>";
    }
}

$conn->close();
?>
