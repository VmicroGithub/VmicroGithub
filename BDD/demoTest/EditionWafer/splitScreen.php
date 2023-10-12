<?php
  session_start();
?>

<html>

  <link rel="stylesheet" href="../EditionWafer/splitScreen.css">
  <?php
    require("../NavBar/NavBar2.php");
    if($_SESSION['connect'] == True)
    {
  ?>
    <body>
    <div class="split left">
      <div class="modal-content" id="section2">
        <div id="conteneurSelecteur">
          <div id="listeAvecCouleurs">
          </div>
        </div>
        <div id="legende"></div>
        <div id="circle"></div>
        <div id="conteneurMap"></div>
      </div>
    </div>

    <div class="split right">
      <div class="centered_vertical">
        <div class="modal-content" id="section1">
          <div class="container">
            <label> Sélectionner un wafer type : </label>
            <select id="selecteurWaferType">
              <option>---</option>
            </select>
          </div>
        </div>
        <div class="modal-content" id ="section3">
          <div class="container">
            <label>Nom du type de Wafer : </label>
            <input type="text" name="nom_Wafer"  id="nom_Wafer" required/>
            <br>

            <label>Indiquer la taille du Wafer : </label>
            <select id="taille_Wafer">
              <option value="4">4 pouces</option>
              <option value="3">3 pouces</option>
            </select>
            <br>

            <label>Nombre de réticule en X : </label>
            <input type="number" min="0" name="tailleX" id="tailleX" required/>
            <br>

            <label>Nombre de réticule en Y : </label>
            <input type="number" min="0" name="tailleY" id="tailleY"required/>
            <br>

            <label>Valeur du pas X: en (mm) </label>
            <input type="number" min="0" name="pas_X" id="pas_X" required/>
            <br>

            <label>Valeur du pas Y: en (mm)</label>
            <input type="number" min="0" name="pas_Y" id="pas_Y" required/>
            <br>

            <button type="button" class="next" id="next1">Generate</button>
          </div>
        </div>
      </div>
    </div>

    <script src="splitScreen.js"></script>
    <script src="../libFonctionGlobale.js"></script>
    <script src="../AJAX/ajax.js"></script>

    </body>
    <?php
    }
    else{
      ?>
      <script> // La commande si dessous doit s'éxécuter en Javascript
      window.location.href = "../Account/pageIdentification.php";
      </script>
      <?php
    }
    ?>
</html>
