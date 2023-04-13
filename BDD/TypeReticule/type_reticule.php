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
      /*height: 100%;*/
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 10px;
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto 10% auto; /* 5% from the top, 15% from the bottom and centered */
      border: 1px solid #888;
      width: 90%; /* Could be more or less, depending on screen size */
    }

    .container {
      padding: 16px;
    }

    /*input[type=text], input[type=number]*/
    .inputPremierePage
    {
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

     #section2{
       background-color: black;
     }

     #rectangle{
       margin: 0 auto;
     }

     .composantRet{
       /*height: 200px;*/
       /*width: 200px;*/
       margin: 30px;
       background-color: white;
       border: 1px solid black;
       display: inline-block;
     }
     .inputComposant{
       width: 60%;
       padding:4px;
       margin: 2px;
     }

     #error1, #error2, #error3, #error4, #error5, #error6, #error7, #error8, #error9, #error10{
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
        <div class="modal-content" id="section1">
          <div class="container">

            <label>Nom type réticule : </label><label id="error1" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nom du type de réticule </label>
            <input type="text" id="nom_Reticule" class="inputPremierePage" required/>
            <br>

            <label>Catégorie : </label><label id="error2" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la catégorie </label>
            <select id="selectorCat"></select>
            <label>Nombre de composant en X : </label><label id="error3" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nombre de composants en X </label>
            <input type="number" min="0" id="tailleX" class="inputPremierePage" required/>
            <br>

            <label>Nombre de composant en Y : </label><label id="error4" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer le nombre de composants en Y </label>
            <input type="number" min="0" id="tailleY" class="inputPremierePage" required/>
            <br>

            <label>Taille X du réticule : (en mm)</label><label id="error5" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la taille du réticule en X</label>
            <input type="number" min="0" id="taille_RetX" class="inputPremierePage" required/>
            <br>

            <label>Taille Y du réticule :  (en mm)</label><label id="error6" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la taille du réticule en Y</label>
            <input type="number" min="0" id="taille_RetY" class="inputPremierePage" required/>
            <br>

            <label> Liste composant :</label>
            <div id="result-requete"></div>
            <br>
            <label>Valeur du pas X entre composant : (en um)</label><label style="color:red; font-size:11px;margin-left:20px;">[Le pas doit être supérieur à la taille du composant]</label>
            <label id="error7" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la valeur du pas en X</label>
            <input type="number" min="0" id="pas_X" class="inputPremierePage" required/>
            <br>

            <label>Valeur du pas Y entre composant : (en um)</label><label style="color:red; font-size:11px;margin-left:20px;">[Le pas doit être supérieur à la taille du composant]</label>
            <label id="error8" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer la valeur du pas en X</label>
            <input type="number" min="0" id="pas_Y" class="inputPremierePage" required/>
            <br>

            <label>Origine 1er composant X : (en um)</label><label id="error9" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer l'origine du premier composant en X</label>
            <input type="number" min="0" id="first_Component_X" class="inputPremierePage" required/>
            <br>

            <label>Origine 1er composant Y : (en um)</label><label id="error10" style="color:red; font-size:11px;margin-left:20px;">Veuillez indiquer l'origine du premier composant en Y</label>
            <input type="number" min="0" id="first_Component_Y" class="inputPremierePage" required/>
            <br>
            <button type="button" class="next" id="next1">Next</button>
          </div>
        </div>

        <div class="modal-content" id="section2">
            <div id="rectangle"></div>
        </div>

        <div class="modal-content" id="section3">
          <div class="container">
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
     <script src="../AJAX/ajax.js"></script>
     <script src="type_reticule.js"></script>
     <script src="../libFonctionGlobale.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </body>
</html>
