<?php
  session_start();
?>

<meta charset="UTF-8">
<!--<link rel="stylesheet" href="../NavBar/styleNavComposant2.css">-->
<link rel="stylesheet" href="../Composant/styleAffichageComposant.css">

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
            require("../NavBar/navComposant2.php");
          ?>
          </div>
          <input type="hidden" id="firstNameUser" value="<?php echo $_SESSION['prenom']; ?>">
          <input type="hidden" id="lastNameUser" value="<?php echo $_SESSION['nom']; ?>">
          <input type="hidden" id="idUser" value="<?php echo $_SESSION['id_user']; ?>">
          <input type="hidden" id="lastComponent" value="<?php echo $_SESSION['lastComponent'];?>">
          <input type="hidden" id="selectedComponent" value="<?php echo $_GET['selectedComponent']; ?>">

          <div id="indicationComposant"></div>

          <!-- Conception de la page qui présente le composant sélectionnée -->
          <div id="mainPageAffichageComposant">
            <div id="historique">
              <!--
              <div style="padding-left:25px; background-color: black; color:white;">
                <h3>Etat Composant</h3>
              </div>

              <div id="conteneurEtatComposant">
                <label>Etat du composant :</label>
                <select>
                  <option>Sur Wafer</option>
                  <option>En manipulation</option>
                  <option>Stocker</option>
                </select>
              -->

                <!--
                <div class="LigneEtatComposant">
                  <div style="margin:auto;">
                    <label>Etat du composant :</label>
                  </div>
                  <div style="margin:auto;">
                    <input type="radio" name="etatWafer" id="onWafer" value="1" checked>
                    <label for = "onWafer" style="margin-right:2vw;">Sur Wafer</label>
                    <input type="radio" name="etatWafer" id="inManipulation" value="2">
                    <label for="inManipulation" style="margin-right:2vw;">En manipulation</label>
                    <input type="radio" name="etatWafer" id="store" value="3">
                    <label for="store" style="margin-right:2vw;">Stocké</label>
                  </div>

                  <div id="separateurEtatComposant"></div>
                  <div style="margin:auto;">
                    <input type="radio" name="mortWafer" id="waferVivant" value="1" checked>
                    <label for="mortWafer" style="margin-right:5vw;" >En vie</label>
                    <input type="radio" name="mortWafer" id="waferMort" value="0">
                    <label for="mortWafer" style="margin-right:5vw;">Mort</label>
                  </div>
                </div>

                <div class="LigneBoitier" style="padding:20px;">
                  <label>Référence du boitier de stockage : </label>
                  <input type="text" id="num_box">

                  <label>X : </label>
                  <input type="number" id="pos_x_box" style="width:2%;">

                  <label>Y : </label>
                  <input type="number" id="pos_y_box" style="width:2%;">

                  <button type="button" id="boutonAjoutBoite">Ajouter à la boite</button>
                </div>
              </div>
              -->
              <div style="padding-left:25px; background-color: black; color:white;">
                <h3> Mesures et Expériences </h3>
              </div>
              <div id="conteneurME">
                <div id="conteneurMEecriture">
                  <div id="ligneMesure">
                    <div>
                      <label>Paramètre mesuré : </label>
                      <select id="selecteurParametre">
                        <option>---</option>
                      </select>
                      <input type="number" id="valeurMesure" step="any" onkeypress="if(event.keyCode==13){}"></input>
                      <label id="uniteeParamMesure"> SU </label>
                    </div>
                    <div>
                      <button type="button" id="boutonMesure" style="width:100%;"> AJOUTER MESURE </button>
                    </div>
                  </div>
                  <div id="separateurMesureExperience"></div>
                  <div id="ligneExperience">
                    <div id="SC1_Experience">
                      <div id="conteneurExperience1">
                        <label> Décrire l'expérience :</label>
                        <textarea id="descriptionExperience" style="height:80px; margin-right:10px;margin-bottom:10px;"></textarea>
                      </div>
                      <div id="conteneurExperience2">
                        <label>Réalisé par :</label>
                        <select id="selecteurAuteurExperience">
                          <option> --- </option>
                        </select>
                        <button type="button" style="width:150px; margin-left:50px;"id="EraseExp">Clear All</button>
                      </div>
                      <div style="display:grid;">
                        <button type="button" id="boutonExperience"> AJOUTER EXPERIENCE </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!--
                <div id="conteneurBouton">
                  <div style="margin:auto; grid-row:1; width:80%;">
                    <button type="button" id="boutonMesure" style="width:100%;"> AJOUTER MESURE </button>
                  </div>
                  <div style="margin:auto; grid-row:5; width:80%;">
                    <button type="button" id="boutonExperience" style="width:100%;"> AJOUTER EXPERIENCE </button>
                  </div>
                </div>
                -->

                <div class="success-checkmark" style="display:none;">
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
                    <label>Mesures/Experiences</label>
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
                      <label>Commentaire réalisé par :</label>
                      <select id="selecteurAuteurCommentaire">
                        <option> --- </option>
                      </select>
                    </div>
                    <div id="commentairePhoto">
                      <label> Ajouter une photo : (Max: 2 Mo) </label>
                      <input type="file" id="selecteurPhoto"/>
                    </div>
                    <div id="commentaireFichier">
                      <label> Ajouter un fichier : </label>
                      <input type="file" id="selecteurFichier"/>
                    </div>
                  </div>
                  <label> Commentaires :</label>
                  <textarea id="descriptionCommentaire" style="height:80px;"></textarea>
                  <div>
                    <button type="button" id="boutonCommentaire" style="width:50%; margin:10px 150px"> AJOUTER COMMENTAIRE </button>
                    <button type="button" id="EraseCommentaire" style="width:15%;"> Clear comment </buton>
                  </div>
                </div>
              </div>

              <div id="editionCommentaire">
                <div style="padding-left:25px; background-color: black; color:white;">
                  <h3> Commentaires </h3>
                </div>
                <div id="ligneEnteteEditionCommentaire">
                  <div id="enteteEditionCommentaire">
                    <label>Commentaires</label>
                  </div>
                  <div id="enteteEditionAuteurCommentaire">
                    <label>Auteur</label>
                  </div>
                  <div id="enteteEditionDateCommentaire">
                    <label>Date</label>
                  </div>
                </div>
                <div id="ligneCorpsEditionCommentaire">
                    <div id="corpsEditionCommentaire" style="display:grid;">
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
        <?php
        }
        else { // Si non connecté alors redirection
        ?>
        <script> // La commande si dessous doit s'éxécuter en Javascript
        window.location.href = "../Account/pageIdentification.php";
        </script>
        <?php
      }
      ?>
        <script>
          //var idComposantMemory = 5005;
        </script>
        <script src="../AJAX/ajax.js"></script>
        <script src="../NavBar/navComposant2.js"></script>
        <script src="affichageComposant.js"></script>
        <script src="https://cdn.rawgit.com/seikichi/tiff.js/master/tiff.min.js"></script>
</html>
