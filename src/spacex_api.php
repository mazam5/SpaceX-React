<?php
header('Content-Type: application/json');

$url = 'https://api.spacexdata.com/v3/capsules';
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

echo $response;
?>
