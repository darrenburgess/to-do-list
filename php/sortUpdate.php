<?php
	require_once('global.php');
	$list = $_POST['item'];
	$i = 0;
	foreach($list as $value){
		$editRecord = $fm->newEditCommand('web_find_item',$value);
		$editRecord->setField('sortOrder', $i);
		$result = $editRecord->execute();
		$i++;
	}
	echo $list;
?>
