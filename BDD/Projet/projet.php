<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <head>
    <style> /* Code pour gérer l'affichage en CSS */
    body {font-family: Arial, Helvetica, sans-serif;}
    .modal{
      /*position: fixed;*/
      z-index: 1;
      left: 0px;
      top: 0px;
      width: 100%;
      /*height: 100%;*/
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 80px;
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

    input[type=text], [type=message] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
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
     .retour{
       width: 100%;
       padding: 10px 18px;
       background-color: #f44336;
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
    </style>
  </head>
  <body>
    <?php
    require("../NavBar/NavBar2.php");
    if($_SESSION['connect'] == True)
    {
    ?>
    <div id="id01" class="modal">
        <div class="container">
          <label>Indiquer le nom du projet : </label>
          <input type = "text" name = "nom_Projet" id="nom_Projet" required>
          <br>
          <label>Indiquer le nom du client : </label>
          <select class = "menuDeroulantClient">
          </select>
          <br>
          <label>Description ou commentaire sur le projet</label>
          <br>
          <textarea type="message" name="description_Projet" id="description_Projet" row="8" cols="45" required></textarea>
          <br>
          <label> Indiquer l'etat du projet : </label>
          <select name="etat_Projet" id="etat_Projet" required>
            <option value="En cours">En cours</option>;
            <option value="Fini">Fini</option>;
            <option value="Abandonné">Abandonné</option>;
          </select>

          <button type="button" class="valide">Valider</button>
          <button type="button" class="retour"> Retour </button>
        </div>

        <h4>Liste projets </h4>
        <table>
          <thead>
            <tr>
              <th>
                Index
              </th>
              <th>
                Nom Projet
              </th>
              <th>
                Index client
              </th>
              <th>
                Description
              </th>
              <th>
                Dernière modification
              </th>
              <th>
                Etat
              </th>
            </tr>
          </thead>
          <tbody id="tableau">
          </tbody>
        </table>
    </div>
    <?php
    }
    else {
      ?>
      <script> // La commande si dessous doit s'éxécuter en Javascript
      window.location.href = "../Account/pageIdentification.php";
      </script>
      <?php
    }
    ?>
    <script src="../AJAX/ajax.js"></script>
    <script src="projet.js"></script>
  </body>
</html>
