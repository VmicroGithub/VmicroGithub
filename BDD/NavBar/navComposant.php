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
      <label> Client : </label>
      <label id="affichageNomClient"> Non défini </label>
    </div>

    <div>
      <label>Type wafer : </label>
      <label id="affichageTypeWafer"> Non défini</label>
    </div>

    <div>
      <label>Type composant : </label>
      <label id="affichageTypeComposant"> Non défini </label>
    </div>

  </div>
  <div id="colonne2" class="colonne">
    <div>
      <label>Wafer :</label>
      <select id="selecteurWafer">
        <!--<option>Wafer 1-1</option>-->
      </select>
    </div>

    <div>
      <label>Réticule :</label>
      <select id="selecteurReticule">
        <option>33</option>
      </select>
    </div>

    <div>
      <label>Type réticule :</label>
      <label id="affichageTypeReticule"></label>
    </div>

    <div>
      <label>Composant : </label>
      <select id="selecteurComposant">
        <option>8</option>
      </select>
    </div>

    <div>
      <label>Coord: </label>
      <label id="affichageCoordonnee"></label>
    </div>
  </div>
  <div id="colonne3" class= "colonne">
    <div id="divTypeReticuleSurvol">
      <label> Type : </label>
      <label id = "affichageTypeReticuleSurvol"></label>
      <br>
      <label> Reticule : </label>
      <label id = "affichageCoordReticuleSurvol"><label>
    </div>
    <div id="representationReticule"></div>
  </div>
  <div id="colonne4" class= "colonne">
    <div id="divTypeComposantSurvol">
      <label> Type : </label>
      <label id = "affichageTypeComposantSurvol"></label>
    </div>
    <div id="representationComposant"></div>
  </div>
</div>
<div id="indicationComposant"></div>

<!-- Conception de la page qui présente le composant sélectionnée -->
<div id="mainPageAffichageComposant">
  <div id="historique">
    <div style="padding-left:25px; background-color: black; color:white;">
      <h3> Ajout manipulation </h3>
    </div>
    <div id="ajout">
      <div id="ajoutMesure">
        <!--<label>La mesure concerne :</label>-->
        <label>Paramètre mesuré : </label>
        <select id="selecteurParametre">
          <option>---</option>
        </select>
        <!--<label style="grid-row:4;"> La valeur de la mesure est : </label>-->
        <label style="grid-row:4;"> Valeur du paramètre : </label>
        <input type="number" id="valeurMesure" step="any" required></input>
        <button type="button" id="boutonMesure"> AJOUTER MESURE </button>
      </div>

      <div id="ajoutExperience">
        <label style="grid-row:1;">Expérience réalisée par :</label>
        <select id="selecteurAuteurExperience" style="grid-row:2;">
          <option> --- </option>
        </select>
        <label style="grid-row:3;"> Décrire l'expérience :</label>
        <textarea id="descriptionExperience" style="height:80px;"></textarea>
        <button type="button" id="boutonExperience"> AJOUTER EXPERIENCE </button>
      </div>

      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
    </div>
    <div id="editionMesureExperience">
      <div style="padding-left:25px; background-color: black; color:white;">
        <h3> Historique </h3>
      </div>
      <div id="ligneEnteteEditionME">
        <div id="enteteEditionME">
          <label>Mesure/Experience</label>
        </div>
        <div id="enteteEditionAuteur">
          <label>Auteur</label>
        </div>
        <div id="enteteEditionDate">
          <label>Date</label>
        </div>
      </div>
      <div id="ligneCorpsEditionME">
        <div id="corpsEditionME">
        </div>
        <div id="corpsEditionAuteur">
        </div>
        <div id="corpsEditionDate">
        </div>
      </div>
    </div>
    <div id="ajoutCommentaire">
      <div style="padding-left:25px; background-color: black; color:white;">
        <h3> Ajout commentaire </h3>
      </div>
      <div id="formulaireCommentaire">
        <div id="partieHauteCommentaire">
          <div id="commentaireAuteur">
            <label>Commentaire réalisée par :</label>
            <select id="selecteurAuteurCommentaire">
              <option> --- </option>
            </select>
          </div>
          <div id="commentairePhoto">
            <label> (*) Ajouter une photo : </label>
            <input type="file" id="selecteurPhoto"/>
          </div>
          <div id="commentaireFichier">
            <label> (*) Ajouter un fichier : </label>
            <input type="file" id="selecteurFichier"/>
          </div>
        </div>
        <label> Commentaire :</label>
        <textarea id="descriptionCommentaire" style="height:80px;"></textarea>
        <button type="button" id="boutonCommentaire"> AJOUTER COMMENTAIRE </button>
      </div>
    </div>

    <div id="editionCommentaire">
      <div style="padding-left:25px; background-color: black; color:white;">
        <h3> Commentaires </h3>
      </div>
      <div id="ligneEnteteEditionCommentaire">
        <div id="enteteEditionCommentaire">
          <label>Commentaire</label>
        </div>
        <div id="enteteEditionAuteurCommentaire">
          <label>Auteur</label>
        </div>
        <div id="enteteEditionDateCommentaire">
          <label>Date</label>
        </div>
      </div>
      <div id="ligneCorpsEditionCommentaire">
          <div id="corpsEditionCommentaire">
            <!--<div id="com1">Ceci est un commentaire fait dans le php</div>-->
          </div>
          <div id="corpsEditionAuteurCommentaire">
            <!--<div id="com1">Guillaume</div>-->
          </div>
          <div id="corpsEditionDateCommentaire">
            <!--<div id="com1">06/10/2020</div>-->
          </div>

      </div>
    </div>
  </div>
</div>

<script src="../AJAX/ajax.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="../NavBar/navComposant.js"></script>
