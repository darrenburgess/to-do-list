<?php

	$dataBaseType = 'SQL';  // SQL or FM

	ini_set ('display_errors', true);

	ini_set('error_reporting', 'E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE');

	if($dataBaseType === 'FM'){
		require_once dirname(__FILE__).'/../../FM_API/FileMaker.php';
		$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');
	} else {
		$connect = mysqli_connect('localhost:8889','root','root','yatdla');
		if (mysqli_connect_errno()) {
		  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
	}

?>	
