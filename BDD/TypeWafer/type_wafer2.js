//*************************************************************************************************************************//
//Variable Globale
var nbRetX;
var nbRetY;
var indexCouleur = 0;
var tailleDeLaDiv = 100;

var next1 = document.getElementById('next1');
var divInsertionMap = document.getElementById('conteneurMap');
var conteneurSelecteur = document.getElementById('conteneurSelecteur');
var contenuLegende = document.getElementById('legende');
const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

var Cercle = document.getElementById('circle');

var tableau = new Array();
var tableauTypeCouleur = new Array();

//*************************************************************************************************************************//
// Partie du code qui regroupe les fonctions:

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

function createInputColor(id, conteneur){
  var newInputColor = document.createElement("INPUT");
  newInputColor.type = "color";
  newInputColor.id = id;
  conteneur.appendChild(newInputColor);

  return newInputColor;
}

function affichageLegende(tableau, conteneur){
  conteneur.innerHTML = ""; // On vide le tableau de légende avant de le re-remplir
  //conteneur.appendChild(document.createTextNode("Légende : "));
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
    //console.log(document.getElementById("section2").offsetHeight);
    document.getElementById("section2").style.height =  (document.getElementById("section2").offsetHeight+(conteneur.offsetHeight)/2)+"px";
  });
}

function affichageColorMapElement(tableauRefCouleur, tableauReticule){
  tableauRefCouleur.forEach((item, i) => {
    for(var y=nbRetY; y>0; y--){
      for(var x=1; x<=nbRetX; x++){
        console.log("x:"+x+" y:"+y+" "+tableauReticule[x][y]);
        if(tableauReticule[x][y] != undefined){
          if(item[0] == tableauReticule[x][y]){
            console.log(document.getElementById("id"+(y.toString()+x.toString())));
            document.getElementById("id"+(y.toString()+x.toString())).style.backgroundColor = item[1];
          }
        }
      }
    }
  });
}

function createMapReticule(){
  var retourLigne = document.createElement("br"); // Creation d'un element retour à la ligne

  tableau.length = nbRetY-1;
  for(var y=nbRetY; y>0; y--){
    tableau[y] = new Array();
    tableau[y].length = nbRetX-1;
    console.log("y="+y);
    for(var x=1; x<=nbRetX; x++){
      console.log("x="+x);
      var divTravail = createDiv(x, y, divInsertionMap);

      /*

      Commentaire :
      -------------
      Permet de coriger dans des inputs la position en X (et/ou) Y mais ne fonctionne pas bien visuellement donc je laisse en commentaire.
      Je pourrais faire une case permettant de "Verifier/Modifier les coordonnées des composants qui lorsqu'elle serait activée déclancherait
      l'affichage des labels et des inputs suivant.

      labelX = document.createElement("label");
      labelX.appendChild(document.createTextNode("X : "));
      inputPositionX = document.createElement("input");
      labelY = document.createElement("label");
      labelY.appendChild(document.createTextNode("Y : "));
      inputPositionY = document.createElement("input");

      labelUnite = document.createElement("label");
      labelUnite.appendChild(document.createTextNode(" (mm)"));

      divTravail.appendChild(labelX);
      divTravail.appendChild(inputPositionX);
      divTravail.appendChild(labelUnite);
      divTravail.appendChild(labelY);
      divTravail.appendChild(inputPositionY);
      divTravail.appendChild(labelUnite.cloneNode(true));

      */

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

        if(tableau[valeurDroite][valeurGauche] == valeurSelect2){
          tableau[valeurDroite][valeurGauche] = "";
          e.target.style.backgroundColor = "white";
        }
        else {
          tableau[valeurDroite][valeurGauche] = valeurSelect2;
          console.log(e.target.id+" -> "+ valeurSelect2);
          e.target.style.backgroundColor = document.getElementById('ColorRet').value;
        }
        console.table(tableau);
      });
    }
    divInsertionMap.appendChild(retourLigne.cloneNode(true));
  }

  var tailleWafer = document.getElementById('taille_Wafer').value;

  if(tailleWafer == 4){
    taille = 1000;
  }
  else {
    taille =  760;
  }
  Cercle.style.width = taille + "px";
  Cercle.style.height = taille + "px";
  document.getElementById("section2").style.height = (taille+180) + "px";// On rajoute

  Cercle.style.marginLeft =(((window.innerWidth*0.8)-taille)/2) + "px";
  console.log(window.innerWidth*0.8);
  console.log((((window.innerWidth*0.8)-taille)/2));

  divInsertionMap.style.marginLeft = (((window.innerWidth*0.8)-(nbRetX*tailleDeLaDiv))/2) + "px";
  divInsertionMap.style.marginTop = (taille+20-(nbRetY*tailleDeLaDiv))/2 + "px";

}

function createDiv(x, y, conteneur){ // Fonction permettant de créer une nouvelle div et de l'intégrer dans une autre div
  var newDiv = document.createElement("div");
  newDiv.id = "id"+(x.toString())+(y.toString());
  newDiv.className = "reticule";
  conteneur.appendChild(newDiv);

  return newDiv;
}


//*************************************************************************************************************************//
//Partie du code qui regroupe les événements:

next1.addEventListener('click', function() {
  conteneurSelecteur.innerHTML="";

  $('html, body').animate({scrollTop: 925}, 800);

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

  var conteneurCouleur = document.createElement("div");
  conteneurCouleur.appendChild(document.createTextNode("Sélectionner une couleur : "));
  //conteneurSelecteur.innerHTML += "Selectionner une couleur : ";
  inputColor = createInputColor("ColorRet", conteneurSelecteur);
  conteneurCouleur.appendChild(inputColor);
  conteneurSelecteur.appendChild(conteneurCouleur);

  selecteur2.addEventListener('change', ()=> {
    var indexSelecteur = selecteur2.selectedIndex;
    console.log(selecteur2.options[indexSelecteur].text);
    tableauTypeCouleur.forEach((ligneRefCouleur, i) => {
      if(selecteur2.options[indexSelecteur].text == ligneRefCouleur[0])
      {
        inputColor.value = ligneRefCouleur[1];
      }
    });
  });

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
  });
  createMapReticule();

  window.addEventListener('resize', ()=>{
    divInsertionMap.style.marginLeft = (((window.innerWidth*0.8)-(nbRetX*tailleDeLaDiv))/2) + "px";
    Cercle.style.marginLeft =(((window.innerWidth*0.8)-taille)/2) + "px";
  });

  boutonValide.addEventListener('click', ()=>{
    var data = new FormData();

    var nomWafer = document.getElementById("nom_Wafer").value;
    var tailleWafer = document.getElementById('taille_Wafer').value;
    var pasEnX = document.getElementById('pas_X').value;
    var pasEnY = document.getElementById('pas_Y').value;

    tableau.forEach((a, x) => {
      a.forEach((b, y) => {
        console.log("("+x+","+y+") = " + b);
        data.append('action', 'addTypeWafer');
        data.append('nameWafer', nomWafer);
        data.append('posX',(x-((nbRetX+1)/2))*pasEnX); // Pas sur du calcul du pas X
        data.append('posY',(y-((nbRetY+1)/2))*pasEnY); // Pas sur du calcul du pas Y
        if(b == undefined){
          data.append('typeReticule', ".");
        }
        else{
          data.append('typeReticule',b);
        }
        data.append('coordXRet',x);
        data.append('coordYRet',y);
        data.append('tailleWafer', tailleWafer);
        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
        ajaxPost(url, data, function(reponse){
          console.log(reponse);
        });
      });
    });
    document.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
  });
});
