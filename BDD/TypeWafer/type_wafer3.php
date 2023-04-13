<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <style> /* Code pour gérer l'affichage en CSS */
    body {font-family: Arial, Helvetica, sans-serif;}

    .modal{
      z-index: 1;
      left: 0px;
      top: 0px;
      width: 100%;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 10px;
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto 10% auto; // 5% from the top, 15% from the bottom and centered
      border: 1px solid #888;
      width: 80%; // Could be more or less, depending on screen size
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

     #error1, #error2, #error3, #error4, #error5, #error6, #error7, #error8, #error9, #error10, #error11{
       display: none;
    }
    #circle {
      position: absolute;
      border-radius: 50%;
      border: 1px solid black;
      height: 0px;
      margin: 0px auto;
      pointer-events: none; //Permet de cliquer
      z-index: 2;
    }
    #conteneurReticule{
      position: auto;
    }

    .reticule{
      height: 100px;
      width: 100px;
      display: inline-block;
      border: 1px solid black;
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
          <label>Indiquer le nom du type de Wafer : </label><label id="error1" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nom du type de wafer </label>
          <input type="text" name="nom_Wafer"  id="nom_Wafer" required/>
          <br>

          <label>Indiquer la taille du Wafer : </label>
          <select id="taille_Wafer">
            <option value="4">4 pouces</option>
            <option value="3">3 pouces</option>
          </select>
          <br>

          <label>Nombre de réticule en X : </label><label id="error2" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nombre de réticule en X</label>
          <input type="number" min="0" name="tailleX" id="tailleX" required/>
          <br>

          <label>Nombre de réticule en Y : </label><label id="error3" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nombre de réticule en Y</label>
          <input type="number" min="0" name="tailleY" id="tailleY"required/>
          <br>

          <label>Valeur du pas X: en (mm) </label><label id="error4" style="color:red; font-size:11px;margin-left:20px;">[Le pas n'est pas renseigné ou doit être supérieur à la taille du réticule]</label>

          <input type="number" min="0" name="pas_X" id="pas_X" required/>
          <br>

          <label>Valeur du pas Y: en (mm)</label><label id="error5" style="color:red; font-size:11px;margin-left:20px;">[Le pas n'est pas renseigné ou doit être supérieur à la taille du réticule]</label>
          <input type="number" min="0" name="pas_Y" id="pas_Y" required/>
          <br>

          <label>Position croix 1 X: en (μm) vis à vis du centre du wafer</label><label id="error6" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C1_X" id="C1_X" required/>
          <br>

          <label>Position croix 1 Y: en (μm) vis à vis du centre du wafer</label><label id="error7" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C1_Y" id="C1_Y" required/>
          <br>

          <label>Position croix 2 X: en (μm) vis à vis du centre du wafer</label><label id="error8" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C2_X" id="C2_X" required/>
          <br>

          <label>Position croix 2 Y: en (μm) vis à vis du centre du wafer</label><label id="error9" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C2_Y" id="C2_Y" required/>
          <br>

          <label>Position croix 3 X: en (μm) vis à vis du centre du wafer</label><label id="error10" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C3_X" id="C3_X" required/>
          <br>

          <label>Position croix 3 Y: en (μm) vis à vis du centre du wafer</label><label id="error11" style="color:red; font-size:11px;margin-left:20px;">[Position croix non renseignée]</label>
          <input type="number" min="0" name="C3_Y" id="C3_Y" required/>
          <br>


          <button type="button" class="next" id="next1">Next</button>
        </div>
      </div>

      <div class="modal-content" id="section2">
        <div id="conteneurSelecteur">
          <div id="listeAvecCouleurs">
          </div>
        </div>
      </div>
      <div class="modal-content" id="section4">
        <div id="legende"></div>
        <div id="circle"></div>
        <div id="conteneurMap"></div>
      </div>

      <div class="modal-content" id="section3">
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
  </body>
  <script src="../AJAX/ajax.js"></script>
  <script src="type_wafer3.js"></script>
  <script src="../libFonctionGlobale.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
