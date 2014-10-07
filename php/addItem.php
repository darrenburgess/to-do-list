<?php
	require_once('global.php');
	$data = $_POST['newItem'];
	$zero = 0;
	if($data){
		if ($dataBaseType == 'FM') {
			$rec = $fm->newAddCommand('web_find_item');
			$rec->setField('item',$data);
			$result = $rec->execute();
			$newRecord = current($result->getRecords());
			$recId = $newRecord->getRecordId();
			echo $recId;
		} else {
			$query = "INSERT INTO item (item,status,sortOrder) VALUES ('".$data."','0','0')";
			if (!$connect->query($query)) {
			    printf("Errormessage: %s\n", $connect->error,$query);
			}
			echo $connect->insert_id;
			mysqli_close($connect);
		}
	}

?>