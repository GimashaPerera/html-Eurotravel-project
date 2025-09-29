<?php
// Database connection
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "test_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, email, subscribed_at FROM subscribers ORDER BY subscribed_at DESC";
$result = $conn->query($sql);

echo "<h2>📧 Subscribers List</h2>";
echo "<table border='1' cellpadding='10' cellspacing='0'>";
echo "<tr style='background:#0A3D62;color:white;'>
        <th>ID</th>
        <th>Email</th>
        <th>Subscribed At</th>
      </tr>";

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row["id"]."</td>
                <td>".$row["email"]."</td>
                <td>".$row["subscribed_at"]."</td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='3'>No subscribers yet</td></tr>";
}

echo "</table>";
$conn->close();
?>
