<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <style> /* Code pour gérer l'affichage en CSS */
    body {font-family: Arial, Helvetica, sans-serif;}
    .modal{
      /*position: fixed;*/
      z-index: 1;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 10px;
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto 10% auto; /* 5% from the top, 15% from the bottom and centered */
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
    }

    .container {
      padding: 16px;
      background-color: white;
    }
    .spacer{
      height: 15px;
      /*background-color: rgba(0,0,0,0.4);*/
    }

    input[type=text]{
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    input[type=checkbox]{
      font-size: 10px;
      height: 2em;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
    }

     button {
       background-color: #4CAF50;
       color: white;
       padding: 14px 20px;
       margin: 8px 0;
       border: none;
       cursor: pointer;
       width: 100%;
     }

     button:hover {
       opacity: 0.8;
     }

     .retour{
       width: 100%;
       padding: 10px 18px;
       background-color: #f44336;
     }
     .buttonDesactivate{
       max-width:150px;
       color: black;
       background-color: red;
       padding-top: 5px;
       padding-bottom: 5px;
     }
     .buttonUpdate {
       max-width:150px;
       display: none;
       color: black;
       background-color: orange;
       padding-top: 5px;
       padding-bottom: 5px;
     }
     .buttonChange{
       max-width:150px;
       color: black;
       background-color: yellow;
       padding-top: 5px;
       padding-bottom: 5px;
     }
     label{
       padding: 5px;
     }
     #listeNomCategorie{
       /*width:66.6%;*/
     }
     #checkParam{
       /*width:33.3%;*/
     }
     #editCategorie{
       display: grid;
       grid-template-columns: 1fr 1fr;
     }
     #error1{
       display: none;
    }
    </style>
  </head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <body>
    <?php
      require("../NavBar/NavBar2.php");

      if($_SESSION['connect'] == True)
      {
        ?>
        <div id="id01" class="modal">
          <div class="container">
            <div id = "autre"> <!-- On crée un div que l'on pourra faire apparaite lorsque l'on choisi "Autre" dans le menu déroulant. -->
              <label>Nom catégorie</label><label id="error1" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nom de la catégorie </label>
              <input type="text" name = "nom_Nouvelle_Cat" id="nom_Nouvelle_Cat" required><!-- On crée un champs pour indiquer le nom de la nouvelle catégorie -->
              <br>
            </div>
            <label>Paramètres :</label>
            <div id="listeParam">
            </div>
              <button type="button" class="valide">Valider</button>
              <button type="button" class="retour"> Retour </button>
            </div>
            <div class="spacer">
            </div>
            <div class="container">
              <!--
              <h4>Liste catégories</h4>
              <br>

              <table>
                <thead>
                  <tr>
                    <th>
                      Nom Categorie
                    </th>
                    <th>
                      Caracteristiques
                    </th>
                  </tr>
                </thead>
                <tbody id="tableau">
                </tbody>
              </table>
              -->
              <div id="editCategorie">
                <div id="nomCategorie">
                <h4>Liste catégories</h4>
                  <table id='listeNomCategorie'>
                  </table>
                </div>
                <div>
                  <h4>Liste parametres</h4>
                  <div id="checkParam">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
        <script src="../AJAX/ajax.js"></script>
        <script src="categorie.js"></script>
        <script src="../libFonctionGlobale.js"></script>
        <?php
      }
      else { // Si l'on est pas connecté alors on redirige l'utilisateur vers la page d'identification
        ?>
        <script> // La commande si dessous doit s'éxécuter en Javascript
        window.location.href = "../Account/pageIdentification.php";
        </script>
        <?php
      }
    ?>
</html>
