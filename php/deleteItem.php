<?php
	require_once('global.php');
	$recId = $_POST['recId'];
	echo $recId;
	if ($dataBaseType == 'FM') {
		$deleteRequest = $fm->newDeleteCommand('web_find_item', $recId);
		$result = $deleteRequest->execute();
		$error = $result->getCode();
	} else {
		$query = "DELETE FROM item WHERE id = ".$recId;
		if ($connect->query($query)) {
			printf("Errormessage: %s\n", $connect->error,$query);
		}
	}
	echo $error;
?>