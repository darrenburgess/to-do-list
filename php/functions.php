<?php

	function testing() {
		echo "testing123";
	}

	function find_uncompleted_items() {
		$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');
		$request = $fm->newFindCommand('web_find_item');
		$request->addFindCriterion('status', '=');
		$result = $request->execute();
		$records = $result->getRecords();
		if (fm_error(__FUNCTION__,$result) === TRUE) {
			return;
		} else {
			return $records;
		}
	}

	function fm_error($function,$result) {
		if (FileMaker::isError($result)) {
			if ($result->code == 401) {
				return FALSE;
			} else {
				echo ucwords($function) .' error: ' .$result->code . ', ' . $result->getMessage();
				return;
			}
		}
	}

?>