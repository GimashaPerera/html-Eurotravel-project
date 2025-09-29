<?php
$host = "localhost";   // or your server
$user = "root";        // your MySQL username
$pass = "";            // your MySQL password
$db   = "review";  // your database name

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?
<?php include 'db_connect.php'; ?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name   = $conn->real_escape_string($_POST['name']);
    $email  = $conn->real_escape_string($_POST['email']);
    $rating = (int)$_POST['rating'];
    $review = $conn->real_escape_string($_POST['review']);

    $sql = "INSERT INTO reviews (name, email, rating, review) 
            VALUES ('$name', '$email', '$rating', '$review')";

    if ($conn->query($sql) === TRUE) {
        echo "Review submitted successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<form method="POST" action="">
    <label>Name:</label><br>
    <input type="text" name="name" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email"><br><br>

    <label>Rating (1-5):</label><br>
    <select name="rating" required>
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
    </select><br><br>

    <label>Review:</label><br>
    <textarea name="review" rows="4" cols="40" required></textarea><br><br>

    <button type="submit">Submit Review</button>
</form>