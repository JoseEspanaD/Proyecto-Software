<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // ENCRIPTACION
    $e_mail = $_POST['e_mail'];
    $address = $_POST['address'];

    // CONEXIÓN 
    $conn = pg_connect("host=localhost dbname=Carnespa user=postgres password=estudio");

    if (!$conn) {
        die("Connection failed: " . pg_last_error());
    }

    // Inserción de usuario
    $query = "INSERT INTO administrator (name, e_mail, status, password, address) VALUES ($1, $2, 'on-line', $3, $4)";
    $result = pg_query_params($conn, $query, array($name, $e_mail, $password, $address));

    if ($result) {
        echo "Registro exitoso!";
    } else {
        echo "Error: " . pg_last_error();
    }

    pg_close($conn);
}
?>
