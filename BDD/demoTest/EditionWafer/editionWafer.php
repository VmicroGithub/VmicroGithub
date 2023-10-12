<?php
  session_start();
?>

<meta charset="UTF-8">
<link rel="stylesheet" href="../EditionWafer/styleEditionWafer.css">

<!DOCTYPE html>


<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

<html>
  <style>
  </style>
    <?php
    if($_SESSION['connect'] == True)
    {
    ?>
          <div id="conteneurMenu">
          <?php
            require("../NavBar/NavBar2.php");
          ?>
          </div>
          <input type="hidden"  id="firstNameUser" value="<?php echo$_SESSION['prenom']; ?>">
          <input type="hidden"  id="lastNameUser" value="<?php echo$_SESSION['nom']; ?>">
          <input type="hidden"  id="idUser" value="<?php echo$_SESSION['id_user']; ?>">

          <div id="partie1">
            <label> Sélectionner un wafer type : </label>
            <select id="selectWaferType">
              <option>---</option>
            </select>
          </div>

          <div id="affichageWafer">
            <svg id="svgPrincipale">
              <!--<circle id="wafer" cx="200" cy="200" r="200" fill="black"/>-->
              <rect id="meplat" x="0" y="0" width="80" height="1000" fill="white"/>
              <div id="couche_reticule"></div>
            </svg>
          </div>


        <script src="editionWafer.js"></script>
        <script src="../libFonctionGlobale.js"></script>
        <script src="../AJAX/ajax.js"></script>
      <?php
      }
      ?>
</html>
