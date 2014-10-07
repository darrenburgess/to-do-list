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
		$query = "UPDATE item SET status = ".$status." WHERE id = ".$recId;
		if (!$connect->query($query)) {
		    printf("Errormessage: %s\n", $connect->error,$query);
		}
		mysqli_close($connect);
	}
?>