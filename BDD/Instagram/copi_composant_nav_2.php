<?php
  session_start();
?>

<meta charset="UTF-8">
<link rel="stylesheet" href="../Instagram/styleNavComposant3.css">
<link rel="stylesheet" href="../Instagram/styleNavComposant4.css">

<input type="hidden"  id="firstNameUser" value="<?php echo$_SESSION['prenom']; ?>">
<input type="hidden"  id="lastNameUser" value="<?php echo$_SESSION['nom']; ?>">
<input type="hidden"  id="idUser" value="<?php echo$_SESSION['id_user']; ?>">

<div class="ligneNavigation">
  <div id="colonne1" class="colonne">
    <div>
      <label>Projet : </label>
      <select id="selecteurProjet">
        <!--
        <option>Projet A</option>
        <option>Projet B</option>
        <option>Projet C</option>
        -->
        <option selected>.</option>
      </select>
    </div>

    <div>
      <label>Wafer :</label>
      <select id="selecteurWafer">
      <option selected>.</option>
        <!--<option>Wafer 1-1</option>-->
      </select>
      
    </div>

    <div id="ligneRetCompC1">
      <div>
        <label>Réticule :</label>
        <select id="selecteurReticule">
          <option selected>.</option>
        </select>
      </div>
      <div>
        <label>Composant : </label>
        <select id="selecteurComposant">
          <option selected>.</option>
        </select>
      </div>
    </div>
  </div>
  <div id="divEtat">
    
    <label style="font-size: 25px;">Filtre :</label>
    
    <div id="filtre_photo">
      <p><label style="font-size: 12px;">Nombre de photo max :</label></p>
      
      <input type="checkbox" name="etatWafer" id="onWafer" value="1" >
      <label for = "onWafer" style="margin-right:2vw;">1000</label>
    
      <input type="checkbox" name="etatWafer" id="store" value="4" >
      <label for="store" style="margin-right:2vw;">500</label>
    
      <input type="checkbox" name="etatWafer" id="store" value="8" >
      <label for="store" style="margin-right:2vw;">50</label>
    
      <input type="checkbox" name="etatWafer" id="store" value="8">
      <label for="store" style="margin-right:2vw;">10</label>

    </div>
    <div>
      <p><label style="font-size: 12px;">Type composant :</label></p>
        <input type="checkbox" name="etatWafer" id="store" value="11" checked>
        <label for="store" style="margin-right:2vw;">None</label>
      <div id="filtre_type_composant">
        
      </div>
    </div>
  </div>
<script src="../AJAX/ajax.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!--<script src="../Instagram/copi_composant_nav_2.js"></script>-->