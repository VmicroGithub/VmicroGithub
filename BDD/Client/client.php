<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8"/>
      <title>Création client</title>
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
       .buttonDelete{
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
    ?>
    <div id="id01" class="modal">
      <!--<form method="post" class="modal-content" action="creation_Client.php">-->
        <div class="container">
          <label for="name_company">Le nom du client est</label> :
          <input type="text" name="name_company" id="name_client" required/>
          <button type="button" class="valide">Valider</button>
          <button type="button" class="retour"> Retour </button>
        </div>
      <!--</form>-->
      <h4>Liste client </h4>
      <table>
        <thead>
          <tr>
            <th>
              Index
            </th>
            <th>
              Nom client
            </th>
          </tr>
        </thead>
        <tbody id="tableau">
        </tbody>
      </table>
    </div>
    <?php
      $exist = FALSE;
      if($_SESSION['connect'] == True)
      {
        //include("connexionGlobale.php");
        if (!empty($_POST['name_company']))
        {
          //Permet d'éviter de rentrer deux fois la même entreprise dans la base
          //Mais ne marche pas bien car si on est pas rigoureux sur les majuscules
          //etc.. ou le nom exact alors il ne verra pas que c'est les mêmes.
          $reponse = $bdd->query('SELECT Nom_Entreprise from client ORDER BY Nom_Entreprise ASC');
          while($donnees = $reponse->fetch())
          {
            if($donnees['Nom_Entreprise']== $_POST['name_company']) // On teste si le nom existe déjà
            {
              $exist=TRUE;
            }
          }
          $reponse->closeCursor();
          if($exist!=TRUE)
          {
            $req = $bdd->prepare('INSERT INTO client (Nom_Entreprise) VALUES (:Nom_Entreprise)');
            $req->execute(array(
              'Nom_Entreprise' => $_POST['name_company']
            ));
            ?>
            <script> // La commande si dessous doit s'éxécuter en Javascript
            window.location.href = "menu_Creation.php";
            </script>
            <?php
          }
          else // Message d'erreur si l'entreprise existe déjà
          {
            echo "L'entreprise est déjà dans la base de données";
          }
        }
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
      <script src="client.js"></script>
  </body>
</html>
