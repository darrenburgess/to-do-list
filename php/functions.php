<?php

	function find_items($type) {
		$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');
		$request = $fm->newFindCommand('web_find_item');
		if($type==='unchecked'){
			$request->addFindCriterion('status', '=');
		} else {
			$request->addFindCriterion('status', 1 );
		}
		$result = $request->execute();
		$records = $result->getRecords();
		if (fm_error(__FUNCTION__,$result) === TRUE) {
			return;
		} else {
			return $records;
		}
	}

	function build_list($records,$checked) {
		foreach ($records as $record) {
            $item = $record->getField('item');
            echo <<<EOT
            <li>
                <div class="icon check-box $checked"></div>
                <span class="item-text">$item</span>
                <div class="icon trash-can"></div>
                <div class="icon drag-grab"></div>
            </li>
EOT;
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