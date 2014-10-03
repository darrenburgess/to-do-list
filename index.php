<?php
	require_once('php/global.php');
	require_once('php/functions.php');
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

		<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/main.css">
		<script src="js/vendor/modernizr-2.6.2.min.js"></script>
	</head>
	<body>
		<!--[if lt IE 7]>
			<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

		<!-- Add your site or application content here -->

		<div id="page-wrap">   

			<!-- <img id="background-image" src="img/wood-panel.jpg" alt="" /> -->

			<header>
				<h1>YATDLA</h1>            
				<form action="#" method="">
					<input id="input-field"  type="text" placeholder="Enter a task and press return..." name="Enter a task and press return...">
				</form>
			</header>
				<div id="content-wrap">
					
						<?php
							$records = find_items('unchecked');
							echo "<br><br>";
							print_r($records);
							$foundCountUnchecked = count($records);
						?>

					<section>
						<br><br>
						<h2><span id="uncompleted"><?php echo $foundCountUnchecked;?></span> Uncompleted Tasks
						<span class="icon alpha-sort"></span></h2>
						<ul id="uncompletedList" class="uncompleted-item">
							<?php
								$list = build_list($records,'unchecked');
							?>    
						</ul>
					</section>

						<?php 
							$records = find_items('checked');
							$foundCountChecked = count($records);
						?>

					<section>
						<h2><span id="completed"><?php echo $foundCountChecked;?></span> Completed Tasks
						<span class="icon toggle-completed"></span></h2> 
						<ul id="completedList" class="completed-item">
							<?php
								$list = build_list($records,'checked');
							?> 
						</ul>
					</section>

				</div>
		
		</div>

		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
		<!-- <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script> -->
		<script src="js/plugins.js"></script>
		<script src="js/main.js"></script>
		<script src="js/Sortable.js"></script>

		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<script>
			(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
			function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
			e=o.createElement(i);r=o.getElementsByTagName(i)[0];
			e.src='//www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
			ga('create','UA-XXXXX-X');ga('send','pageview');
		</script>
	</body>
</html>
