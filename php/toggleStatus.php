	<?php
		require_once('global.php');
		$recId = $_POST['recId'];
		$status = $_POST['status'];
		$editRecord = $fm->newEditCommand('web_find_item', $recId);
		$editRecord->setField('status', $status);
		$result = $editRecord->execute();
		$error = $result->getCode();
		echo $error;
	?>