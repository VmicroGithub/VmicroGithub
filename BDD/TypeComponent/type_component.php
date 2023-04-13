<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <style>
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

    input[type=text], input[type=number]{
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

     .retour{
       width: 100%;
       padding: 10px 18px;
       background-color: #f44336;
     }

     #error1, #error2, #error3, #error4{
       display: none;
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
          <label>Indiquer la catégorie du composant</label><label id="error1" style="color:red; font-size:11px;margin-left:20px;">Cette catégorie ne peut être choisie</label>
          <select name="nomC" id="nomC">
            <option>---</option>
          </select>
          <label>Indiquer le nom du type du composant: </label><label id="error2" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nom du type de composant </label>
          <input type="text" name ="name_type_component" id="name_type_component" required><!--On crée un champs texte chargé de récuperer la valeur du champs texte qui est le nom du type de composant -->
          </br>

          <!-- On fait une requête au serveur pour trouver le nom du parametre et son unité -->
          <div id="listeParam"></div>

          <label for="tailleX">Indiquez la largeur du composant (X) : en (µm)</label><label id="error4" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la largeur du composant </label>
          <input id="tailleX" type="number" name="tailleX" min="0" required></input>
          <br>

          <label for="tailleY">Indiquez la hauteur du composant (Y) : en (µm)</label><label id="error3" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la hauteur du composant </label>
          <input id="tailleY" type="number" name="tailleY" min="0" required></input>
          <br>

          <button type="button" class="valide">Valider</button>
          <button type="button" class="retour"> Retour </button>
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
     <script src="../AJAX/ajax.js"></script>
     <script src="type_component.js"></script>
  </body>
</html>
