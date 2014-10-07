<?php

	function find_items($type) {
		global $dataBaseType;
		global $connect;
		
		if ($type ==='unchecked') {
			$status = 0;
		} else {
			$status = 1;
		}

		if ($dataBaseType == 'FM') {
			$fm = new FileMaker('yatdla','192.168.1.52','cwp','cwp123');
			$request = $fm->newFindCommand('web_find_item');
			if($type==='unchecked'){
				$request->addFindCriterion('status', 0 );
				$request->addSortRule('sortOrder', 1, FILEMAKER_SORT_ASCEND);
			} else {
				$request->addFindCriterion('status', 1 );
				$request->addSortRule('item', 1, FILEMAKER_SORT_ASCEND);
			}
			$result = $request->execute();
			if($result == "No records match the request"){
			} else {
				$records = $result->getRecords();
				return $records;
			}
		} else {
			$result = mysqli_query($connect,'SELECT item, id FROM item WHERE status = '.$status.' ORDER BY sortOrder');
			$records = mysqli_fetch_all($result);
			return $records;
		}
	}

	function build_list($records,$checked) {
		global $dataBaseType;
		if ($dataBaseType=='FM') {
			foreach ($records as $record) {
	            $item = $record->getField('item');
	            $id = $record->getRecordId();
	            echo <<<EOT
	            <li id="item_$id">
	                <div class="icon check-box $checked"></div>
	                <span class="item-text">$item</span>
	                <div class="icon trash-can"></div>
	                <div class="icon drag-grab"></div>
	            </li>
EOT;
			}

		} else {  //SQL
			foreach ($records as $key => $value) {
	            $item = $value[0];
	            $id = $value[1];
	            echo <<<EOT
	            <li id="item_$id">
	                <div class="icon check-box $checked"></div>
	                <span class="item-text">$item</span>
	                <div class="icon trash-can"></div>
	                <div class="icon drag-grab"></div>
	            </li>
EOT;
			}
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