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
      button {
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
      }
      .valide{
        background-color: #4CAF50;
      }
      .retour{
        background-color: #112233;
      }
    </style>
  </head>
  <body>
    <?php
    require("../NavBar/NavBar2.php");
    if($_SESSION['connect'] == True)
    {
    ?>
      <input type="hidden" id="type_c_GET" value="<?php echo($_GET['type_c'])?>"/>
      <input type="hidden" id="id_comp_GET" value="<?php echo($_GET['id_comp'])?>"/>

      <div id="id01" class="modal">
        <div class="container">
          <div id="listeParam"></div>
          <button type="button" class="valide">Valider</button>
          <button type="button" class="retour">Retour</button>
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
     <script src="Edit.js"></script>
  </body>
</html>
