const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');
const next1 = document.getElementById('next1');

var nbRetX;
var nbRetY;

var tableau = new Array();

next1.addEventListener('click',()=>{
  console.log("click next 1");
  $('html, body').animate({
        scrollTop: 925
      }, 800);
  createSelecteurReticule();
  createRepresentationWafer();
});

function createSelecteurReticule(){
  var selecteurCategorie = document.createElement("SELECT");
  selecteurCategorie.id = "selectCat";
  var option;

  var selectionReticuleDiv = document.getElementById("selectionReticule");
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';

  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);
    var tableauDistinct = doublonType1(resultReq.results[0].Nom_categorie,resultReq.results[0].activation);
    console.log(tableauDistinct);
    tableauDistinct[0].forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      selecteurCategorie.appendChild(option);
    });
    selectionReticuleDiv.appendChild(selecteurCategorie);

    //Défini le sélecteur 2 à partir du premier élément du sélecteur 1
    var selecteurComposant = document.createElement("SELECT");
    selecteurComposant.id = "selectComp";
    option = document.createElement('option');
    var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getNTRByNTC&nom_C='+selecteurCategorie.options[0].text;
    console.log(url);
    ajaxGet(url, function(reponse2){
      resultReq2 = JSON.parse(reponse2);
      console.log(resultReq2);
      selecteurComposant.innerHTML="";
      resultReq2.results['Nom_Type_Reticule'].forEach(function(item, i){
        option = document.createElement('option');
        option.appendChild(document.createTextNode(item));
        option.value = item;
        selecteurComposant.appendChild(option);
      });
    });
    selecteurComposant.appendChild(option);
    selectionReticuleDiv.appendChild(selecteurComposant);


    // Redéfini le sélecteur 2 si changement du 2ème sélecteur
    selecteurCategorie.addEventListener('change' , ()=>{
      selecteurComposant.innerHTML="";
      var indexSelecteur = selecteurCategorie.selectedIndex;
      console.log(selecteurCategorie);
      console.log(indexSelecteur);
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getNTRByNTC&nom_C='+selecteurCategorie.options[indexSelecteur].text;
      console.log(url);
      ajaxGet(url, function(reponse2){
        resultReq3 = JSON.parse(reponse2);
        resultReq3.results['Nom_Type_Reticule'].forEach(function(item, i){
          option = document.createElement('option');
          option.appendChild(document.createTextNode(item));
          option.value = item;
          selecteurComposant.appendChild(option);
        });
      });
    });

    selecteurComposant.addEventListener('change', ()=>{
      var indexSelecteur = selecteurComposant.selectedIndex;
      console.log(selecteurComposant.options[indexSelecteur].text);
      afficheCaseCoche(selecteurComposant.options[indexSelecteur].text, nbRetX, nbRetY);
    });

  });
}

//On va regarder si le type de réticule sélectionné dans le selecteur
// est deja utilisé dans le tableau du wafer si oui alors on le coche

function afficheCaseCoche(nomReticule, tailleTabX, tailleTabY){
  for(var x=1; x<=tailleTabX; x++){
    for(var y=1; y<=tailleTabY; y++){
      document.getElementById((x.toString()) + (y.toString())).checked = false;
      /*
      if(tableau[x][y] == nomReticule){
        console.log('(' + x + ';' + y + ')' + tableau[x][y] + '==' + nomReticule);
        document.getElementById((x.toString()) + (y.toString())).checked = true;
      }
      else {
        console.log(tableau[x][y] + '!=' + nomReticule);
        document.getElementById((x.toString()) + (y.toString())).checked = false;
      }
      */
    }
  }
}
//Fonction pour représenter le wafer
function createRepresentationWafer(){

  var Cercle = document.getElementById('circle');
  var currentDiv = document.getElementById('conteneurReticule');
  currentDiv.innerHTML = "";

  var tailleDeLaDiv = 100;
  var tailleWafer = document.getElementById('taille_Wafer').value;
  nbRetX = document.getElementById('tailleX').value;
  nbRetY = document.getElementById('tailleY').value;

  if(tailleWafer == 4){
    taille = 1000;
  }
  else {
    taille =  760;
  }

  Cercle.style.width = taille + "px";
  Cercle.style.height = taille + "px";
  document.getElementById("section2").style.height = (taille+20+60) + "px";// On rajoute

  Cercle.style.marginLeft =(((window.innerWidth*0.8)-taille)/2) + "px";
  console.log(window.innerWidth*0.8);
  console.log((((window.innerWidth*0.8)-taille)/2));



  var retourLigne = document.createElement("br");

  tableau.length = nbRetY;
  for(var y=nbRetY; y>0; y--){
    tableau[y] = new Array();
    tableau[y].length = nbRetX;
    for(var x=1; x<=nbRetX; x++){
      var newDiv = document.createElement("div");

      var indexComposant = document.createElement("label");
      indexComposant.textContent = (x.toString())+(y.toString());

      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.id = (x.toString()) + (y.toString());

      newDiv.style.textAlign = "center";
      newDiv.id = (x.toString()) + (y.toString());
      newDiv.setAttribute('class', 'reticuleWaf');


      newDiv.appendChild(indexComposant);
      newDiv.appendChild(checkbox);

      newDiv.style.width = tailleDeLaDiv + 'px';
      newDiv.style.height = tailleDeLaDiv + 'px';

      currentDiv.appendChild(newDiv);
      console.log("Ajout div");

      checkbox.addEventListener("click",function(e){
        indexSelecteur = document.getElementById('selectComp').selectedIndex;
        console.log(e.target);
        var valeurDroite = (parseInt(e.target.id, 10)%10);
        var valeurGauche = (parseInt(e.target.id, 10)-valeurDroite)/10;

        console.log(valeurGauche);
        console.log(valeurDroite);
        console.log(e.target.id+" -> "+document.getElementById('selectComp').options[indexSelecteur].text);

        tableau[valeurGauche][valeurDroite] = document.getElementById('selectComp').options[indexSelecteur].text;
        console.log(tableau[valeurGauche][valeurDroite]);
        console.log(tableau);
      });
    }
    currentDiv.appendChild(retourLigne.cloneNode(true));
  }
  console.log(nbRetX*tailleDeLaDiv);
  currentDiv.style.marginLeft = (((window.innerWidth*0.8)-(nbRetX*tailleDeLaDiv))/2) + "px";
  currentDiv.style.marginTop = (taille+20-(nbRetY*tailleDeLaDiv))/2 + "px";

}
var pasX = document.getElementById('pas_X');
var pasY = document.getElementById('pas_Y');
