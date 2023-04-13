<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <?php
    if($_SESSION['connect'] == True)
    {
      include("../NavBar/NavBar2.php");
      ?>
      <div>
        <h4> Page d'accueil base de données Vmicro </h4>
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
  </body>
</html>
