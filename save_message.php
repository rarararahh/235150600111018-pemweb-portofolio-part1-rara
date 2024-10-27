<?php
header('Content-Type: application/json');

try {
    $message = $_POST['message'];
    
    $filename = 'pesan.txt';
    
    if (file_put_contents($filename, $message, FILE_APPEND) !== false) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Message saved successfully']);
    } else {
        throw new Exception('Failed to write to file');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>