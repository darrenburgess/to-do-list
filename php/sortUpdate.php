<?php
	require_once('global.php');
	$list = $_POST['item'];
	$countList = count($list);
	echo $countList;
	$i = 1;
	foreach($list as $recId){
		if ($dataBaseType === 'FM') {
			$editRecord = $fm->newEditCommand('web_find_item',$recId);
			$editRecord->setField('sortOrder', $i);
			$result = $editRecord->execute();
		} else {
			$query = "UPDATE item SET sortOrder = ".$i." WHERE id = ".$recId;
			if (!$connect->query($query)) {
				printf("Errormessage: %s\n", $connect->error,$query);
				echo "\nQuery = ".$query;
			}
		}
		$i++;
	}
	if ($dataBaseType == 'SQL') {
		mysqli_close($connect);
	}
?>