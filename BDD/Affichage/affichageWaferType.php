<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - multiple elements</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<link type="text/css" rel="stylesheet" href="https://threejs.org/examples/main.css">
		<style>
			* {
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			body {
				background-color: #fff;
				color: #444;
			}

			a {
				color: #08f;
			}

			#content {
				position: absolute;
				top: 0; width: 100%;
				z-index: 1;
				padding: 3em 0 0 0;
			}

			#c {
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.list-item {
				display: inline-block;
				margin: 1em;
				padding: 1em;
				box-shadow: 1px 2px 4px 0px rgba(0,0,0,0.25);
			}

			.list-item > div:nth-child(1) {
				width: 500px;
				height: 500px;
			}

			.list-item > div:nth-child(2) {
				color: #888;
				font-family: sans-serif;
				font-size: large;
				width: 500px;
				margin-top: 0.5em;
			}
		</style>
	</head>
	<body>
		<?php
      //require("../NavBar/NavBar2.php");
      if($_SESSION['connect'] == True)
      {
      include("connexionGlobale.php");  // Connection à la base de données
			}
    ?>
		<canvas id="c"></canvas>

		<div id="content">
			<div id="menu">
				<select id="selectWaferType">
					<option>---</option>
				</select>
			</div>
			<div id="info"><a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> - multiple elements - webgl</div>
		</div>
		<script src="../AJAX/ajax.js"></script>
		<script src="../libFonctionGlobale.js"></script>
		<script type="module" src="affichageWaferType.js"></script>

	</body>
</html>
