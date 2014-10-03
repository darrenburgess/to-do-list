<?php
	require_once('global.php');
	$recId = $_POST['recId'];
	$status = $_POST['status'];
	if ($dataBaseType == 'FM') {
		$editRecord = $fm->newEditCommand('web_find_item', $recId);
		$editRecord->setField('status', $status);
		$result = $editRecord->execute();
		$error = $result->getCode();
		echo $error;
	} else { 
		mysqli_query($connect,'UPDATE item SET status = '.$status.' WHERE id = '.$recId);
		mysqli_close($connect);
	}
?>