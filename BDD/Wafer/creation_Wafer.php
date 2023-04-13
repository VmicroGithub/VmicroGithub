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
    }

    input[type=text], [type=number] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    input[type=checkbox]{
      font-size:10px;
      height: 2em;
      padding: 12px 20px;
      margin: 8px 0;
      display:inline-block;
      border:1px solid #ccc;
    }
     select {
       width:100%;
       height:4em;
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
    </style>
  </head>
  <body>
    <?php
      require("../NavBar/NavBar2.php");
      if($_SESSION['connect'] == True)
      {
      include("connexionGlobale.php");  // Connection à la base de données
      //Creation d'un formulaire pour définir le wafer type
    ?>
    <div id="id01" class="modal">
      <div class="modal-content" id ="section1">
        <div class="container">
          <label>Projet : </label>
          <select id="selectProjet"></select>
          <br>

          <label>Type du wafer :</label>
          <select id="selectTypeWafer"></select>
          <br>

          <label>Run :</label>
          <input type="text" id="num_Run" required/>

          <label>Nom du wafer :</label>
          <input type="text" id="nom_Wafer" required/>
          <br>

          <button type="button" class="valide">Valider</button>
          <button type="button" class="retour"> Retour </button>

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
  </body>
  <script src="../AJAX/ajax.js"></script>
  <script src="creation_Wafer.js"></script>
  <script src="../libFonctionGlobale.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
