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
            require("../Instagram/copie_nav2.php");
            require("../Instagram/copi_composant_nav_2.php");
          ?>
          </div>
          <input type="hidden" id="firstNameUser" value="<?php echo $_SESSION['prenom']; ?>">
          <input type="hidden" id="lastNameUser" value="<?php echo $_SESSION['nom']; ?>">
          <input type="hidden" id="idUser" value="<?php echo $_SESSION['id_user']; ?>">
          <input type="hidden" id="lastComponent" value="<?php echo $_SESSION['lastComponent'];?>">
          <input type="hidden" id="selectedComponent" value="<?php echo $_GET['selectedComponent']; ?>">

          <div id="indicationComposant"></div>
          <div id="editionCommentaire">
            <div id="ligneaffichagePhoto" >
                <div id="affichagePhoto"  class="test">
                  <!--<div id="com1">Ceci est un commentaire fait dans le php</div>-->
                </div>
              </div>
          </div>

          <div class="success-checkmark" style="display:none;">
                  <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                  </div>
                </div>
              </div>

          <!-- Conception de la page qui présente le composant sélectionnée -->
          
          
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
        <script src="../Instagram/copi_composant_nav_2.js"></script>

</html>

