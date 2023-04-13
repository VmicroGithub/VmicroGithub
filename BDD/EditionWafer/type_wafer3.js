//*************************************************************************************************************************//
//Variable Globale
var nbRetX;
var nbRetY;
var typeReticuleSelectionne;
var indexCouleur = 0;
var tailleDeLaDiv = 100;
var taille=0;

var next1 = document.getElementById('next1');
var divInsertionMap = document.getElementById('conteneurMap');
var conteneurSelecteur = document.getElementById('conteneurSelecteur');
var contenuLegende = document.getElementById('legende');
const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

var Cercle = document.getElementById('circle');

var tableau = new Array();
var tableauTypeCouleur = new Array();
var listeCouleurParDefault = new Array();
var positionTheoriqueReticuleX = new Array();
var positionTheoriqueReticuleY = new Array();

listeCouleurParDefault.push("#CCFF00");
listeCouleurParDefault.push("#CCCC00");
listeCouleurParDefault.push("#CC9900");
listeCouleurParDefault.push("#CC6600");
listeCouleurParDefault.push("#CC3300");
listeCouleurParDefault.push("#CC0000");
listeCouleurParDefault.push("#660000");
listeCouleurParDefault.push("#663300");
listeCouleurParDefault.push("#666600");
listeCouleurParDefault.push("#669900");
listeCouleurParDefault.push("#66CC00");
listeCouleurParDefault.push("#66FF00");
listeCouleurParDefault.push("#00FF00");
listeCouleurParDefault.push("#00CC00");
listeCouleurParDefault.push("#009900");
listeCouleurParDefault.push("#006600");
listeCouleurParDefault.push("#003300");


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
function createButton(text, id, conteneur){
  var newButton = document.createElement("input");
  newButton.type = "button";
  newButton.value =  text;
  newButton.id = id;

  conteneur.appendChild(newButton);

  return newButton;
}
function createCheckbox(id, conteneur){
  var newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.id = id;
  newCheckbox.setAttribute('class', 'marqueur');
  newCheckbox.disabled = "disabled";

  conteneur.appendChild(newCheckbox);

  return newCheckbox;
}

function createList(lienAPI, conteneur){
  var retourLigne = document.createElement("br"); // Creation d'un element retour à la ligne

  ajaxGet(lienAPI, function(reponse){
    var listeAvecCouleurs =document.getElementById('listeAvecCouleurs')
    if(listeAvecCouleurs){
      listeAvecCouleurs.innerHTML = ""; //On vide le conteneur
      tableauTypeCouleur.length = 0;
      console.log("tableau"+tableauTypeCouleur);
    }
    else{
      var listeAvecCouleurs = document.createElement("div");
    }
    listeAvecCouleurs.id = "listeAvecCouleurs";

    resultReq = JSON.parse(reponse);
    console.log(resultReq);
    listeAvecCouleurs.innerHTML="";
    typeReticuleSelectionne = resultReq.results['Nom_Type_Reticule'][0];
    resultReq.results['Nom_Type_Reticule'].forEach(function(item, i){
      tableauTypeCouleur.push([item,listeCouleurParDefault[i]]);
      var newButton = createButton(item, "button"+i, listeAvecCouleurs);
      var newCouleur = createInputColor("color"+i, listeCouleurParDefault[i],listeAvecCouleurs);
      var newCheckbox = createCheckbox("checkbox"+i, listeAvecCouleurs);

      if(item == typeReticuleSelectionne){
        newCheckbox.checked = true;
      }

      newCouleur.addEventListener('change', (e)=>{
        //console.log(parseInt(e.target.id.substr(5)));
        //console.log(e.target.value);
        var indexCouleur = parseInt(e.target.id.substr(5));

        tableauTypeCouleur[indexCouleur][1] = e.target.value;
        console.table(tableauTypeCouleur);
        affichageColorMapElement(tableauTypeCouleur,tableau);
      });

      newButton.addEventListener('click', (e)=>{
        console.log(e.target.value);
        typeReticuleSelectionne = e.target.value;
        console.log(e.target);
        console.log(document.querySelectorAll(".marqueur"));
        //On décoche toutes les cases et on les ré actives toutes
        document.querySelectorAll(".marqueur").forEach((checkboxSelected, selecIndex) => {
          checkboxSelected.checked = false;
          checkboxSelected.disabled = false;
        });

        indexAppui = parseInt(e.target.id.substr(6, e.target.id.length));
        console.log(indexAppui);
        console.log(document.getElementById('checkbox'+indexAppui));
        document.getElementById('checkbox'+indexAppui).checked = true;
        document.getElementById('checkbox'+indexAppui).disable = true;
      });
      listeAvecCouleurs.appendChild(retourLigne.cloneNode(true));
    });
    conteneur.appendChild(listeAvecCouleurs);

    autoRemplissage(resultReq.results['Nom_Type_Reticule'][0]);
  });
}

function createInputColor(id, couleur, conteneur){
  var newInputColor = document.createElement("INPUT");
  newInputColor.type = "color";
  newInputColor.value = couleur;
  newInputColor.id = id;
  conteneur.appendChild(newInputColor);

  return newInputColor;
}

function affichageColorMapElement(tableauRefCouleur, tableauReticule){
  tableauRefCouleur.forEach((item, i) => {
    console.log("item = "+item);
    for(var y=nbRetY; y>0; y--){
      for(var x=1; x<=nbRetX; x++){
        //console.log("x:"+x+" y:"+y+" "+tableauReticule[x][y]);
        if(tableauReticule[y][x] != undefined){
          if(item[0] == tableauReticule[y][x]){
            //console.log(document.getElementById("id"+(y.toString()+x.toString())));
            document.getElementById("id"+(x.toString()+y.toString())).style.backgroundColor = item[1];
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

        /*
        indexSelecteur = document.getElementById('selector2').selectedIndex;
        var valeurSelect2 = document.getElementById('selector2').options[indexSelecteur].text;
        */
        console.log(e.target);
        console.log(e.target.id.substr(2));
        var valeurDroite = (parseInt(e.target.id.substr(2), 10)%10);
        var valeurGauche = (parseInt(e.target.id.substr(2), 10)-valeurDroite)/10;
        console.log(valeurGauche);
        console.log(valeurDroite);

        if(tableau[valeurDroite][valeurGauche] == typeReticuleSelectionne){
          tableau[valeurDroite][valeurGauche] = "";
          e.target.style.backgroundColor = "white";
        }
        else {
          tableau[valeurDroite][valeurGauche] = typeReticuleSelectionne;
          console.log(e.target.id+" -> "+ typeReticuleSelectionne);
          //e.target.style.backgroundColor = document.getElementById('ColorRet').value;
          e.target.style.backgroundColor = tableauTypeCouleur[parseInt(e.target.id.substr(2),10)];
        }
        console.table(tableau);
        console.table(tableauTypeCouleur);
        affichageColorMapElement(tableauTypeCouleur,tableau);
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


//Il faut continuer la fonction pour déterminer quels éléments ne sont pas sur le wafer
function autoRemplissage(typeReticuleDeBase){
  console.log(nbRetX);
  console.log(nbRetY);
  console.log(taille);

  positionTheoriqueReticuleX.length = nbRetX*nbRetY;
  positionTheoriqueReticuleY.length = nbRetX*nbRetY;
  //console.log(nbRetX%2);
  for(var y=nbRetY; y>0; y--){
    for(var x=1; x<=nbRetX; x++){

      console.log(typeReticuleDeBase + " x:"+ x + " y:"+y);
      console.log(tableau.length);
      console.log(tableau[y].length);
      tableau[y][x] = typeReticuleDeBase;

      //A faire:

      // - Il faut faire dans le cas ou le nombre est impair
      // - Il y a un problème si le nombre de composant est supérieur ou égal à 10

      if((nbRetX%2)==0){ // Si c'est pair
        //On suppose que la taille du réticule est de 100px
        positionTheoriqueReticuleX[x+(nbRetX*y)] = -((nbRetX/2)*100)+((x-1)*100);
        console.log("positionTheoriqueReticuleX["+x+"]["+y+"]= "+ positionTheoriqueReticuleX[x+(nbRetX*y)]);
      }
      else{
        positionTheoriqueReticuleX[x+(nbRetY*y)] = -(100/2) - (Math.trunc(nbRetX/2)*100) + ((x-1)*100);
        console.log("positionTheoriqueReticuleX["+x+"]["+y+"]= "+ positionTheoriqueReticuleX[x+(nbRetX*y)]);
      }
      if((nbRetY%2)==0){
        positionTheoriqueReticuleY[x+(nbRetX*y)] = -((nbRetY/2)*100)+((nbRetY-y)*100);
        console.log("positionTheoriqueReticuleY["+x+"]["+y+"]= "+ positionTheoriqueReticuleY[x+(nbRetX*y)]);
      }
      else {
        positionTheoriqueReticuleY[x+(nbRetX*y)] = -(100/2) - (Math.trunc(nbRetY/2)*100) + ((nbRetY-y)*100);
        console.log("positionTheoriqueReticuleY["+x+"]["+y+"]= "+ positionTheoriqueReticuleY[x+(nbRetX*y)]);
      }

      var coteHG = [positionTheoriqueReticuleX[x+(nbRetX*y)], positionTheoriqueReticuleY[x+(nbRetX*y)]];
      var coteHD = [positionTheoriqueReticuleX[x+(nbRetX*y)]+100, positionTheoriqueReticuleY[x+(nbRetX*y)]];
      var coteBG = [positionTheoriqueReticuleX[x+(nbRetX*y)], positionTheoriqueReticuleY[x+(nbRetX*y)]+100];
      var coteBD = [positionTheoriqueReticuleX[x+(nbRetX*y)]+100, positionTheoriqueReticuleY[x+(nbRetX*y)]+100];
      //var coteHG = [(valeurCentreCercle[0] - document.getElementById('id'+(x.toString()+y.toString())).offsetLeft), (valeurCentreCercle[1] - document.getElementById('id'+(x.toString()+y.toString())).offsetTop)];
      //var coteHD = [(valeurCentreCercle[0] - document.getElementById('id'+(x.toString()+y.toString())).offsetLeft+100), (valeurCentreCercle[1] - document.getElementById('id'+(x.toString()+y.toString())).offsetTop)];
      //var coteBG = [(valeurCentreCercle[0] - document.getElementById('id'+(x.toString()+y.toString())).offsetLeft), (valeurCentreCercle[1] - document.getElementById('id'+(x.toString()+y.toString())).offsetTop + 100)];
      //var coteBD = [(valeurCentreCercle[0] - document.getElementById('id'+(x.toString()+y.toString())).offsetLeft+100), (valeurCentreCercle[1] - document.getElementById('id'+(x.toString()+y.toString())).offsetTop + 100)];

      //console.log("x:"+x+"&y:"+y);
      //console.log("coteHG"+coteHG);
      //console.log("coteHD"+coteHD);
      //console.log("coteBG"+coteBG);
      //console.log("coteBD"+coteBD);

      var calculRacineHG = Math.sqrt(Math.pow(coteHG[0],2) + Math.pow(coteHG[1],2));
      var calculRacineHD = Math.sqrt(Math.pow(coteHD[0],2) + Math.pow(coteHD[1],2));
      var calculRacineBG = Math.sqrt(Math.pow(coteBG[0],2) + Math.pow(coteBG[1],2));
      var calculRacineBD = Math.sqrt(Math.pow(coteBD[0],2) + Math.pow(coteBD[1],2));

      console.log(calculRacineHG);
      console.log(calculRacineHD);
      console.log(calculRacineBG);
      console.log(calculRacineBD);

      if(calculRacineHG>(taille/2)){
        tableau[y][x]="";
        console.log("INVALID");
      }
      if(calculRacineHD>(taille/2)){
        tableau[y][x]="";
        console.log("INVALID");
      }
      if(calculRacineBG>(taille/2)){
        tableau[y][x]="";
        console.log("INVALID");
      }
      if(calculRacineBD>(taille/2)){
        tableau[y][x]="";
        console.log("INVALID");
      }
    }
    console.table(tableau);
  }

  affichageColorMapElement(tableauTypeCouleur,tableau);
}


//*************************************************************************************************************************//
//Partie du code qui regroupe les événements:

next1.addEventListener('click', function() {
  var valideFormulaire = true;

  var nomWafer = document.getElementById("nom_Wafer").value;
  if(nomWafer== ""){
    document.getElementById("error1").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error1").style.display="none";
  }

  nbRetX = parseInt(document.getElementById('tailleX').value);
  nbRetY = parseInt(document.getElementById('tailleY').value);

  if(isNaN(nbRetX)){
    document.getElementById("error2").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error2").style.display="none";
  }

  if(isNaN(nbRetY)){
    document.getElementById("error3").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error3").style.display="none";
  }
  var tailleWafer = document.getElementById('taille_Wafer').value;
  //Connaitre la taille des réticule pour déterminer si le pas est assez grand ou non.
  var pasEnX = document.getElementById('pas_X').value;
  console.log(pasEnX);

  if(pasEnX == ""){
    document.getElementById("error4").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error4").style.display="none";
  }
  var pasEnY = document.getElementById('pas_Y').value;
  console.log(pasEnY);
  if(pasEnY == ""){
    document.getElementById("error5").style.display="block";
    valideFormulaire = false;
  }
  else {
    document.getElementById("error5").style.display="none";
  }

  if(valideFormulaire == true){
    conteneurSelecteur.innerHTML="";

    $('html, body').animate({scrollTop: 925}, 800);

    divInsertionMap.innerHTML = "";

    var selecteur1 = createSelector("selector1" ,conteneurSelecteur, true);
    console.log(conteneurSelecteur.innerHTML);

    fillSelectorWithRequete('https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST', selecteur1); // Ajoute des options au sélecteur à partir d'une requête

    selecteur1.addEventListener('change', ()=> {
      var indexSelecteur = selecteur1.selectedIndex;
      createList('https://vmicro.fr/database/BDD_1.0/API/api.php?action=getNTRByNTC&nom_C='+selecteur1.options[indexSelecteur].text, conteneurSelecteur);
    });

    var conteneurCouleur = document.createElement("div");
    conteneurCouleur.appendChild(document.createTextNode("Sélectionner une couleur : "));
    /*
    inputColor = createInputColor("ColorRet", conteneurSelecteur);
    conteneurCouleur.appendChild(inputColor);
    conteneurSelecteur.appendChild(conteneurCouleur);
    */

    /*
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

      }
      console.table(tableauTypeCouleur);

      affichageLegende(tableauTypeCouleur, contenuLegende);
      affichageColorMapElement(tableauTypeCouleur,tableau);
    });
    */


    createMapReticule();

    window.addEventListener('resize', ()=>{
      divInsertionMap.style.marginLeft = (((window.innerWidth*0.8)-(nbRetX*tailleDeLaDiv))/2) + "px";
      Cercle.style.marginLeft =(((window.innerWidth*0.8)-taille)/2) + "px";
    });

    boutonValide.addEventListener('click', ()=>{
      var data = new FormData();

      if(valideFormulaire == true){
        console.log(tableau);
        tableau.forEach((a, y) => {
          a.forEach((b, x) => {
            console.log("("+x+","+y+") = " + b);
            data.append('action', 'addTypeWafer');
            data.append('nameWafer', nomWafer);
            data.append('posX',(x-((nbRetX+1)/2))*pasEnX); // Pas sur du calcul du pas X
            data.append('posY',(y-((nbRetY+1)/2))*pasEnY); // Pas sur du calcul du pas Y

            //console.log("x="+x);
            //console.log("nbRetX = " + nbRetX);
            //console.log(nbRetX+1);
            //console.log((nbRetX+1)/2);
            //console.log("pasEnX = "+pasEnX);

            //console.log("y="+y);
            //console.log("nbRetY = " + nbRetY);
            //console.log((nbRetY+1)/2);
            //console.log("pasEnY = "+pasEnY);

            console.log('posX ='+(x-((nbRetX+1)/2))*pasEnX);
            console.log('posY ='+(y-((nbRetY+1)/2))*pasEnY);
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
        //document.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
      }
    });
  }
});

boutonAnnule.addEventListener('click',()=>{
  window.location.href = "../Home/home.php";
});
