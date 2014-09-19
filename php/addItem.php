<?php

	require_once('global.php');

	$data = $_POST['newItem'];

	if($data){
		$rec = $fm->createRecord('web_find_item');
		$rec->setField('item',$data);
		$result = $rec->commit();
	}

?>