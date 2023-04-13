<html>
  <head>
    <style>
      .reticule{
        height: 100px;
        width: 100px;
        display: inline-block;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>

    <label>Nombre de réticule en X : </label>
    <input type="number" min="0" name="tailleX" id="tailleX" required/>
    <br>

    <label>Nombre de réticule en Y : </label>
    <input type="number" min="0" name="tailleY" id="tailleY"required/>
    <br>
    <button type="button" class="next" id="next1">Next</button>

    <div id="conteneurSelecteur"></div>
    <div id="conteneurMap"></div>
    <div id="legende">
      <p> Table de correspondance </p>
      </br>
    </div>

    <script src="../AJAX/ajax.js"></script>
    <script src="../libFonctionGlobale.js"></script>
    <script src="SelectAndCheck.js"></script>

  </body>
