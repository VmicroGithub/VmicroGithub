<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <style>
      table{
        border-collapse: collapse;
        /*border: solid 1px black;*/
        display: block;
      }
      thead{
        /*border: solid 1px black;*/
      }
      tr{
        border: solid 1px black;
      }
      td{
        padding: 10px 26px;
        width: 200px;
        text-align: center;
      }
      .buttonActivateClient{
        color: black;
        background-color: green;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .buttonActivateProjet{
        color: black;
        background-color: green;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .buttonActivateParametre{
        color: black;
        background-color: green;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .buttonActivateCategorie{
        color: black;
        background-color: green;
        padding-top: 5px;
        padding-bottom: 5px;
      }
      .supWafer{
        color: black;
        background-color: red;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 15px 40px;        
      }
    </style>
  </head>
  <?php
  require("../NavBar/NavBar2.php");
  if($_SESSION['connect'] == True)
  {
  ?>
    <body>
      <h4> Tableau Client </h4>
      <br>
      <div id="divClient">
        <table>
          <thead>
            <tr>
              <th>
                Index
              </th>
              <th>
                Nom client
              </th>
              <th>
                Activation
              </th>
            </tr>
          </thead>
          <tbody id="tableauClient">
          </tbody>
        </table>
      </div>
      <br>

      <h4> Tableau Projet </h4>
      <br>
      <div id="divProjet">
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
                Client
              </th>
              <th>
                Description
              </th>
              <th>
                Derniere modification
              </th>
              <th>
                Etat
              </th>
              <th>
                Activation
              </th>
            </tr>
          </thead>
          <tbody id="tableauProjet">
          </tbody>
        </table>
      </div>
      <br>

      <h4> Tableau Paramètre </h4>
      <br>
      <div id="divParametre">
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
                Unite
              </th>
              <th>
                Activation
              </th>
            </tr>
          </thead>
          <tbody id="tableauParametre">
          </tbody>
        </table>
      </div>
      <br>

      <h4> Tableau Catégorie </h4>
      <br>
      <div id="divCategorie">
        <table>
          <thead>
            <tr>
              <th>
                Index
              </th>
              <th>
                Nom catégorie
              </th>
              <th>
                Activation
              </th>
            </tr>
          </thead>
          <tbody id="tableauCategorie">
          </tbody>
        </table>
      </div>
      <br>

      <h4> Liste Wafer </h4>
      <br>
      <div id="divCategorie">
        <div class="ligneNavigation">
            <div id="colonne1" class="colonne">
              <div>
                <label>Projet : </label>
                <select id="selecteurProjet">
                  <!--
                  <option>Projet A</option>
                  <option>Projet B</option>
                  <option>Projet C</option>
                  -->
                  
                </select>
              </div>

              <div>
                <label>Wafer :</label>
                <select id="selecteurWafer">
                <option selected>.</option>
                  <!--<option>Wafer 1-1</option>-->
                </select>
              </div>
          <script src="../AJAX/ajax.js"></script>
          <form>
          <input type="button" value="Supprimer le Wafer" id="buttonSupWafer" class="supWafer">
          </form>
      </div>

      <h4> Liste Type Wafer </h4>
      <br>
      <div id="divCategorie">
        <div class="ligneNavigation">
            <div id="colonne1" class="colonne">
              <div>
                <label>Type Wafer : </label>
                <select id="selecteurTypeWafer">
                  <!--
                  <option>Projet A</option>
                  <option>Projet B</option>
                  <option>Projet C</option>
                  -->
                  
                </select>
              </div>
          <script src="../AJAX/ajax.js"></script>
          <form>
          <input type="button" value="Supprimer le Type Wafer" id="buttonSupTypeWafer" class="supWafer">
          </form>
      </div>

      <h4> Liste Type Reticule </h4>
      <br>
      <div id="divCategorie">
        <div class="ligneNavigation">
            <div id="colonne1" class="colonne">
              <div>
                <label>Type Reticule : </label>
                <select id="selecteurTypeReticule">
                  <!--
                  <option>Projet A</option>
                  <option>Projet B</option>
                  <option>Projet C</option>
                  -->
                  
                </select>
              </div>
          <script src="../AJAX/ajax.js"></script>
          <form>
          <input type="button" value="Supprimer le Type Reticule" id="buttonSupTypeReticule" class="supWafer">
          </form>
      </div>

      <h4> Liste Type Composant </h4>
      <br>
      <div id="divCategorie">
        <div class="ligneNavigation">
            <div id="colonne1" class="colonne">
              <div>
                <label>Type Composant : </label>
                <select id="selecteurTypeComposant">
                  <!--
                  <option>Projet A</option>
                  <option>Projet B</option>
                  <option>Projet C</option>
                  -->
                  
                </select>
              </div>
          <script src="../AJAX/ajax.js"></script>
          <form>
          <input type="button" value="Supprimer le Type Composant" id="buttonSupTypeComposant" class="supWafer">
          </form>
      </div>
    </body>
    <script src="../AJAX/ajax.js"></script>
    <script src="reactivation.js"></script>
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
</html>
