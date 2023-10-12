<?php
  session_start();
?>

<meta charset="UTF-8">
<link rel="stylesheet" href="../NavBar/styleNavComposant.css">
<link rel="stylesheet" href="../NavBar/styleNavComposant2.css">

<input type="hidden"  id="firstNameUser" value="<?php echo$_SESSION['prenom']; ?>">
<input type="hidden"  id="lastNameUser" value="<?php echo$_SESSION['nom']; ?>">
<input type="hidden"  id="idUser" value="<?php echo$_SESSION['id_user']; ?>">
<div id="sidebar" style="overflow-y:scroll;">
<div id="buttonContainer">
  <button id="toggleButton">menu  <span>&uarr;</span></button>
  <span style="margin-right: 10px;"></span>
  <button id="toggleButton2">paramètre <span>&rarr;</span></button>
</div>
<div>
      <label>Projet : </label>
      <select id="selecteurProjet">
        <!--
        <option>Projet A</option>
        <option>Projet B</option>
        <option>Projet C</option>
        -->
      </select>
      <label>Wafer :</label>
      <select id="selecteurWafer">
        <!--<option>Wafer 1-1</option>-->
      </select>
    </div>
  
  <div id="ligne2" class= "ligne">
    <div id="divTypeReticuleSurvol">
      <div>
        <label> Type : </label>
        <label id = "affichageTypeReticuleSurvol"></label>
      </div>
      <div>
        <label> Reticule : </label>
        <label id = "affichageCoordReticuleSurvol"><label>
      </div>
    </div>
    <div id="representationReticule"></div>
    <div id="legendeCouleur"></div>
  </div>
    <div id="ligne3" class="ligne">
    <div class="tabs" style="margin-bottom: 10px;">
    <label for="btncomp">Vues:</label>
        <button class="tab selected" id="btncomp" onclick="switch_tab(1)">Composant</button>

        <button class="tab"id="btnret" onclick="switch_tab(2)">Reticule</button>

      </div>
    <div>
        <label>Rét:</label>
        <select id="selecteurReticule">
          <option>.</option>
        </select>
        <label>Comp : </label>
        <select id="selecteurComposant">
          <option>.</option>
        </select>
      </div>
    </div>
    <div id="ligne4" class="ligne">
    <div>
        
      </div>
    <div id="divTypeComposantSurvol">
      <label> Type : </label>
      <label id = "affichageTypeComposantSurvol"></label>
      <label> Comp : </label>
      <label id = "affichageNomComposantSurvol"></label>
    </div>
    <div id="representationComposant"></div>
    <div style="margin-top:15px;">
    <input type="radio" name="mortWafer" id="waferVivant" value="1" checked>
    <label for="waferVivant" style="margin-right:5vw; cursor: pointer;">En vie</label>
    <input type="radio" name="mortWafer" id="waferMort" value="0">
    <label for="waferMort" style="cursor: pointer;">Mort</label>
</div>

  
    </div>
    <div id="ligne5" class="ligne">
      <div id="divEtat">
      <label>Etat :</label>
      <div>
        <input type="radio" name="etatWafer" id="onWafer" value="1" checked>
        <label for = "onWafer" style="margin-right:2vw;">Sur Wafer</label>
      </div>
      <div>
        <input type="radio" name="etatWafer" id="inManipulation" value="2">
        <label for="inManipulation" style="margin-right:2vw;">En manipulation</label>
      </div>
      <div>
        <input type="radio" name="etatWafer" id="store" value="3">
        <label for="store" style="margin-right:2vw;">Stocké</label>
      </div>
      <div id="extra_box1">
        <div>
          <label>Num boite : </label>
          <input type="text" id="num_box">
        </div>
        <div id="coordBoite">
          <label>Coord : </label>
          <input type="text" id="coord_box" style="width:35px;">
        </div>
      </div>
      <div id="extra_box2" style="margin-right:10px;">
        <button type="button" id="boutonAjoutBoite" style="width:100%;">Ajouter à la boite</button>
        <button type="button" id="boutonVoirBoite" style="width:100%;">Voir la boite</button>
      </div>
    </div>
      
      
    </div>
</div>

</div>


<script src="../AJAX/ajax.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
