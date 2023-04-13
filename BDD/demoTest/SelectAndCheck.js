//*************************************************************************************************************************//
//Variable Globale
var nbRetX;
var nbRetY;
var indexCouleur = 0;

var next1 = document.getElementById('next1');
var divInsertionMap = document.getElementById('conteneurMap');
var conteneurSelecteur = document.getElementById('conteneurSelecteur');
var contenuLegende = document.getElementById('legende');

var tableau = new Array();
var tableauTypeCouleur = new Array();

//*************************************************************************************************************************//
// Partie du code qui regroupe les fonctions:

function afficheVariable(){
  console.log("Le wafer va être composé de " + nbRetX+ " en X");
  console.log("Le wafer va être composé de " + nbRetY + " en Y");
}

function createDiv(x, y, conteneur){ // Fonction permettant de créer une nouvelle div et de l'intégrer dans une autre div
  var newDiv = document.createElement("div");
  newDiv.id = "id"+(x.toString())+(y.toString());
  newDiv.className = "reticule";
  conteneur.appendChild(newDiv);

  return newDiv;
}

function createCheckbox(x, y, conteneur){ // Fonction permettant de créer une checkbox et de l'affecté à une div
  var newCheckbox = document.createElement('input');

  newCheckbox.type = "checkbox";
  newCheckbox.id = "checkbox" + (x.toString()) + (y.toString());
  conteneur.appendChild(newCheckbox);

  return newCheckbox;
}

function fillSelectorWithRequete(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);
    var tableauDistinct = doublonType1(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);
    console.log(tableauDistinct);
    tableauDistinct[0].forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      conteneur.appendChild(option);
    });
  });
}

function fillSelector2(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq);
    conteneur.innerHTML="";
    resultReq.results['Nom_Type_Reticule'].forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      conteneur.appendChild(option);
    });
  });
}

function createSelector(idSelector, conteneur, tiret){
  var newSelector =  document.createElement("SELECT");

  newSelector.id = idSelector;
  if(tiret==true)
  {
    option = document.createElement('option');
    option.appendChild(document.createTextNode("---"));
    newSelector.appendChild(option);
  }

  conteneur.appendChild(newSelector);
  console.log(newSelector.innerHTML);

  return newSelector;
}
function createInputColor(id, conteneur){
  var newInputColor = document.createElement("INPUT");
  newInputColor.type = "color";
  newInputColor.id = id;
  conteneur.appendChild(newInputColor);

  return newInputColor;
}
function createMapReticule(){
  afficheVariable();

  var retourLigne = document.createElement("br"); // Creation d'un element retour à la ligne

  tableau.length = nbRetY-1;
  for(var y=nbRetY; y>0; y--){
    tableau[y] = new Array();
    tableau[y].length = nbRetX-1;
    console.log("y="+y);
    for(var x=1; x<=nbRetX; x++){
      console.log("x="+x);
      var divTravail = createDiv(x, y, divInsertionMap);
      //var checkbox = createCheckbox(x, y, divTravail);

      divTravail.addEventListener("click",function(e){

        //Si le nom dans le tableau = "" sinon mettre un pop up en mode il faut desactivé
        indexSelecteur = document.getElementById('selector2').selectedIndex;
        var valeurSelect2 = document.getElementById('selector2').options[indexSelecteur].text;

        console.log(e.target);
        console.log(e.target.id.substr(2));
        var valeurDroite = (parseInt(e.target.id.substr(2), 10)%10);
        var valeurGauche = (parseInt(e.target.id.substr(2), 10)-valeurDroite)/10;
        console.log(valeurGauche);
        console.log(valeurDroite);

        if(tableau[valeurGauche][valeurDroite] == valeurSelect2){
          tableau[valeurGauche][valeurDroite] = "";
          e.target.style.backgroundColor = "white";
        }
        else {
          tableau[valeurGauche][valeurDroite] = valeurSelect2;
          console.log(e.target.id+" -> "+ valeurSelect2);
          e.target.style.backgroundColor = document.getElementById('ColorRet').value;
        }
        /*
        checkbox.addEventListener("change", function(e){
          var valeurDroite = (parseInt(e.target.id.substr(8), 10)%10);
          var valeurGauche = (parseInt(e.target.id.substr(8), 10)-valeurDroite)/10;
          if(this.checked){
            tableau[valeurGauche][valeurDroite] = "";
            this.checked=false;
          }
          else {
            indexSelecteur = document.getElementById('selector2').selectedIndex;
            tableau[valeurGauche][valeurDroite] = document.getElementById('selector2').options[indexSelecteur].text;
            this.checked=true;
          }
        });
        */
        //document.getElementById("checkbox"+valeurGauche.toString()+valeurDroite.toString()).checked = true;

        console.table(tableau);
      });
    }
    conteneurMap.appendChild(retourLigne.cloneNode(true));
  }
}
function affichageLegende(tableau, conteneur){
  conteneur.innerHTML = ""; // On vide le tableau de légende avant de le re-remplir
  tableau.forEach((item, i) => { // On fait une boucle pour parcourir le tableau d'association couleur
    var divLigneLegend = document.createElement("div"); // On crée une nouvelle div
    var newContent = document.createTextNode(item[0] + "  "); // On affecte la valeur de la colonne 1 du tableau dans une div
    var divCouleur = document.createElement("div"); // On crée une nouvelle div
    divCouleur.style.backgroundColor = item[1]; // On fixe la couleur de la div couleur
    divCouleur.style.height = '10px';
    divCouleur.style.width = '10px';
    divCouleur.style.display = "inline-block";
    divLigneLegend.appendChild(newContent); // Ajout du text dans la div
    divLigneLegend.appendChild(divCouleur); // Ajout de la div qui représente la couleur
    conteneur.appendChild(divLigneLegend);
  });
}
function affichageColorMapElement(tableauRefCouleur, tableauReticule){
  tableauRefCouleur.forEach((item, i) => {
    for(var y=nbRetY; y>0; y--){
      for(var x=1; x<=nbRetX; x++){
        console.log("x:"+x+" y:"+y+" "+tableauReticule[x][y]);
        if(tableauReticule[x][y] != undefined){
          if(item[0] == tableauReticule[x][y]){
            document.getElementById("id"+(x.toString()+y.toString())).style.backgroundColor = item[1];
          }
        }
      }
    }
  });
}
//*************************************************************************************************************************//
//Partie du code qui regroupe les événements:

console.log(next1);
next1.addEventListener('click', function() {
  console.log("hello");
  nbRetX = document.getElementById('tailleX').value;
  nbRetY = document.getElementById('tailleY').value;
  divInsertionMap.innerHTML = "";

  var selecteur1 = createSelector("selector1" ,conteneurSelecteur, true);
  var selecteur2 = createSelector("selector2", conteneurSelecteur, true);
  console.log(conteneurSelecteur.innerHTML);

  fillSelectorWithRequete('https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST', selecteur1); // Ajoute des options au sélecteur à partir d'une requête

  selecteur1.addEventListener('change', ()=> {
    var indexSelecteur = selecteur1.selectedIndex;
    fillSelector2('https://vmicro.fr/database/BDD_1.0/API/api.php?action=getNTRByNTC&nom_C='+selecteur1.options[indexSelecteur].text, selecteur2);
  });
  selecteur2.addEventListener('change', ()=> {
  });
  inputColor = createInputColor("ColorRet", conteneurSelecteur);
  inputColor.addEventListener('change', ()=> {
    var insertionCouleur = true;
    indexSelecteur = document.getElementById('selector2').selectedIndex;
    contenuLegende.innerHTML += document.getElementById('selector2').options[indexSelecteur].text;
    tableauTypeCouleur.forEach((item, i) => {
        if(item[0] == document.getElementById('selector2').options[indexSelecteur].text){
          insertionCouleur = false;
          item[1] = inputColor.value;
        }
    });
    if(insertionCouleur == true){
      tableauTypeCouleur.push([document.getElementById('selector2').options[indexSelecteur].text,inputColor.value]);
    }
    console.table(tableauTypeCouleur);

    affichageLegende(tableauTypeCouleur, contenuLegende);
    affichageColorMapElement(tableauTypeCouleur,tableau);
    // Travail à faire :
    // - Il faut faire une fonction qui affiche une légende c'est à dire le nom du type de réticule avec la couleur associé avec --> OK
    // - Il faut que si la couleur est modifier l'affichage des couleurs sur le wafers soient modifiés. --> OK
    // - Il faut faire une pop up si on coche deux fois la même case
  });

  createMapReticule();
});

afficheVariable();
