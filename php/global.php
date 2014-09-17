<?php

	ini_set ('display_errors', true);

	ini_set('error_reporting', 'E_ALL & ~E_DEPRECATED & ~E_STRICT & ~E_NOTICE');

	require_once dirname(__FILE__).'/../../FM_API/FileMaker.php';

	$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');

?>	
