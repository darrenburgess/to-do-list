<?php
	require_once('global.php');
	$recId = $_POST['recId'];
	$deleteRequest = $fm->newDeleteCommand('web_find_item', $recId);
	$result = $deleteRequest->execute();
	$error = $result->getCode();
	echo $error;
?>