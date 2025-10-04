<?php
session_start();
$session_id = session_id();
$time = time();
$timeout = 300; // 5 dakika (saniye)
$dir = __DIR__ . '/data';
$filename = $dir . '/users.json';

if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$users = [];
if (file_exists($filename)) {
    $raw = file_get_contents($filename);
    $users = $raw ? json_decode($raw, true) : [];
    if (!is_array($users)) $users = [];
}

// Bu kullanıcının son aktiflik zamanını güncelle
$users[$session_id] = $time;

// Eski kullanıcıları temizle
foreach ($users as $id => $last_active) {
    if ($time - $last_active > $timeout) {
        unset($users[$id]);
    }
}

// Kaydet
file_put_contents($filename, json_encode($users));

// Sonuç JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    "active" => count($users),
    "timeout" => $timeout
]);
exit;
