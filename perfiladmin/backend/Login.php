<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $e_mail = $_POST['e_mail'] ?? null;
    $password = $_POST['password'] ?? null;

    // Verificar que el correo y la contraseña no sean nulos
    if (!$e_mail || !$password) {
        echo "Por favor, complete todos los campos.";
        exit;
    }

    // Conexión a la base de datos
    $conn = pg_connect("host=localhost dbname=Carnespa user=postgres password=estudio");

    if (!$conn) {
        die("Error de conexión: " . pg_last_error());
    }

    // Consulta del usuario por email
    $query = "SELECT * FROM administrator WHERE e_mail = $1";
    $result = pg_query_params($conn, $query, array($e_mail));

    // Verificar si el usuario existe
    if ($row = pg_fetch_assoc($result)) {
        // Verificar la contraseña
        if (password_verify($password, $row['password'])) {
            $_SESSION['e_mail'] = $e_mail;  // Guardar el correo en la sesión
            echo "Login exitoso! Bienvenido " . $e_mail;
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "Usuario no encontrado";
    }

    // Cerrar la conexión
    pg_close($conn);
}
?>
