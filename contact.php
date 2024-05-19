<?php
require 'koneksi.php';
$name = $_POST['name'];
$email = $_POST['email'];
$number = $_POST['number'];
$msg = $_POST['message'];

if (!empty($name) && !empty($email) && !empty($number) && !empty($msg)) {
   
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        if ($conn) {
            $query = "INSERT INTO contact_form (name, email, number, message) VALUES ('$name', '$email', '$number', '$msg')";
            $result = mysqli_query($conn, $query);

            if ($result) {
                echo "Pesan kamu telah terkirim ✅";
            } else {
                echo "Gagal mengirim pesan. Error: " . mysqli_error($conn);
            }

            mysqli_close($conn);
        } else {
            echo "Gagal terhubung ke database";
        }
    } else {
        echo "Masukkan Email dengan benar !";
    }
} else {
    echo "Harap isi semuanya !";
}
?>
