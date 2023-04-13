<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="fr">

  <head>
    <meta charset="utf-8">
    <style>

      #partie1 {
        display: inline-block;
        width:100%;
        padding:10px;
      }
      #partie2 {
        display: inline-block;
      }
      #partie3 {
        display: inline-block;
      }
      #partie4 {
        display: inline-block;
        width:100%;
      }
      #descriptionReticule{
        display: none;
      }
      #noDescriptionReticule{
        display: block;
      }
      select{
        width: 100%;
      }
    </style>
  </head>
  <body>
    <?php
      require("../NavBar/NavBar2.php");
      if($_SESSION['connect'] == True)
      {
      include("connexionGlobale.php");  // Connection à la base de données
      }
    ?>
    <div id="partie1">
      <label> Sélectionner un wafer type : </label>
      <select id="selectWaferType">
        <option>---</option>
      </select>
    </div>
    <div id="partie2">
      <canvas id="canvas1"></canvas>
    </div>
    <div id="partie3">
      <canvas id="canvas2"></canvas>
    </div>
    <div id="partie4">
      <label> Description du reticule : </label>
      <br>
      <label id="noDescriptionReticule"> Aucune description du reticule  </label>
      <div id="descriptionReticule"></div>
      <br>
      <br>
      <label> Description du composant : </label>
      <br>
      <label> Aucune description du composant  </label>
      <br>
      <br>
    </div>

    <script src="../AJAX/ajax.js"></script>
    <script src="../libFonctionGlobale.js"></script>
    <script src="triptyque.js"></script>
  </body>
</html>
