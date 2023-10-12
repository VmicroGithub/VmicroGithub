<?php
  session_start();
  function deconnexion(){
    echo "deco";
    include("connexionGlobale.php"); // On se connecte à la base de données
    $connect = false; //A l'état de base nous ne sommes pas connecté
    $_SESSION['connect'] = False;      
  }
?>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../NavBar/styleNavBar2.css">
    
    <nav id="menuBar" >
      <input type="hidden" id="user_id" value="<?php echo $_SESSION['id_user'];?>">
      <div class = "logo">
        <a href="https://vmicro.fr/database/BDD_1.0/Home/home.php"><img class="logoVmicro" src="https://vmicro.fr/database/BDD_1.0/NavBar/LogoVmicro2019-VB07.png"></img></a>
      </div>
      <div class="navbar">
        <ul class="nav-links">
          <div class="creaModel">
            <li class="dropdown">
              <a href="#">Creation Modele</a>
              <ul>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Parametre/parametre.php">Parametre</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Categorie/categorie.php">Catégorie</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/TypeComponent/type_component.php">Type de composant</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/TypeReticule/type_reticule.php">Type réticule </a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/TypeWafer/type_wafer3.php">Type wafer</a></li>
                <!--
                <li>
                  <div class="M1SM4">
                    <div class="textM1SM4">Type wafer</div>
                    <div class= underM1SM4>
                      <div>Selectionner blabla:</div>
                      <div id="f"> </div>
                      <button> Valider</button>
                    </div>
                  </div>
                </li>
                <li>
                  <form method="post" class="modal-content" action="creation_Type_Composant2.php">
                    <div class="container">
                      Catégorie de composant:
                      <select name="nomC" id="nomC">
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                      <button type="submit">Valider</button>
                    </div>
                </form>
              </li>
              -->
              </ul>
            </li>
          </div>
          <div class="creaWafer">
            <li><a href="https://vmicro.fr/database/BDD_1.0/Wafer/creation_Wafer.php">Creation Wafer</a></li>
          </div>
          <div class="creaBox">
            <li><a href="https://vmicro.fr/database/BDD_1.0/Boite/creation_Boite.php">Boite</a></li>
          </div>
          <div class="creaInsta">
            <li><a href="https://vmicro.fr/database/BDD_1.0/Instagram/instagram.php">Instagram</a></li>
          </div>
          <!--
          <div class="affModel">
            <li><a href="https://vmicro.fr/database/BDD_1.0/Affichage/triptyque.php">Affichage Modele</a></li>
          </div>
          -->
          <!--
          <div class="editionReticule">
            <li class="dropdown">
              <a href="#">Edition</a>
              <ul>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Affichage/edition.php">Edition reticule</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/EditionWafer/splitScreen.php">Edition wafer</a></li>
              </ul>
            </li>
          </div>
          -->
          <div class="affWafer">
            <li><a href="https://vmicro.fr/database/BDD_1.0/Composant/affichageComposant.php">Affichage composant</a></li>
          </div>
          <div class="admin">
            <li class="dropdown">
              <a href="#">Administration</a>
              <ul>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Client/client.php">Clients</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Projet/projet.php">Projets</a></li>
                <li><a href="https://vmicro.fr/database/BDD_1.0/Reactive/reactivation.php">Re-activation</a></li>
              </ul>
            </li>
          </div>
          

          <form method="post" class="decoForm">
          <button type="submit" name="button1" >Deconnexion</button>
          <?php
            if(isset($_POST['button1'])) {
              session_destroy();
              ?>
              <script>document.location.reload(); </script>
              <?php
            }

          ?>
          </form>
          
        </ul>
      </div>
      <div class ="connection">
        <div class="avatar">
        </div>
      </div>
      <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </nav>
 
    <div class="connectElement">
      <?php echo $_SESSION['prenom'];?>
      <?php echo $_SESSION['nom'];?>
      <?php echo $_SESSION['id_user'];?>
    </div>
    <script src="../AJAX/ajax.js"></script>
    <script src="../NavBar/NavBar2.js"></script>
