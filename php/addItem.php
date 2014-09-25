<?php
	require_once('global.php');
	$data = $_POST['newItem'];
	if($data){
		$rec = $fm->newAddCommand('web_find_item');
		$rec->setField('item',$data);
		$result = $rec->execute();
		$newRecord = current($result->getRecords());
		$recId = $newRecord->getRecordId();
	}
	echo $recId;
?>