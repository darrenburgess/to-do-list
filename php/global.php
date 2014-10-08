<?php

	$dataBaseType = 'SQL';  // SQL or FM

	ini_set ('display_errors', true);

	ini_set('error_reporting', 'E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE');

	if($dataBaseType === 'FM'){
		require_once dirname(__FILE__).'/../../FM_API/FileMaker.php';
		$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');
	} else {
		mysql_connect('localhost','webapp','1z2x3c4v5b6n7m') or die ("<html><script language='JavaScript'>alert('Unable to connect to database! Please try again later.'),history.go(-1)</script></html>");
		mysql_select_db('yatdla',$connect);
		// if (mysqli_connect_errno()) {
		// 		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		// }
	}

?>	