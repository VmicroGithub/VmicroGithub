<?php
  session_start();
?>

<meta charset="UTF-8">
<link rel="stylesheet" href="../NavBar/styleNavComposant.css">
<link rel="stylesheet" href="../NavBar/styleNavComposant2.css">

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
      </select>
    </div>

    <div>
      <label>Wafer :</label>
      <select id="selecteurWafer">
        <!--<option>Wafer 1-1</option>-->
      </select>
      <label contenteditable="true" id="traitement">Aucun traitement</label>
    </div>

    <div id="ligneRetCompC1">
      <div>
        <label>Réticule :</label>
        <select id="selecteurReticule">
          <option>.</option>
        </select>
      </div>
      <div>
        <label>Composant : </label>
        <select id="selecteurComposant">
          <option>.</option>
        </select>
      </div>
    </div>
    <div id="divClient" style="display:flex">
      <label> Client : </label>
      <label id="affichageNomClient" style="display:none;"> Non défini </label>
      <label id="affichageClientSecret">***SURVOL***</label>
    </div>
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
  <div id="colonne2" class="colonne">
    <table style="height:100%;">
      <tr>
        <td  style="text-align:right;">
          <label>Type wafer : </label>
        </td>
        <td>
          <label id="affichageTypeWafer"> Non défini</label>
        </td>
      </tr>

      <tr>
        <td  style="text-align:right;">
          <label>Type réticule :</label>
        </td>
        <td>
          <label id="affichageTypeReticule"></label>
        </td>
      </tr>

      <tr>
        <td  style="text-align:right;">
          <label>Type composant : </label>
        </td>
        <td>
          <label id="affichageTypeComposant"> Non défini </label>
        </td>
      </tr>

      <tr>
        <td  style="text-align:right;">
          <label>Etat composant : </label>
        </td>
        <td>
          <label id="etatComposant"> Non défini </label>
        </td>
      </tr>
    </table>

    <div id="listMesure">
    </div>

    <!--
    <div style="margin:auto;">
      <a id="lienModifTheoricalValue">Modification des valeurs théoriques</a>
    </div>
    -->

  </div>
  <div id="colonne3" class= "colonne">
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
  <div id="colonne4" class= "colonne">
    <div id="divTypeComposantSurvol">
      <label> Type : </label>
      <label id = "affichageTypeComposantSurvol"></label>
    </div>
    <div id="representationComposant"></div>
    <div style="margin:auto;">
      <input type="radio" name="mortWafer" id="waferVivant" value="1" checked>
      <label for="mortWafer" style="margin-right:5vw;" >En vie</label>
      <input type="radio" name="mortWafer" id="waferMort" value="0">
      <label for="mortWafer" style="margin-right:5vw;">Mort</label>
    </div>
    </div>
  </div>
</div>


<script src="../AJAX/ajax.js"></script>
<script src="navComposant3.js"
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
