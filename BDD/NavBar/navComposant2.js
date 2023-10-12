/*
 Ce code Javascript réalise:

  - Le remplissage du sélecteur de projet (F1)

  La fonction start execute au départ les fonctions:
  - F1

*/

//PORCHERIE
var previousValeurTableau = null;
//FIN PORCHERIE
var container = document.querySelector('.container');
var ancienneValeur = [];
let newDivValeurs = [];
var selecteurProjet = document.getElementById("selecteurProjet");
var affichageNomClient = document.getElementById("affichageNomClient");
var selecteurWafer = document.getElementById("selecteurWafer");
var traitement = document.getElementById("traitement");
var affichageTypeWafer = document.getElementById("affichageTypeWafer");
var selecteurReticule = document.getElementById("selecteurReticule");
var representationReticule = document.getElementById("representationReticule");
var selecteurComposant = document.getElementById("selecteurComposant");
var representationComposant = document.getElementById("representationComposant");
var affichageTypeReticule = document.getElementById("affichageTypeReticule");
var affichageTypeComposant = document.getElementById("affichageTypeComposant");
var affichageIDComposant = document.getElementById("indicationComposant");
var affichageNomComposantSurvol =document.getElementById("affichageNomComposantSurvol");
var affichageTypeComposantSurvol = document.getElementById("affichageTypeComposantSurvol");
var divTypeComposantSurvol = document.getElementById("divTypeComposantSurvol");
var colonne2 = document.getElementById("colonne2")
var colonne3 = document.getElementById("colonne3");
var colonne4 = document.getElementById("colonne4");
var divTypeReticuleSurvol = document.getElementById("divTypeReticuleSurvol");
var affichageTypeReticuleSurvol = document.getElementById("affichageTypeReticuleSurvol");
var affichageCoordReticuleSurvol = document.getElementById("affichageCoordReticuleSurvol");
var listMesure = document.getElementById("listMesure");
var legendeCouleur = document.getElementById("legendeCouleur");
var affichageClientSecret = document.getElementById("affichageClientSecret");
var lastComponent = document.getElementById("lastComponent");
var addBox = document.getElementById('boutonAjoutBoite');
var seeBox = document.getElementById('boutonVoirBoite');
var etatWafer = document.getElementsByName("etatWafer");
var mortWafer = document.getElementsByName("mortWafer");
var clickmort=0;
var num_box = document.getElementById("num_box");
var coord_box = document.getElementById("coord_box");
var extra_box1 = document.getElementById("extra_box1");
var extra_box2 = document.getElementById("extra_box2");
var coordBoite = document.getElementById("coordBoite");
var variableGlobaleStockageRequeteProjetList;
var variableGlobaleStockageRequeteWaferByNameProject;
var variableGlobaleStockageRequeteComposant;
var typeReticuleGlobal;
var maxX_Ret = 0;
var maxY_Ret = 0;
var maxX_C = 0;
var maxY_C = 0;
var reticuleSelect;
var retclick=0;
var composantSelect;
var typeComposantMemory;
var idComposantMemory;
var reticuleSurvol;
var composantSurvol;
var tabCouleur = ['00F0DA', '007CF0', '3A00F0', '9100F0', 'E100F0', 'F00087', 'F00054', '5FF000'];
var bufferCouleurReticule = [];
var selectedComponent = document.getElementById("selectedComponent");


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

function creationGridComposant(conteneur, tailleX, tailleY){
  conteneur.innerHTML = "";
  var divRepresentationComposant = document.createElement("div");
  divRepresentationComposant.id = "representationComposant";
  divRepresentationComposant.style.display = "grid";
  divRepresentationComposant.style.gridTemplateColumns = "repeat(" + parseInt(tailleX) + ",1fr)";
  divRepresentationComposant.style.gridTemplateRows = "repeat(" + parseInt(tailleY) + ",1fr)";
  var retx=parseInt(reticuleSelect.id.substr(8,1),16)
  var rety=parseInt(reticuleSelect.id.substr(9,1),16)
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
  console.log("jesuis x ",retx);
  console.log(rety);
  console.log("ui",variableGlobaleStockageRequeteComposant);
  for(var y=1; y <= tailleY; y++){
    for(var x=1; x <= tailleX; x++){
      var composantXY = document.createElement("div");
      composantXY.id = "composant"+x+y;
      composantXY.style.cursor = "pointer";
      composantXY.innerHTML = x.toString() + y.toString() + " : ";
      for(var indexNomTypeComposant=0; indexNomTypeComposant < variableGlobaleStockageRequeteComposant['Nom_Type_C'].length; indexNomTypeComposant++){
        if(variableGlobaleStockageRequeteComposant['Pos_X_Ret'][indexNomTypeComposant] == parseInt(reticuleSelect.id.substr(8,1),16)){
          if(variableGlobaleStockageRequeteComposant['Pos_Y_Ret'][indexNomTypeComposant] == parseInt(reticuleSelect.id.substr(9,1),16)){
            if(variableGlobaleStockageRequeteComposant['Coord_X_C'][indexNomTypeComposant] == x){
              if(variableGlobaleStockageRequeteComposant['Coord_Y_C'][indexNomTypeComposant] == y){
                  composantXY.innerHTML="";
                  composantXY.innerHTML += variableGlobaleStockageRequeteComposant['Nom_Type_C'][indexNomTypeComposant];
                  if(variableGlobaleStockageRequeteComposant['Vivant'][indexNomTypeComposant]==0){
                    composantXY.style.textDecoration = "line-through";
                  }
              }
            }
          }
        }
      }
      composantXY.style.backgroundColor = "white";
      console.log(composantSelect);
      if(composantSelect != undefined){
        if(x == composantSelect.id.substr(9,1)){
          if(y == composantSelect.id.substr(10,1)){
            composantXY.style.backgroundColor = "#F06400";
          }
        }
      }
      composantXY.style.border = "1px solid black";
      composantXY.style.gridColumn = x;
      composantXY.style.gridRow = tailleY-y+1;
      composantXY.addEventListener("click", (e)=>{
        clickComposant(e,retx,rety);
        

      });
      composantXY.addEventListener("mouseover", (e)=>{
        survolComposant(e,retx,rety);
      });
      composantXY.addEventListener("mouseout", (e)=>{
        survolComposant1(e,retx,rety);
      });
      

      divRepresentationComposant.appendChild(composantXY);
    }
  }
  conteneur.appendChild(divRepresentationComposant);
}

function creationGridReticule(conteneur, tailleX, tailleY){
  conteneur.innerHTML = "";
  var divRepresentationReticule = document.createElement("div");
  divRepresentationReticule.id = "representationReticule";
  divRepresentationReticule.style.display = "grid";
  //divRepresentationReticule.style.gridTemplateColumns = "repeat("+parseInt(tailleX+2)+" ,1fr)";
  divRepresentationReticule.style.gridTemplateColumns = "25px repeat(" + parseInt(tailleX+1) + ",1fr)";
  divRepresentationReticule.style.gridTemplateRows = "repeat("+parseInt(tailleY+1)+" ,1fr)";
  var divYX = document.createElement("div");
  divYX.id="YX";
  divYX.style.backgroundColor = "white";
  divYX.style.border = "1px solid black";
  divYX.style.gridColumn = "2";
  divYX.style.gridRow = tailleY+1;
  divYX.style.textAlign = "center";
  divYX.innerHTML ="Y/X";
  divRepresentationReticule.appendChild(divYX);
  var divMeplat = document.createElement("div");
  divMeplat.id = "meplat";
  divMeplat.style.backgroundColor = "grey";
  divMeplat.style.border = "1px solid black";
  divMeplat.style.gridColumn = "1";
  divMeplat.style.gridRowStart = "1";
  divMeplat.style.gridRowEnd = tailleY+2;
  divMeplat.innerHTML = "meplat";
  //divMeplat.style.fontSize = "8px";
  divMeplat.style.textAlign = "center";
  divMeplat.style.writingMode = "vertical-lr";
  divMeplat.style.textOrientation = "upright";
  divRepresentationReticule.appendChild(divMeplat);

  for(var y=0; y < tailleY; y++){
    var iY = document.createElement("div");
    iY.id="Y"+y;
    iY.style.backgroundColor = "white";
    iY.style.border = "1px solid black";
    iY.style.textAlign = "center";
    iY.style.gridColumn = "2";
    iY.style.gridRow = tailleY-y;
    iY.innerHTML = y+1;
    divRepresentationReticule.appendChild(iY);
  }

  for(var x=1; x <= tailleX; x++){
    var iX = document.createElement("div");
    iX.id="X"+x;
    iX.style.backgroundColor = "white";
    iX.style.border = "1px solid black";
    iX.style.textAlign = "center";
    iX.style.gridColumn = x+2;
    iX.style.gridRow = tailleY+1;
    iX.innerHTML = x;
    divRepresentationReticule.appendChild(iX);
  }
  console.log('________________________________');

  bufferCouleurReticule.splice(0, bufferCouleurReticule.length);
  console.log("buffcouleur",bufferCouleurReticule);
  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"]);
  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"].filter(isUnique));
  typeReticuleGlobal = variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"].filter(isUnique);
  afficheLegendeCouleur(typeReticuleGlobal);
  console.log('________________________________');
  for(var y=1; y <= tailleY; y++){
    for(var x=1; x <= tailleX; x++){
      var find=0;
      var reticuleXY = document.createElement("div");
      reticuleXY.id = "reticule"+(x.toString(16)).substr(-16)+(y.toString(16)).substr(-16);
      //Remplissage
      for(var indexComposant=0; indexComposant < variableGlobaleStockageRequeteComposant["Nom_Type_C"].length; indexComposant++){
        if(variableGlobaleStockageRequeteComposant["Pos_X_Ret"][indexComposant] == x){
          //console.log("OK ===> x");
          if(variableGlobaleStockageRequeteComposant["Pos_Y_Ret"][indexComposant] == y){
            //console.log("OK ===> y");
            console.log(typeReticuleGlobal);
            typeReticuleGlobal.forEach((typeReticuleMAP, indexTRM) => {
              if(typeReticuleMAP == variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"][indexComposant]){
                console.log(x+":"+y+": typeReticuleMAP="+typeReticuleMAP+"   &&   "+variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"][indexComposant]);
                reticuleXY.style.backgroundColor = tabCouleur[indexTRM];
                bufferCouleurReticule.push(tabCouleur[indexTRM]);
                //console.log("X="+x et )
                find=1;
              }
            });
            break;
          }
        } 
      }
      if(find==0){
        bufferCouleurReticule.push("222222");
        reticuleXY.style.backgroundColor = "222222";
      }
      else{
        //reticuleXY.style.backgroundColor = "white";
        reticuleXY.style.border = "1px solid black";
        reticuleXY.style.gridColumn = x+2;
        reticuleXY.style.gridRow = tailleY-y+1;
        reticuleXY.style.cursor = "pointer";

        reticuleXY.addEventListener("click", (e)=>{
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          clickReticule(e);
        });
        reticuleXY.addEventListener("mouseover", (e)=>{
          survolReticule(e);
        });
      }

      divRepresentationReticule.appendChild(reticuleXY);
    }
  }
  console.log(bufferCouleurReticule);

  conteneur.appendChild(divRepresentationReticule);
}

function remplissageSelecteurComposant(conteneur, contenu) {
  console.log(contenu);

  conteneur.innerHTML = "";

  var positionXReticuleSelecteur = parseInt(reticuleSelect.id.substr(8, 1), 16);
  var positionYReticuleSelecteur = parseInt(reticuleSelect.id.substr(9, 1), 16);

  var maxX = 0;
  var maxY = 0;

  contenu['ID_Composant'].forEach((composantID, indexComposant) => {
    if (contenu['Pos_X_Ret'][indexComposant] == positionXReticuleSelecteur) {
      if (contenu['Pos_Y_Ret'][indexComposant] == positionYReticuleSelecteur) {

        if (contenu['Coord_X_C'][indexComposant] > maxX) {
          maxX = contenu['Coord_X_C'][indexComposant];
        }
        if (contenu['Coord_Y_C'][indexComposant] > maxY) {
          maxY = contenu['Coord_Y_C'][indexComposant];
        }

        var option = document.createElement('option');
        var coordString = JSON.stringify(contenu['Coord_X_C'][indexComposant]) + JSON.stringify(contenu["Coord_Y_C"][indexComposant]);
        option.appendChild(document.createTextNode(coordString));
        option.value = coordString;
        conteneur.appendChild(option);
        console.log("List" + option.value);
      }
    }
  });

  console.log(maxX);
  console.log(maxY);
  maxX_C = maxX;
  maxY_C = maxY;
  creationGridComposant(representationComposant, parseInt(maxX_C), parseInt(maxY_C));

  console.log(composantSelect);
  if (composantSelect == undefined) {
    composantSelect = document.getElementById("composant" + contenu['Coord_X_C'][0] + contenu['Coord_Y_C'][0]);
  } else {
    for (var indexNomTypeComposant = 0; indexNomTypeComposant < contenu['Nom_Type_C'].length; indexNomTypeComposant++) {
      if (contenu['Pos_X_Ret'][indexNomTypeComposant] == positionXReticuleSelecteur) {
        if (contenu['Pos_Y_Ret'][indexNomTypeComposant] == positionYReticuleSelecteur) {
          if (contenu['Coord_X_C'][indexNomTypeComposant] == composantSelect.id.substr(9, 1)) {
            if (contenu['Coord_Y_C'][indexNomTypeComposant] == composantSelect.id.substr(10, 1)) {
              composantSelect = document.getElementById("composant" + contenu['Coord_X_C'][indexNomTypeComposant] + contenu['Coord_Y_C'][indexNomTypeComposant]);
              selecteurComposant.value = contenu['Coord_X_C'][indexNomTypeComposant] + contenu['Coord_Y_C'][indexNomTypeComposant];
              break;
            }
          }
        }
      }
    }
  }
  composantSelect.style.backgroundColor = "#F06400";

  // Triez les options du sélecteur avec une fonction de comparaison personnalisée
  var options = Array.from(conteneur.options);
  options.sort((a, b) => {
    const aStart = a.value.charAt(0);
    const bStart = b.value.charAt(0);

    return aStart.localeCompare(bStart);
  });

  conteneur.innerHTML = '';
  options.forEach(option => conteneur.appendChild(option));

  remplissageTypeComposant(affichageTypeComposant, contenu, positionXReticuleSelecteur, positionYReticuleSelecteur);
  affichageTypeComposant.style.fontSize = "12px";
}


function afficheLegendeCouleur(typeReticuleGlobal){

  legendeCouleur.innerHTML = ""; // On efface ce qui existe deja

  typeReticuleGlobal.forEach((nom_type_c, index_ntc) => {

    var newDiv = document.createElement("div");
    newDiv.style.display = "grid";
    newDiv.style.gridTemplateColumns = "1fr 20px";
    newDiv.style.textAlign = "center";

    var newContent = document.createTextNode(nom_type_c);
    newDiv.appendChild(newContent);

    var newDivCouleur = document.createElement("div");
    newDivCouleur.style.backgroundColor = tabCouleur[index_ntc];
    newDivCouleur.style.width = "10px";
    newDivCouleur.style.height = "10px";
    newDivCouleur.style.margin = "auto";

    newDiv.appendChild(newDivCouleur);

    legendeCouleur.appendChild(newDiv);
  });

}

function remplissageSelecteurReticule(conteneur, contenu){
  //console.log(contenu);

  conteneur.innerHTML = ""; // On vide le conteneur qui est le sélecteur de réticule

  var option = document.createElement('option'); // On crée un élément option
  option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][0]+" / "+contenu['Pos_Y_Ret'][0])); // On ajoute à l'élément option un texte qui contient le x et y du premier trouvé dans le contenu
  option.value = contenu['Pos_X_Ret'][0]+"/"+contenu['Pos_Y_Ret'][0]; // On défini la valeur de l'option comme étant le x et y du première élément de contenu
  conteneur.appendChild(option); // on ajoute l'option au conteneur

  var maxX = contenu['Pos_X_Ret'][0];
  var maxY = contenu['Pos_Y_Ret'][0];
  var maxX = Math.max.apply(null, contenu['Pos_X_Ret'].map(Number));
  var maxY = Math.max.apply(null, contenu['Pos_Y_Ret'].map(Number));

  contenu['ID_Composant'].forEach((id, indexID) => {
    if(indexID > 0){

      var valeurReticule = (parseInt(contenu['Pos_X_Ret'][indexID])*10) + parseInt(contenu['Pos_Y_Ret'][indexID]);
      var valeurAncienneReticule = (parseInt(contenu['Pos_X_Ret'][indexID-1])*10) + parseInt(contenu['Pos_Y_Ret'][indexID-1]);

      if(valeurReticule != valeurAncienneReticule){
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][indexID]+" / "+contenu['Pos_Y_Ret'][indexID]));
        option.value = contenu['Pos_X_Ret'][indexID]+"/"+contenu['Pos_Y_Ret'][indexID];
        conteneur.appendChild(option);
      }
    }
  });
  console.log(maxX);
  console.log(maxY);

  maxX_Ret = maxX;
  maxY_Ret = maxY;

  creationGridReticule(representationReticule, parseInt(maxX), parseInt(maxY));
if(retclick!=0){
  reticuleSelect=document.getElementById(retclick.id);
  reticuleSelect.style.backgroundColor = "#F06400";
}else{
  reticuleSelect = document.getElementById("reticule"+contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]);
  reticuleSelect.style.backgroundColor = "#F06400";
}
  // PORCHERIE GRUI GRUI
  previousValeurTableau = (contenu['Pos_Y_Ret'][0]-1)*maxY_Ret + contenu['Pos_X_Ret'][0] - 1;

  remplissageNomTypeReticule(affichageTypeReticule, contenu['Pos_X_Ret'][0],contenu['Pos_Y_Ret'][0], contenu);
  remplissageSelecteurComposant(selecteurComposant, contenu);
  retclick=0;
}

function loadComponent(nomWafer){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComponentOnWaferImprove&nom_wafer='+nomWafer;
  console.log(url);
  ajaxGet(url, function(reponseComponentList){
    listComponent = JSON.parse(reponseComponentList);
    console.log(listComponent);
    console.log(listComponent['results'][0]);
    if(listComponent['results'][0]!=null){
      console.log("Différent de null");
      variableGlobaleStockageRequeteComposant = listComponent['results'][0];
      console.log(variableGlobaleStockageRequeteComposant);
      remplissageSelecteurReticule(selecteurReticule, listComponent['results'][0]);
    }
    else {
      //selecteur réticule ---
      var option = document.createElement('option');
      option.appendChild(document.createTextNode("---"));
      selecteurReticule.innerHTML = "";
      selecteurReticule.appendChild(option);

      //selecteur composant ---
      var option = document.createElement('option');
      option.appendChild(document.createTextNode("---"));
      selecteurComposant.innerHTML = "";
      selecteurComposant.appendChild(option);

      representationComposant.innerHTML = "";
      representationReticule.innerHTML = "";
    }

  });

}

function remplissageTypeReticuleSurvol(conteneur, contenu, valeurXReticule, valeurYReticule){
  //console.log("valeurXReticule = "+valeurXReticule);
  //console.log("valeurYReticule = "+valeurYReticule);
  for(var indexNomTypeReticule=0; indexNomTypeReticule < contenu['Nom_Type_Reticule'].length; indexNomTypeReticule++){
    if(contenu['Pos_X_Ret'][indexNomTypeReticule] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexNomTypeReticule] == valeurYReticule){
            //console.log(contenu['Nom_Type_Reticule'][indexNomTypeReticule])
            conteneur.innerHTML = "";
            conteneur.innerHTML = contenu['Nom_Type_Reticule'][indexNomTypeReticule];
            break;
      }
    }
  }
}

function remplissageTypeComposantSurvol(conteneur,conteneur2, contenu, valeurXComposant, valeurYComposant,retx,rety){
  
  var valeurXReticule =retx;
  var valeurYReticule =rety;
  for(var indexNomTypeComposant=0; indexNomTypeComposant < contenu['Nom_Type_C'].length; indexNomTypeComposant++){
    if(contenu['Pos_X_Ret'][indexNomTypeComposant] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexNomTypeComposant] == valeurYReticule){
        if(contenu['Coord_X_C'][indexNomTypeComposant] == valeurXComposant){
          if(contenu['Coord_Y_C'][indexNomTypeComposant] == valeurYComposant){
            //console.log(contenu['Nom_Type_C'][indexNomTypeComposant])
            conteneur.innerHTML = "";
            conteneur.innerHTML = contenu['Nom_Type_C'][indexNomTypeComposant];
            conteneur2.innerHTML="";
            conteneur2.innerHTML=valeurXComposant + valeurYComposant;
          }
        }
      }
    }
  }
}

function remplissageTypeComposant(conteneur, contenu,retx,rety){
  //console.log(contenu);
  var valeurXReticule =retx;
  var valeurYReticule =rety;
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  console.log(selecteurReticule.value);
  var valeurXComposant = selecteurComposant.value.substr(0,1);
  var valeurYComposant = selecteurComposant.value.substr(1,2);

  for(var indexNomTypeComposant=0; indexNomTypeComposant < contenu['Nom_Type_C'].length; indexNomTypeComposant++){
    if(contenu['Pos_X_Ret'][indexNomTypeComposant] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexNomTypeComposant] == valeurYReticule){
        if(contenu['Coord_X_C'][indexNomTypeComposant] == valeurXComposant){
          if(contenu['Coord_Y_C'][indexNomTypeComposant] == valeurYComposant){
            //console.log(contenu['Nom_Type_C'][indexNomTypeComposant])
            conteneur.innerHTML = "";

            conteneur.innerHTML = "R"+selecteurReticule.value;
            conteneur.innerHTML +="_";
            conteneur.innerHTML += "C"+selecteurComposant.value;
            conteneur.innerHTML +="_";
            console.log("R"+contenu['Pos_X_Ret'][indexNomTypeComposant]+contenu['Pos_X_Ret'][indexNomTypeComposant]);
            console.log("C"+contenu['Pos_X_C'][indexNomTypeComposant]+contenu['Pos_X_C'][indexNomTypeComposant]);

            conteneur.innerHTML += contenu['Nom_Type_C'][indexNomTypeComposant];
            typeComposantMemory = contenu['Nom_Type_C'][indexNomTypeComposant];
            //console.log(contenu['ID_Composant'][indexNomTypeComposant]);
           // affichageIDComposant.innerHTML = "";
            //affichageIDComposant.innerHTML = "ID Composant => "+contenu['ID_Composant'][indexNomTypeComposant];
            idComposantMemory = contenu['ID_Composant'][indexNomTypeComposant];

            var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=setCurrentComponent&id_comp='+idComposantMemory;
            console.log(url);
            ajaxGet(url, function(reponseSetCurrentComponent){
              console.log(JSON.parse(reponseSetCurrentComponent));
            });

            console.log(idComposantMemory);
            //lancementPagePrincipale(contenu['ID_Composant'][indexNomTypeComposant]);
            lancementPagePrincipale();
            affichageLastMesure(listMesure);
            //creationLienModifTheoricalValue(contenu['Nom_Type_C'][indexNomTypeComposant]);
          }
        }
      }
    }
  }
}

function remplissageCoordonnneReticuleSurvol(conteneur, valeurXReticule, valeurYReticule){
  conteneur.innerHTML = "";
  conteneur.innerHTML = String(valeurXReticule)+" / "+ String(valeurYReticule);
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  console.log(valeurXReticule);
  console.log(valeurYReticule);
  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
}

function remplissageNomTypeReticule(conteneur, valeurXReticule, valeurYReticule, contenu){
 

  for(var indexTypeReticule = 0; indexTypeReticule < contenu['Nom_Type_Reticule'].length; indexTypeReticule++){
    if(contenu['Pos_X_Ret'][indexTypeReticule] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexTypeReticule] == valeurYReticule){
        console.log(contenu['Nom_Type_Reticule'][indexTypeReticule]);
        conteneur.innerHTML = "";
        conteneur.innerHTML = contenu['Nom_Type_Reticule'][indexTypeReticule];
        conteneur.style.fontSize = "12px";
        break;
      }
    }
  }
}

function remplissageNomTypeWafer(conteneur, contenu){
  conteneur.innerHTML = "";
  conteneur.innerHTML = contenu;
  conteneur.style.fontSize = "12px";
}

function remplissageSelecteurWafer(conteneur, nomProjet, value){
   var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getWaferByNameProject&nom_projet='+nomProjet;
   ajaxGet(url, function(reponseWaferList){
     listWafer = JSON.parse(reponseWaferList);
     console.log(listWafer);
     console.log(listWafer.results['Nom_Wafer']);

     conteneur.innerHTML = "";
     listWafer.results[0]['Nom_Wafer'].forEach((nomWafer, indexWafer) => {
       var option = document.createElement('option');
       option.appendChild(document.createTextNode(nomWafer));
       option.value = nomWafer;
       if(nomWafer == value){
         option.selected="selected";
       }

       if(value != null){
         if(nomWafer == value){
          console.log("test1111111111111111222    " +  value);
           remplissageNomTypeWafer(affichageTypeWafer,listWafer.results[0]['Nom_Type_Wafer'][indexWafer]);
           loadComponent(listWafer.results[0]['Nom_Wafer'][indexWafer]);
         }
       }
       conteneur.appendChild(option);
     });

     variableGlobaleStockageRequeteWaferByNameProject = listWafer.results[0];
     if(value == null) {
      console.log("test11333333333333333    " +  value);
       remplissageNomTypeWafer(affichageTypeWafer,);
       loadComponent(listWafer.results[0]['Nom_Wafer'][0]);
     }

   });
}

function remplissageNomClient(conteneur, contenu){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
  ajaxGet(url,function(reponseClientList){
    listClient = JSON.parse(reponseClientList);
    console.log(listClient.results[0]);
    listClient.results[0]["Nom_client"].forEach((nomClient, indexClient) => {
      console.log("contenu = "+contenu+" == indexClient="+indexClient);

      if(contenu == listClient.results[0]["id_client"][indexClient]){
        conteneur.innerHTML = "";
        conteneur.innerHTML = nomClient;
      }
    });

  });
}

function remplissageSelecteurProjet(conteneur){

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST';
  ajaxGet(url,function(reponseProjetList){
    listProjet = JSON.parse(reponseProjetList);
    console.log(listProjet.results[0]);
    listProjet.results[0]["Nom_projet"].forEach((nomProjet, indexProjet) => {
      if(listProjet.results[0].activation[indexProjet] != 0){
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(nomProjet));
        option.value = nomProjet;
        conteneur.appendChild(option);
      }
    });

    //remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][0]);
    variableGlobaleStockageRequeteProjetList = listProjet.results[0];
    console.log("remplissageSelecteurWafer");
    remplissageSelecteurWafer(selecteurWafer ,listProjet.results[0]["Nom_projet"][0])
  });
}

function remplissageBarNavigationWithID(){
  if(selectedComponent.value !=""){
    console.log("SelectedComponent="+selectedComponent.value);
    var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllNavDataWithIdComponent&id_comp='+selectedComponent.value;
    ajaxGet(url,function(reponseAllInfo){
      listeInfo = JSON.parse(reponseAllInfo);
      console.log(listeInfo);

      selecteurProjet.value=listeInfo.results[5];
      traitement.innerHTML="";
      traitement.innerHTML=listeInfo.results[10];
      setTimeout(function(){
        console.log("remplissageSelecteurWafer");
        remplissageSelecteurWafer(selecteurWafer,listeInfo.results[5],listeInfo.results[0]);

        console.log("listwaf",variableGlobaleStockageRequeteWaferByNameProject);
        variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
          console.log("nomWafer = "+ nomWafer+ " && selecteurWafer.value = "+selecteurWafer.value);
          if(nomWafer == selecteurWafer.value){
            remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
            //loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);
          }
        });

       // remplissageNomClient(affichageNomClient, listeInfo.results[6]);
        setTimeout(function(){

          selecteurReticule.value = listeInfo.results[2]+ listeInfo.results[3]; // Rempli le sélecteur Réticule
          changementReticule(); //Modification sur la map reticule

          selecteurComposant.value = listeInfo.results[8]+ listeInfo.results[9]; // Rempli le sélecteur Composant
          changementComposant(); //Modification sur la map composant
        },300);
      },300);

    });
  }
  else {
    if(lastComponent.value != undefined){
      console.log("SOLUTION 2");
      console.log("lastComponent ="+ lastComponent.value);
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllNavDataWithIdComponent&id_comp='+lastComponent.value;
      ajaxGet(url,function(reponseAllInfo){
        listeInfo = JSON.parse(reponseAllInfo);
        console.log(listeInfo);

        selecteurProjet.value=listeInfo.results[5];

        setTimeout(function(){
          console.log("remplissageSelecteurWafer");
          remplissageSelecteurWafer(selecteurWafer,listeInfo.results[5],listeInfo.results[0]);

          console.log(variableGlobaleStockageRequeteWaferByNameProject);
          variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
            console.log("nomWafer = "+ nomWafer+ " && selecteurWafer.value = "+selecteurWafer.value);
            if(nomWafer == selecteurWafer.value){
              remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
              //loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);
            }
          });

          //remplissageNomClient(affichageNomClient, listeInfo.results[6]);
          setTimeout(function(){

            selecteurReticule.value = listeInfo.results[2]+ listeInfo.results[3]; // Rempli le sélecteur Réticule
            changementReticule(); //Modification sur la map reticule
            
            selecteurComposant.value = listeInfo.results[8]+ listeInfo.results[9]; // Rempli le sélecteur Composant
            changementComposant(); //Modification sur la map composant
          },0);
        },0);

      });
    }
  }
}



var typicalMesure; // Déclaration de la variable en dehors de toutes les fonctions

function affichageLastMesure(conteneur) {
  console.log("affichageLastMesure");
  conteneur.style.display = "grid";
  newDivValeurs = [];
  ancienneValeur = [];

  function creerEntete() {
    var newEnteteDiv = document.createElement("div");
    newEnteteDiv.style.display = "grid";
    newEnteteDiv.style.gridTemplateColumns = "10px 72px repeat(2,1fr)";
    newEnteteDiv.style.backgroundColor = "#e1f0ff52";
    newEnteteDiv.style.border = "1px solid black";

    var newDivEnteteLogo = document.createElement("div");
    newDivEnteteLogo.style.margin = "auto";
    newDivEnteteLogo.style.width = "10px";
    newDivEnteteLogo.style.gridColumn = "1";

    var newDivEnteteParametre = document.createElement("div");
    newDivEnteteParametre.style.gridColumnStart = "2";
    newDivEnteteParametre.style.gridColumnEnd = "4";
    newDivEnteteParametre.style.margin = "0 auto";
    newDivEnteteParametre.innerHTML = "Parametres";

    var newDivEnteteDefault = document.createElement("div");
    newDivEnteteDefault.style.gridColumn = "4";
    newDivEnteteDefault.style.borderLeft = "1px solid black";

    var baliseA = document.createElement("a");
    baliseA.id = "lienModifTheoricalValue";
    baliseA.innerHTML = "Default";

    newDivEnteteDefault.appendChild(baliseA);

    newEnteteDiv.appendChild(newDivEnteteLogo);
    newEnteteDiv.appendChild(newDivEnteteParametre);
    newEnteteDiv.appendChild(newDivEnteteDefault);

    return newEnteteDiv;
  }

  conteneur.innerHTML = "";
  var index = 0;
  var enteteDiv = creerEntete();
  conteneur.appendChild(enteteDiv);

  var url =
    'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getTypicalMesure&ID_Composant=' +
    idComposantMemory;

  ajaxGet(url, function (reponseTypicalMesure) {
    var i = 0;
    typicalMesure = JSON.parse(reponseTypicalMesure); // Affectation de la valeur
    console.log("LE 1");
    console.log(typicalMesure);

    var gridDiv = document.createElement("div");
    gridDiv.style.display = "grid";
    gridDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    gridDiv.style.gridGap = "10px";

    typicalMesure.results[0]["Nom_Parametre"].forEach(function (
      nomTypicalParametre,
      indexTypicalParametre
    ) {
      var newIndex = index;
      var newDiv = document.createElement("div");
      newDiv.id = "ligneAffichageTypicalMesure" + indexTypicalParametre;
      newDiv.style.display = "grid";
      newDiv.style.gridTemplateColumns = "10px 150px repeat(2,1fr)";

      var newDivLogo = document.createElement("div");
      newDivLogo.style.margin = "auto";
      newDivLogo.style.width = "10px";
      newDivLogo.style.height = "10px";
      newDivLogo.style.borderRadius = "5px";
      newDivLogo.style.gridColumn = "1";

      var newDivParametre = document.createElement("div");
      var newContent = document.createTextNode(nomTypicalParametre + " : ");
      newDivParametre.style = "text-align:right";
      newDivParametre.style.gridColumn = "2";
      newDivParametre.appendChild(newContent);

      var newDivValeur = document.createElement("textarea");
      newDivValeur.addEventListener("blur", function () {
        // Vérifier si la touche "Ctrl" et la touche "E" sont enfoncées simultanément
        enregistrerValeursTextarea();
      });
      newDivValeur.rows = 1;
      newDivValeur.cols = 20;

      newDivValeur.style.resize = "none";
      newDivValeur.style.gridColumn = "3";
      newDivValeur.style.marginLeft = "2px";
      newDivValeur.style.marginRight = "2px";
      newDivValeur.style.width = "60px";
      newDivValeur.style.height = "22px";

      // Récupérez la valeur actuelle et ajoutez-la à ancienneValeur

      newDivValeurs.push(newDivValeur);

      var url =
        'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLastMesure&ID_Composant=' +
        idComposantMemory +
        '&ID_Caracteristique=' +
        typicalMesure.results[0]["ID_Caracteristique"][indexTypicalParametre];

      ajaxGet(url, function (reponseLastMesure) {
        var lastMesure = JSON.parse(reponseLastMesure);
        console.log("LE 2");
        console.log(lastMesure);
        if (lastMesure.results[0] === null) {
          console.log("il n'y a pas de dernière mesure");
          newDivLogo.style.background = "red";
          var newContent = document.createTextNode("");
          newDivValeur.appendChild(newContent);
          ancienneValeur[newIndex] = ""; // Stockez la valeur vide dans le tableau
          console.log("ancienneval", ancienneValeur);
        } else {
          console.log(lastMesure.results[0]["Valeur"][0]);
          newDivLogo.style.background = "green";
          var newContent = document.createTextNode(
            lastMesure.results[0]["Valeur"][0]
          );
          newDivValeur.appendChild(newContent);
          ancienneValeur[newIndex] = lastMesure.results[0]["Valeur"][0]; // Stockez la valeur dans le tableau
          console.log("ancienneval", ancienneValeur);
        }
      });

      var newDivValeurTheorique = document.createElement("div");
      newDivValeurTheorique.style.gridColumn = "4";
      newDivValeurTheorique.style.marginLeft = "2px";
      newDivValeurTheorique.style.marginRight = "2px";
      newDivValeurTheorique.style.color = "555555";

      var newContent = document.createTextNode(
        "[" +
          typicalMesure.results[0]["Valeur"][indexTypicalParametre] +
          "\u00a0" +
          typicalMesure.results[0]["Unite"][indexTypicalParametre] +
          "]"
      );
      newDivValeurTheorique.appendChild(newContent);

      newDiv.appendChild(newDivLogo);
      newDiv.appendChild(newDivParametre);
      newDiv.appendChild(newDivValeur);
      newDiv.appendChild(newDivValeurTheorique);

      gridDiv.appendChild(newDiv);
      index++;

      if (index % 3 === 0) {
        // Si nous avons atteint 3 lignes, répliquez les en-têtes
        enteteDiv = creerEntete();
        conteneur.appendChild(gridDiv);
        gridDiv = document.createElement("div");
        gridDiv.style.display = "grid";
        gridDiv.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
        gridDiv.style.gridGap = "10px";
      }
    });

    // Ajouter le dernier grid si nécessaire
    if (gridDiv.childNodes.length > 0) {
      conteneur.appendChild(gridDiv);
    }
  });

  // Vous pouvez maintenant accéder à typicalMesure en dehors de la fonction de rappel
  // Par exemple, ici vous pouvez l'utiliser ou appeler une autre fonction avec typicalMesure comme argument.
  // enregistrerValeursTextarea();
}






function modifierMesures() {
  var nouvelleValeur = newDivValeur.value;
  var idCaract = typicalMesure.results[0]["ID_Caracteristique"][indexTypicalParametre];

  // Vous pouvez maintenant effectuer une action pour sauvegarder la nouvelle valeur, par exemple en utilisant une requête AJAX POST
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
  var data = new FormData();
  data.append('action', 'updateMesure'); // Action pour mettre à jour la valeur
  data.append('id_comp', idComposantMemory);
  data.append('id_carac', idCaract); // Utilisez l'ID du caractéristique correspondant à cette textarea
  data.append('valeur', nouvelleValeur);

  ajaxPost(url, data, function (reponse) {
    console.log(reponse);
    // Vous pouvez également ajouter un retour visuel pour indiquer que la valeur a été sauvegardée
    $(".check-icon").hide();
    setTimeout(function () {
      $(".check-icon").show();
    }, 10);
});
affichageLastMesure(conteneur);
}
function enregistrerValeursTextarea() {
  newDivValeurs.forEach((textarea, index) => {
    var anciennevaleur = ancienneValeur[index];
    var valeurTextarea = textarea.value;
    var idCaract = typicalMesure.results[0]["ID_Caracteristique"][index];

    console.log("valeur", valeurTextarea, "carac", idCaract, "ancienne", ancienneValeur[index]);

    if (valeurTextarea != anciennevaleur) {
      // Vérifier si ancienneValeur[index] est vide
      if (ancienneValeur[index] === "") {
        // Si c'est vide, faites l'action "addMesure"
        var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
        var data = new FormData();
        data.append('action', 'addMesure'); // Action pour ajouter la valeur
        data.append('id_comp', idComposantMemory);
        data.append('id_carac', idCaract); // Utilisez l'ID du caractéristique correspondant à cette textarea
        data.append('valeur', valeurTextarea);

        ajaxPost(url, data, function (reponse) {
          console.log(reponse);
          // Vous pouvez également ajouter un retour visuel pour indiquer que la valeur a été ajoutée
          $(".check-icon").hide();
          setTimeout(function () {
            $(".check-icon").show();
          }, 10);
        });
      } else {
        // Sinon, faites l'action "updateMesure"
        var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
        var data = new FormData();
        data.append('action', 'updateMesure'); // Action pour mettre à jour la valeur
        data.append('id_comp', idComposantMemory);
        data.append('id_carac', idCaract); // Utilisez l'ID du caractéristique correspondant à cette textarea
        data.append('valeur', valeurTextarea);

        ajaxPost(url, data, function (reponse) {
          console.log(reponse);
          // Vous pouvez également ajouter un retour visuel pour indiquer que la valeur a été mise à jour
          $(".check-icon").hide();
          setTimeout(function () {
            $(".check-icon").show();
          }, 10);
        });
      }

      // Mettez à jour ancienneValeur[index]
      ancienneValeur[index] = valeurTextarea;
    }

    console.log("okayletsgo");
  });
  affichageLastMesure(listMesure);
}






function creationLienModifTheoricalValue(type_c){
  //console.log(type_composant);
  //console.log(lienModifTheoricalValue);
  //lienModifTheoricalValue.target = "_blank";
  var lienModifTheoricalValue = document.getElementById("lienModifTheoricalValue");
  lienModifTheoricalValue.href = "https://vmicro.fr/database/BDD_1.0/TypeComponent/Edit.php?type_c="+type_c+"&id_comp="+idComposantMemory;
}

function isUnique(item, position, array) {
  return array.indexOf(item) === position;
}

function start(){
  
  remplissageSelecteurProjet(selecteurProjet);
  remplissageBarNavigationWithID();
}

//----------------------------------------------//
///// Evenement par rapport a la navigation //////
//----------------------------------------------//

const ro = new ResizeObserver(entries =>{
  for(let entry of entries){
    console.log(entry.contentRect.width);
    if(entry.contentRect.width<350){
      extra_box1.style.display = "block";
      coordBoite.style.marginLeft = "0px";
    }
    else{
      extra_box1.style.display = "flex";
      coordBoite.style.marginLeft = "20px";
    }
  }
})
ro.observe(colonne1);
representationReticule.addEventListener('mouseout', (e)=>{
  survolePasRepresentationReticule(e);
});
colonne4.addEventListener('mouseout', ()=>{
  survolePasRepresentationComposant();
});

/*divClient.addEventListener('mouseout', ()=>{
  survolPasClient();
});

divClient.addEventListener("mouseover", ()=>{
  survolClient();
});
*/
function survolClient(){
  affichageNomClient.style.display="block";
  affichageClientSecret.style.display="none";
}
function survolPasClient(){
  affichageNomClient.style.display="none";
  affichageClientSecret.style.display="block";
}
function survolePasRepresentationReticule(e){
  if(reticuleSurvol){

    var value_X = parseInt(reticuleSurvol.id.substr(8,1),16);
    var value_Y = parseInt(reticuleSurvol.id.substr(9,1),16);

    var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;
    //console.log(valeurTableau);
    reticuleSurvol.style.backgroundColor = bufferCouleurReticule[valeurTableau];
    //reticuleSurvol.style.backgroundColor = "white";
    if(reticuleSelect){
      reticuleSelect.style.backgroundColor = "F06400";
    }
    affichageCoordReticuleSurvol.innerHTML="";
    affichageTypeReticuleSurvol.innerHTML="";
  }
  //divTypeReticuleSurvol.style.display = "none";
}

function survolePasRepresentationComposant(){
  if(composantSurvol){
    composantSurvol.style.backgroundColor = "white";
    if(composantSelect){
      composantSelect.style.backgroundColor = "F06400";
    }
    affichageTypeComposantSurvol.innerHTML ="";
    affichageNomComposantSurvol.innerHTML="";
  }
  //divTypeComposantSurvol.style.display = "none";
}

function survolReticule(e){  
  
    if(reticuleSurvol){
      //reticuleSurvol.style.backgroundColor = "white";
      //console.log(maxY_Ret);

      //Permet de mettre les réticules dans la même couleur qu'avant le passage de souris
      var value_X = parseInt(reticuleSurvol.id.substr(8,1),16);
      var value_Y = parseInt(reticuleSurvol.id.substr(9,1),16);

      //console.log(value_X);
      //console.log(value_Y);
      
      var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;

      //console.log(reticuleSurvol.id+" va prendre la couleur : "+ bufferCouleurReticule[valeurTableau] +"(index numero : "+valeurTableau+")");
      reticuleSurvol.style.backgroundColor = bufferCouleurReticule[valeurTableau];
    }
    reticuleSurvol = e.target;
    //console.log(e.target);
    reticuleSelect.style.backgroundColor = "#F06400";
    reticuleSurvol.style.backgroundColor = "red";

    //console.log(variableGlobaleStockageRequeteComposant);

    remplissageTypeReticuleSurvol(affichageTypeReticuleSurvol, variableGlobaleStockageRequeteComposant, parseInt(e.target.id.substr(8,1),16), parseInt(e.target.id.substr(9,1),16));
    remplissageCoordonnneReticuleSurvol(affichageCoordReticuleSurvol, parseInt(e.target.id.substr(8,1),16), parseInt(e.target.id.substr(9,1),16));
}

function survolComposant(e,retx,rety){ // Lorsque l'on survol un composant
  divTypeComposantSurvol.style.display = "block";

  
  composantSurvol = e.target;
  composantSelect.style.backgroundColor = "#F06400";
  composantSurvol.style.backgroundColor = "red";

  //console.log(e.target.id.substr(9,1));
  //console.log(e.target.id.substr(10,1));
  remplissageTypeComposantSurvol(affichageTypeComposantSurvol,affichageNomComposantSurvol, variableGlobaleStockageRequeteComposant, e.target.id.substr(9,1), e.target.id.substr(10,2),retx,rety);

}
function survolComposant1(e,retx,rety){ // Lorsque l'on survol un composant
  divTypeComposantSurvol.style.display = "block";

  if(composantSurvol){
    composantSurvol.style.backgroundColor = "white";
  }
  affichageNomComposantSurvol.innerHTML  ="";
  affichageTypeComposantSurvol.innerHTML ="";

  //console.log(e.target.id.substr(9,1));
  //console.log(e.target.id.substr(10,1));
  

}

function simuclickcomp(simuclick) {
  var element = document.getElementById(simuclick);
  console.log('simuclicktransfer', simuclick);
  // Vérifier si l'élément existe
  if (element) {
    // Créer un nouvel événement de clic
    var event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    // Dispatch l'événement sur l'élément
    element.dispatchEvent(event);

    // Appeler la fonction clickComposant en passant l'événement et les autres arguments requis
    clickComposant(event);
  }
}



function clickComposant(e,retx,rety){ // Lorsque l'on clique sur un composant
  console.log('target',e.target);
  
  
  composantSelect.style.backgroundColor = "white";
  composantSelect = e.target;
  composantSelect.style.backgroundColor = "#F06400";
  

  
  console.log("targetlengt",e.target.id.substr(9,e.target.id.length));
  selecteurComposant.value = e.target.id.substr(9,e.target.id.length);

  remplissageTypeComposant(affichageTypeComposant, variableGlobaleStockageRequeteComposant,retx,rety);
  affichageTypeComposant.style.fontSize = "12px";
  
  handleSelectButton(composantSelect);
}

function clickReticule(e){ // Lorsque l'on clique sur un réticule
  console.log("la target",e.target);
  console.log("leret",reticuleSelect);
  var oldret=reticuleSelect;
  reticuleSelect = e.target;  
  console.log("leret2",reticuleSelect);
  var positionXReticuleSelect = parseInt(reticuleSelect.id.substr(8, 1), 16);
  var positionYReticuleSelect = parseInt(reticuleSelect.id.substr(9, 1), 16);

  // Parcourir les composants pour trouver le premier composant dans le réticule
  for (var indexComposant = 0; indexComposant < variableGlobaleStockageRequeteComposant['Nom_Type_C'].length; indexComposant++) {
    if (
      variableGlobaleStockageRequeteComposant['Pos_X_Ret'][indexComposant] === positionXReticuleSelect &&
      variableGlobaleStockageRequeteComposant['Pos_Y_Ret'][indexComposant] === positionYReticuleSelect
    ) {
      composantSelect = document.getElementById(
        'composant' +
          variableGlobaleStockageRequeteComposant['Coord_X_C'][indexComposant] +
          variableGlobaleStockageRequeteComposant['Coord_Y_C'][indexComposant]
      );
      // Récupérer l'ID du premier composant dans le réticule
      var idPremierComposant = composantSelect.id;
      console.log('ID du premier composant : ' + idPremierComposant);
      break;
    }
  }

  var value_X = parseInt(reticuleSurvol.id.substr(8,1),16);
  var value_Y = parseInt(reticuleSurvol.id.substr(9,1),16); // On regarde la valeur de Y à partir de l'id du réticule sélectionné

  var value_X_select = parseInt(reticuleSelect.id.substr(8,1),16);
  var value_Y_select = parseInt(reticuleSelect.id.substr(9,1),16); // On regarde la valeur de Y à partir de l'id du réticule sélectionné
  var valeurTableau_select = (value_Y_select-1)*maxY_Ret + value_X_select - 1;
  oldret.style.backgroundColor = bufferCouleurReticule[valeurTableau_select];
  console.log("leretcoul", oldret.style.backgroundColor);
 
  var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;
  previousValeurTableau = valeurTableau;
  //console.log(reticuleSurvol.id+" va prendre la couleur : "+ bufferCouleurReticule[valeurTableau] +"(index numero : "+valeurTableau+")");
  
  console.log("mmhhhhh");
  console.log(value_X);
  console.log(value_Y);
  console.log(valeurTableau);
  console.log(bufferCouleurReticule);
  console.log(bufferCouleurReticule[valeurTableau]);

  //reticuleSelect.style.backgroundColor = "white";
  reticuleSelect = e.target;
  reticuleSelect.style.backgroundColor = "#F06400";
  console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  
  selecteurReticule.value = String(value_X) +"/"+ String(value_Y);
  console.log(selecteurReticule.value);
  var event = new CustomEvent('reticuleSelected', { detail: { reticule: reticuleSelect } });
  document.dispatchEvent(event);

  remplissageNomTypeReticule(affichageTypeReticule, value_X, value_Y, variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
}

selecteurComposant.addEventListener('change', changementComposant);

selecteurReticule.addEventListener('change', changementReticule);
var event = new CustomEvent('reticuleSelected', { detail: { reticule: reticuleSelect } });
  document.dispatchEvent(event);

function changementComposant(){
  composantSelect.style.backgroundColor = "white";
  composantSelect = document.getElementById("composant"+selecteurComposant.value);
  console.log("seleccomp",composantSelect);
  composantSelect.style.backgroundColor = "#F06400";
  handleSelectcomp(composantSelect);
  setTimeout(function(){
    remplissageTypeComposant(affichageTypeComposant, variableGlobaleStockageRequeteComposant,parseInt(reticuleSelect.id.substr(8,1),16),parseInt(reticuleSelect.id.substr(9,1),16));
  },300);
  affichageTypeComposant.style.fontSize = "12px";
}
function changementReticule(){
  var value_X = parseInt(reticuleSelect.id.substr(8,1),16);
  var value_Y = parseInt(reticuleSelect.id.substr(9,1),16);
  
  var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;

  console.log("la couleur1 = " + reticuleSelect.style.backgroundColor);
  
  console.log("la couleur2 = " + bufferCouleurReticule[valeurTableau]);

  reticuleSelect.style.backgroundColor = bufferCouleurReticule[valeurTableau];
  
  for(var i=0;i<5;i++){
    if(selecteurReticule.value.substr(i,1)=='/'){
        var selecteurX = selecteurReticule.value.substr(0,i);
        var selecteurY = selecteurReticule.value.substr(i+1,5-(i+1));
      }
  }
  
  console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
  console.log(("reticule"+ String(parseInt(selecteurX).toString(16)) + String(parseInt(selecteurY).toString(16))));

  nomWafer=selecteurWafer.value;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComponentOnWaferImprove&nom_wafer='+nomWafer;
  console.log(url);
  
  
      reticuleSelect = document.getElementById("reticule"+ String(parseInt(selecteurX).toString(16)) + String(parseInt(selecteurY).toString(16)));
      
  
  remplissageNomTypeReticule(affichageTypeReticule, value_X, value_Y, variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
}

function remplissageEtatDuComposant(idComposant){ // Fonction permettant le remplissage des inputs radio pour définir l'état du composant
  //Fonction appelé dans affichageComposant.js dans la fonction lancementPagePrincipale();
  var surWafer = document.getElementById("onWafer");
  var manipulation = document.getElementById("inManipulation");
  var stocker = document.getElementById("store");

  var vivant = document.getElementById("waferVivant");
  var mort = document.getElementById("waferMort");
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getEtatComposant&ID_Component='+idComposant; // On indique le lien pour la requête
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseEtat){ // On fait une requête get
    listEtat = JSON.parse(reponseEtat); // On parse la réponse

    var etat = listEtat.results[0]['etat'][0];
    var vie = listEtat.results[0]['vie'][0];

    console.log("etat="+etat);
    console.log("vie="+vie);

    if(vie==0){
      mort.checked = true;
    }
    if(vie==1){
      vivant.checked = true;
    }

    if(etat==1){
      surWafer.checked = true;
      extra_box1.style.display = "none";
      extra_box2.style.display = "none";
    }
    if(etat==2){
      manipulation.checked = true;
      extra_box1.style.display = "none";
      extra_box2.style.display = "none";
    }
    if(etat==3){
      stocker.checked = true;
      extra_box1.style.display = "block";
      extra_box2.style.display = "block";

      coord_box.value=""; // Dans tout les cas on efface les coordonnées si le composant est dans la boite alors elles seront réaffichée alors que si elle n'existe pas elle ne s'afficheront c'est ce qu'on veut
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getInformationBoxWithComponent&ID_Component='+idComposantMemory;
      console.log(url);
      ajaxGet(url, function(reponseInformationBox){
        informationBox = JSON.parse(reponseInformationBox);
        console.log(informationBox);
        if(informationBox.results[0]!=null){
          num_box.innerHTML="";
          num_box.value = informationBox.results[0].num_box[0];
          if(informationBox.results[0].pos_box[0]==-1){
            coord_box.value = "";
          }
          else {
            coord_box.value = informationBox.results[0].pos_box[0];
          }
        }
      })
    }
  });
}

selecteurProjet.addEventListener('change', ()=>{ // Si le sélecteur de projet change
  console.log(variableGlobaleStockageRequeteProjetList);
  variableGlobaleStockageRequeteProjetList["Nom_projet"].forEach((nomProjet, indexProjet) => {
    if(nomProjet == selecteurProjet.value)
    {
      //remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][indexProjet]);
      console.log("remplissageSelecteurWafer");
      remplissageSelecteurWafer(selecteurWafer, listProjet.results[0]["Nom_projet"][indexProjet],null);
    }
  });
});

selecteurWafer.addEventListener('change', ()=>{ // Si le sélecteur de wafer change
  console.log(variableGlobaleStockageRequeteWaferByNameProject);
  variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
    if(nomWafer == selecteurWafer.value){
      console.log(variableGlobaleStockageRequeteWaferByNameProject);
      remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
      loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);
    }
  });
})
etatWafer.forEach((item, i) => { //On parcours tous les boutons radio de nom :"etatWafer"
  //console.log(item);
  item.addEventListener('click', ()=>{ // On vérifie chacun des boutons radio s'il y a eu un click ou non
    console.log("Changement 1 = "+item.value);
    var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateEtat1&id_comp="+idComposantMemory+"&valeur="+item.value;
    ajaxGet(url, function(reponseUpdateEtat1){
      console.log(reponseUpdateEtat1);
    });

    if(item.value == 3){ // S'il est stocké, il faut indiquer dans quelle boite
      extra_box1.style.display = "block";
      extra_box2.style.display = "block";
      coord_box.value="";
    }
    else{
      extra_box1.style.display = "none";
      extra_box2.style.display = "none";
    }
  })
});

mortWafer.forEach((item, i) => { // On parcours tous les boutons radion de nom :"mortWafer"
  //console.log(item);
  item.addEventListener('click',()=>{
    retclick=reticuleSelect;
    console.log("reticuleselected",retclick);
    console.log("Changement 2 = "+item.value);
    var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateEtat2&id_comp="+idComposantMemory+"&valeur="+item.value;
    ajaxGet(url, function(reponseUpdateEtat2){
      console.log("reponseupdate",reponseUpdateEtat2);
      //Il faut asbolument recharger la variable globale pour actualisé la valeur de la vie des composants
      variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
        if(nomWafer == selecteurWafer.value){
          console.log(variableGlobaleStockageRequeteWaferByNameProject);
          remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
          loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);
        }
      });
      creationGridComposant(representationComposant, parseInt(maxX_C), parseInt(maxY_C));
      
     
    });
  });
});
function actualisationComposant(){
  console.log(representationComposant);
  console.log(parseInt(maxX_C));
  console.log(parseInt(maxY_C));
  variableGlobaleStockageRequeteWaferByNameProject["Nom_Wafer"].forEach((nomWafer, indexWafer) => {
    if(nomWafer == selecteurWafer.value){
      console.log(variableGlobaleStockageRequeteWaferByNameProject);
      remplissageNomTypeWafer(affichageTypeWafer,variableGlobaleStockageRequeteWaferByNameProject['Nom_Type_Wafer'][indexWafer]);
      loadComponent(variableGlobaleStockageRequeteWaferByNameProject['Nom_Wafer'][indexWafer]);
    }
  });
  creationGridComposant(representationComposant, parseInt(maxX_C), parseInt(maxY_C));

  console.log("creationGridComposant");
}

addBox.addEventListener('click',()=>{
  console.log("L'ID du composant est " + idComposantMemory);
  console.log("Num box : "+num_box.value);
  console.log("Coordonnée : "+coord_box.value);

  //Faire requête ajout dans la boite
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=linkComponentWithBox&num_box="+num_box.value+"&coord="+coord_box.value+"&ID_Composant="+idComposantMemory;
  console.log(url);
  ajaxGet(url, function(reponseLinkComponentWithBox){
    console.log(reponseLinkComponentWithBox);
    window.alert("Le composant est ajouté à la boite");
  });
});

seeBox.addEventListener('click',()=>{
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllBox&option=1";
  var find = 0;
  console.log(url);
  ajaxGet(url, function(reponseGetAllBox){
    getAllBox = JSON.parse(reponseGetAllBox);
    console.log(getAllBox.results);
    if(getAllBox.results!= undefined){
      console.log(getAllBox.results[0]);
      getAllBox.results[0].forEach((boite, indexBoite) => {
        if(boite==num_box.value){
          find=1;
        }
      });
    }
    if(find==1){
      window.location.href = "https://vmicro.fr/database/BDD_1.0/Boite/affichageBoite.php?num_box="+num_box.value;
    }
    else{
      window.alert("La boite n'existe pas");
    }
  });

});

traitement.addEventListener('keydown',(event)=>{
  if(event.key === "Enter"){
    event.preventDefault();
    //console.log(traitement.innerHTML);
    var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateTraitementWafer&traitement="+traitement.innerHTML+"&Nom_Wafer="+selecteurWafer.value;

    console.log(traitement.innerHTML);
    console.log(selecteurWafer.value);

    ajaxGet(url,function(reponse){
      console.log("Commande envoyé au serveur");
      console.log(reponse);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const menuBar = document.getElementById("menuBar");
  const ligneNavigation =document.getElementById("ligneNav");
  const sidebar =document.getElementById("sidebar");
  const toggleButton2 = document.getElementById("toggleButton2");
  toggleButton.addEventListener("click", function () {
    
      if (menuBar.style.display != "none") {
        menuBar.style.display = "none";
        ligneNavigation.style.position="fixed";
        ligneNavigation.style.marginLeft="350px";
        ligneNavigation.style.marginTop="0";
        sidebar.style.position="fixed";
        sidebar.style.marginTop="0";
    } else {
      menuBar.style.display = "flex";
      menuBar.style.alignItems="flex-start";
      ligneNavigation.style.position="inherit";
      ligneNavigation.style.marginLeft="0";
      ligneNavigation.style.marginTop="8%";
      sidebar.style.position="inherit";
      sidebar.style.marginTop="7%";
    }
  });
  toggleButton2.addEventListener("click", function () {
    
    if (ligneNavigation.style.visibility != 'hidden') {
      ligneNavigation.style.visibility = 'hidden';
      container.style.marginTop="10px";

  } else {
    ligneNavigation.style.visibility = 'visible';
    container.style.marginTop="100px";
  }
});
});


start();
