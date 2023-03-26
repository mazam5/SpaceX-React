<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

if ($path === '') {
    if ($method === 'GET') {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api.spacexdata.com/v3/capsules");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($response, true);
        echo json_encode($data);
    } else if ($method == 'POST') {
        $status = $_POST['status'];
        $type = $_POST['type'];
        $landings = $_POST['landings'];
        $query = "https://api.spacexdata.com/v3/capsules";

        if (!empty($type)) {
            $query .= "?type=" . urlencode($type);
        }

        if (!empty($status)) {
            $query .= (strpos($query, '?') !== false) ? "&status=" . urlencode($status) : "?status=" . urlencode($status);
        }

        if (!empty($landings)) {
            $query .= (strpos($query, '?') !== false) ? "&landings=" . urlencode($landings) : "?landings=" . urlencode($landings);
        }

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $query,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        echo $response;
    } else {
        header("HTTP/1.1 405 Method Not Allowed");
        echo json_encode(array("message" => "Method not allowed."));
    }
} else {
    header("HTTP/1.1 404 Not Found");
    echo json_encode(array("message" => "Endpoint not found."));
}
