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
      margin: 5% auto 5% auto; /* 5% from the top, 15% from the bottom and centered */
      border: 1px solid #888;
      width: 90%; /* Could be more or less, depending on screen size */
    }

    .container {
      padding: 16px;
    }

    input[type=text], [type=number] {
      width: 60%;
      padding: 12px 20px;
      margin: 8px 10px;
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
       width:60%;
       height:2em;
       margin: 8px 0;
       display: inline-block;
       border: 1px solid #ccc;
       box-sizing: border-box;
     }

     button {
       background-color: #4CAF50;
       color: white;
       //padding: 14px 20px;
       margin: 8px 0;
       border: none;
       cursor: pointer;
       width: 20%;
       height: 2em;
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

    <input type="hidden" value="<?php echo $_GET["num_box"];?>" id="num_box">
    <div id="id01" class="modal">

      <div class="modal-content" id ="section1">
        <div class="container">
          <h3>Boite <?php echo $_GET["num_box"]; ?></h3>

          <div style="display:flex;">
            <div style="margin:auto;">
              <label>Expedition : </label>

              <input type="radio" name="etatExpedition" id="expedition_no" value="0" checked>
              <label for = "onWafer" style="margin-right:2vw;">Non</label>

              <input type="radio" name="etatExpedition" id="expedition_yes" value="1">
              <label for = "onWafer" style="margin-right:2vw;">Oui</label>
            </div>
            <div style="margin:auto;width:50%;">
              <div>
                <div id="div_Selecteur_Client" style="display:contents;">
                  <label>Client :</label>
                  <select id="selecteurClient"></select>
                </div>
                <div id="div_New_Client" style="display:none;">
                  <label>Nom : </label>
                  <input type="text" id="name_new_client" style="height:2em;"/>
                </div>
                <button id="btn_expedier">Expédier</button>
              </div>
              <div id="div_Bouton_New_Client" style="display:flex;">
                <button id="btn_new_client" style="width:50%; margin: 8px 15%;">Nouveau Client</button>
              </div>
              <div id="div_Bouton_Old_Client" style="display:none">
                <button id="btn_old_client" style="width:50%; margin: 8px 15%;">Client Projet </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-content" id ="section2">
        <div class="container">
          <table style="width:100%;">
            <thead>
              <tr style="height:30px;">
                <th style="background:rgb(248,248,248);">
                  <span>Position</span>
                </th>
                <th style="background:rgb(248,248,248);">
                  <span>Type wafer</span>
                </th>
                <th style="background:rgb(248,248,248);">
                  <span>Type réticule </span>
                </th>
                <th style="background:rgb(248,248,248);">
                  <span>Type composant</span>
                </th>
                <th style="background:rgb(248,248,248);">
                  <span>Composant</span>
                </th>
                <th style="background:rgb(248,248,248);">
                  <span>Etat</span>
                </th>
              </tr>
            </thead>
            <tbody id="corpsTableauBoite">
            </tbody>
          </table>
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
  <script src="affichageBoite.js"></script>
</html>
