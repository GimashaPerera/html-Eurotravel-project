<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $email = htmlspecialchars($_POST['email']);
   
    $to = "info@ka.com";
    $headers = "From: $email";

    // Compose email
    $email_subject = "Contact Form: $subject";
    $email_body = "Email: $email";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "Failed to send message.";
    }
}
?>