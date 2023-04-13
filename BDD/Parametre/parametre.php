<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <style>
    body {font-family: Arial, Helvetica, sans-serif;}
    .modal{
      /*position: fixed; Ne fonctionne pas avec le menu*/
      z-index: 1;
      left: 0px;
      top: 0px;
      width: 100%;
      /*height: 100%;*/
      background-color: rgb(0,0,0);
      background-color: rgba(21,33,2,0.4);
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
    }
    input[type=text]{
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
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
    table{
      border: solid 1px black;
      display: block;
    }
    tr{
      border: solid 1px black;
    }
    td{
      padding: 10px 26px;
      width: 200px;
      text-align: center;
    }
    .buttonDesactivate{
      color: black;
      background-color: red;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .buttonUpdate {
      display: none;
      color: black;
      background-color: yellow;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .buttonChange{
      color: black;
      background-color: yellow;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    #error1, #error2{
      display: none;
   }
    </style>
  </head>
  <?php
    require("../NavBar/NavBar2.php");
   ?>
  <body>
    <?php
    if($_SESSION['connect'] == True)
    {
      include("connexionGlobale.php"); // On se connecte à la base de données

      ?>
      <div id="id01" class="modal">
        <!--<form method="post" class="modal-content" action="api.php">-->
          <div class="container">
            <label>Indiquer le nom du nouveau paramètre : </label><label id="error1" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nom du parametre </label>
            <input type="text" id ="name_param" required></input>
            <label>Indiquer l'unité du paramètre : </label><label id="error2" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer l'unité du parametre </label>
            <input type="text" id ="unite" required></input>
            <input type="hidden" name="action" value="addPARAM">
            <!--<button type="submit">Valider</button>-->
            <button type="button" class="valide">Valider</button>
            <button type="button" class="retour"> Retour </button>

          </div>
        <!--</form>-->
        <h4>Liste parametres </h4>
        <table>
          <thead>
            <tr>
              <th>
                Index
              </th>
              <th>
                Nom parametre
              </th>
              <th>
                Unité
              </th>
            </tr>
          </thead>
          <tbody id="tableau">
          </tbody>
        </table>
      </div>
      <?php
    }
    else {//Si pas connecté on renvoie à la page d'authentification
      ?>
      <script> // La commande si dessous doit s'éxécuter en Javascript
      window.location.href = "../Account/pageIdentification.php"; // Lorsque le composant est créer on renvoie l'utilisateur vers une autre page (Dans ce cas la page d'accueil : Accueil.php)
      </script>
      <?php
    }
     ?>
     <script src="../AJAX/ajax.js"></script>
     <script src="parametre.js"></script>
  </body>
</html>
