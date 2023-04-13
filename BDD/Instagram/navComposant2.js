/*
 Ce code Javascript réalise:

  - Le remplissage du sélecteur de projet (F1)

  La fonction start execute au départ les fonctions:
  - F1

*/

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
var composantSelect;
var typeComposantMemory;
var idComposantMemory;
var reticuleSurvol;
var composantSurvol;

var tabCouleur = ['00F0DA', '007CF0', '3A00F0', '9100F0', 'E100F0', 'F00087', 'F00054', '5FF000'];
var bufferCouleurReticule = [];

var selectedComponent = document.getElementById("selectedComponent");

function creationGridComposant(conteneur, tailleX, tailleY){

  conteneur.innerHTML = "";

  var divRepresentationComposant = document.createElement("div");
  divRepresentationComposant.id = "representationComposant";
  divRepresentationComposant.style.display = "grid";
  divRepresentationComposant.style.gridTemplateColumns = "repeat(" + parseInt(tailleX) + ",1fr)";
  divRepresentationComposant.style.gridTemplateRows = "repeat(" + parseInt(tailleY) + ",1fr)";

  console.log(reticuleSelect.id.substr(8,1));
  console.log(reticuleSelect.id.substr(9,1));
  console.log(variableGlobaleStockageRequeteComposant);

  for(var y=1; y <= tailleY; y++){
    for(var x=1; x <= tailleX; x++){
      var composantXY = document.createElement("div");
      composantXY.id = "composant"+x+y;
      composantXY.style.cursor = "pointer";
      composantXY.innerHTML = x.toString() + y.toString() + " : ";
      for(var indexNomTypeComposant=0; indexNomTypeComposant < variableGlobaleStockageRequeteComposant['Nom_Type_C'].length; indexNomTypeComposant++){
        if(variableGlobaleStockageRequeteComposant['Pos_X_Ret'][indexNomTypeComposant] == reticuleSelect.id.substr(8,1)){
          if(variableGlobaleStockageRequeteComposant['Pos_Y_Ret'][indexNomTypeComposant] == reticuleSelect.id.substr(9,1)){
            if(variableGlobaleStockageRequeteComposant['Coord_X_C'][indexNomTypeComposant] == x){
              if(variableGlobaleStockageRequeteComposant['Coord_Y_C'][indexNomTypeComposant] == y){
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
        clickComposant(e);
      });
      composantXY.addEventListener("mouseover", (e)=>{
        survolComposant(e);
      });

      divRepresentationComposant.appendChild(composantXY);
    }
  }

  conteneur.appendChild(divRepresentationComposant);
}

function creationGridReticule(conteneur, tailleX, tailleY){

  //console.log(conteneur);
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

  /*
  var divXMeplat = document.createElement("div");
  divXMeplat.id = "XMeplat";
  divXMeplat.style.backgroundColor = "white";
  divXMeplat.style.border = "1px solid black";
  divXMeplat.style.gridColumn = "2";
  divXMeplat.style.gridRow = tailleY+1;
  divRepresentationReticule.appendChild(divXMeplat);
  */

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
  /*

  var divYX = document.createElement("div");
  divYX.id="YX";
  divYX.style.backgroundColor = "white";
  divYX.style.border = "1px solid black";
  divYX.style.gridColumn = "1";
  divYX.style.gridRow = tailleY+1;
  divYX.innerHTML ="Y/X";
  divRepresentationReticule.appendChild(divYX);

  var divXMeplat = document.createElement("div");
  divXMeplat.id = "XMeplat";
  divXMeplat.style.backgroundColor = "white";
  divXMeplat.style.border = "1px solid black";
  divXMeplat.style.gridColumn = "2";
  divXMeplat.style.gridRow = tailleY+1;
  divRepresentationReticule.appendChild(divXMeplat);

  var divMeplat = document.createElement("div");
  divMeplat.id = "meplat";
  divMeplat.style.backgroundColor = "grey";
  divMeplat.style.border = "1px solid black";
  divMeplat.style.gridColumn = "2";
  divMeplat.style.gridRowStart = "2";
  divMeplat.style.gridRowEnd = tailleY;
  divMeplat.innerHTML = "meplat";
  divMeplat.style.fontSize = "8px";
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
    iY.style.gridColumn = "1";
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
  */

  console.log('________________________________');

  bufferCouleurReticule.splice(0, bufferCouleurReticule.length);
  console.log(bufferCouleurReticule);

  /*
  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_C"]);
  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_C"].filter(isUnique));
  typeReticuleGlobal = variableGlobaleStockageRequeteComposant["Nom_Type_C"].filter(isUnique);
  */

  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"]);
  console.log(variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"].filter(isUnique));
  typeReticuleGlobal = variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"].filter(isUnique);
  afficheLegendeCouleur(typeReticuleGlobal);

  console.log('________________________________');
  for(var y=1; y <= tailleY; y++){
    for(var x=1; x <= tailleX; x++){
      var find=0;
      var reticuleXY = document.createElement("div");
      reticuleXY.id = "reticule"+x+y;

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
      /*
      for(var indexComposant=0; indexComposant < variableGlobaleStockageRequeteComposant["Nom_Type_C"].length; indexComposant++){
        typeReticuleGlobal.forEach((typeReticuleMAP, indexTRM) => {
          if(typeReticuleMAP == variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"][indexComposant]){
            if(variableGlobaleStockageRequeteComposant["Pos_X_Ret"][indexComposant] == x){
              if(variableGlobaleStockageRequeteComposant["Pos_Y_Ret"][indexComposant] == y){
                console.log(x+":"+y+": typeReticuleMAP="+typeReticuleMAP+"   &&   "+variableGlobaleStockageRequeteComposant["Nom_Type_Reticule"][indexComposant]);
                reticuleXY.style.backgroundColor = tabCouleur[indexTRM];
                bufferCouleurReticule.push(tabCouleur[indexTRM]);
                find=1;
                break;
              }
            }
          }
        });
      }
      */
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

function remplissageSelecteurComposant(conteneur, contenu){
  console.log(contenu);

  conteneur.innerHTML = "";

  var positionXReticuleSelecteur = selecteurReticule.value.substr(0,1);
  var positionYReticuleSelecteur = selecteurReticule.value.substr(1,2);

  var maxX=0;
  var maxY=0;

  contenu['ID_Composant'].forEach((composantID, indexComposant) => {
    if(contenu['Pos_X_Ret'][indexComposant] == positionXReticuleSelecteur){
      if(contenu['Pos_Y_Ret'][indexComposant] == positionYReticuleSelecteur){

        if(contenu['Coord_X_C'][indexComposant] > maxX){ maxX = contenu['Coord_X_C'][indexComposant];}
        if(contenu['Coord_Y_C'][indexComposant] > maxY){ maxY = contenu['Coord_Y_C'][indexComposant];}

        //console.log(composantID);
        //console.log(contenu['Coord_X_C'][indexComposant] + " ||| " + contenu["Coord_Y_C"][indexComposant]);

        var option = document.createElement('option');
        option.appendChild(document.createTextNode(contenu['Coord_X_C'][indexComposant] + contenu["Coord_Y_C"][indexComposant]));
        option.value = contenu['Coord_X_C'][indexComposant] + contenu["Coord_Y_C"][indexComposant];
        conteneur.appendChild(option);
      }
    }
  });
  //console.log(maxX);
  //console.log(maxY);

  creationGridComposant(representationComposant, parseInt(maxX_C), parseInt(maxY_C));
  maxX_C = maxX;
  maxY_C = maxY;

  console.log(composantSelect);
  if(composantSelect == undefined){
    composantSelect = document.getElementById("composant" + contenu['Coord_X_C'][0] + contenu['Coord_Y_C'][0]);
  }
  else{
    //console.log(composantSelect.id.substr(9,1));
    //console.log(composantSelect.id.substr(10,1));
    for(var indexNomTypeComposant=0; indexNomTypeComposant < contenu['Nom_Type_C'].length; indexNomTypeComposant++){
      if(contenu['Pos_X_Ret'][indexNomTypeComposant] == positionXReticuleSelecteur){
        if(contenu['Pos_Y_Ret'][indexNomTypeComposant] == positionYReticuleSelecteur){
          if(contenu['Coord_X_C'][indexNomTypeComposant] == composantSelect.id.substr(9,1)){
            if(contenu['Coord_Y_C'][indexNomTypeComposant] == composantSelect.id.substr(10,1)){
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

  remplissageTypeComposant(affichageTypeComposant, contenu);
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
  option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0])); // On ajoute à l'élément option un texte qui contient le x et y du premier trouvé dans le contenu
  option.value = contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]; // On défini la valeur de l'option comme étant le x et y du première élément de contenu
  conteneur.appendChild(option); // on ajoute l'option au conteneur

  var maxX = contenu['Pos_X_Ret'][0];
  var maxY = contenu['Pos_Y_Ret'][0];

  contenu['ID_Composant'].forEach((id, indexID) => {
    if(indexID > 0){

      if(contenu['Pos_X_Ret'][indexID] > maxX){ maxX = contenu['Pos_X_Ret'][indexID];}
      if(contenu['Pos_Y_Ret'][indexID] > maxY){ maxY = contenu['Pos_Y_Ret'][indexID];}

      var valeurReticule = (parseInt(contenu['Pos_X_Ret'][indexID])*10) + parseInt(contenu['Pos_Y_Ret'][indexID]);
      var valeurAncienneReticule = (parseInt(contenu['Pos_X_Ret'][indexID-1])*10) + parseInt(contenu['Pos_Y_Ret'][indexID-1]);

      if(valeurReticule != valeurAncienneReticule){
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][indexID]+contenu['Pos_Y_Ret'][indexID]));
        option.value = contenu['Pos_X_Ret'][indexID]+contenu['Pos_Y_Ret'][indexID];
        conteneur.appendChild(option);
      }
    }
  });
  console.log(maxX);
  console.log(maxY);

  maxX_Ret = maxX;
  maxY_Ret = maxY;

  creationGridReticule(representationReticule, parseInt(maxX), parseInt(maxY));

  reticuleSelect = document.getElementById("reticule"+contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]);
  reticuleSelect.style.backgroundColor = "#F06400";

  remplissageNomTypeReticule(affichageTypeReticule, contenu['Pos_X_Ret'][0],contenu['Pos_Y_Ret'][0], contenu);
  remplissageSelecteurComposant(selecteurComposant, contenu);

}

function loadComponent(nomWafer){
  var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getComponentOnWaferImprove&nom_wafer='+nomWafer;
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

function remplissageTypeComposantSurvol(conteneur, contenu, valeurXComposant, valeurYComposant){
  var valeurXReticule = selecteurReticule.value.substr(0,1);
  var valeurYReticule = selecteurReticule.value.substr(1,2);

  for(var indexNomTypeComposant=0; indexNomTypeComposant < contenu['Nom_Type_C'].length; indexNomTypeComposant++){
    if(contenu['Pos_X_Ret'][indexNomTypeComposant] == valeurXReticule){
      if(contenu['Pos_Y_Ret'][indexNomTypeComposant] == valeurYReticule){
        if(contenu['Coord_X_C'][indexNomTypeComposant] == valeurXComposant){
          if(contenu['Coord_Y_C'][indexNomTypeComposant] == valeurYComposant){
            //console.log(contenu['Nom_Type_C'][indexNomTypeComposant])
            conteneur.innerHTML = "";
            conteneur.innerHTML = contenu['Nom_Type_C'][indexNomTypeComposant];
          }
        }
      }
    }
  }
}

function remplissageTypeComposant(conteneur, contenu){
  //console.log(contenu);
  var valeurXReticule = selecteurReticule.value.substr(0,1);
  var valeurYReticule = selecteurReticule.value.substr(1,2);
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
            affichageIDComposant.innerHTML = "";
            affichageIDComposant.innerHTML = "ID Composant => "+contenu['ID_Composant'][indexNomTypeComposant];
            idComposantMemory = contenu['ID_Composant'][indexNomTypeComposant];

            var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=setCurrentComponent&id_comp='+idComposantMemory;
            console.log(url);
            ajaxGet(url, function(reponseSetCurrentComponent){
              console.log(JSON.parse(reponseSetCurrentComponent));
            });

            console.log(idComposantMemory);
            //lancementPagePrincipale(contenu['ID_Composant'][indexNomTypeComposant]);
            lancementPagePrincipale();
            affichageLastMesure(listMesure);
            creationLienModifTheoricalValue(contenu['Nom_Type_C'][indexNomTypeComposant]);
          }
        }
      }
    }
  }
}

function remplissageCoordonnneReticuleSurvol(conteneur, valeurXReticule, valeurYReticule){
  conteneur.innerHTML = "";
  conteneur.innerHTML = valeurYReticule + valeurXReticule;
}

function remplissageNomTypeReticule(conteneur, valeurXReticule, valeurYReticule, contenu){
  //console.log(contenu);
  //console.log("valeur x reticule = "+valeurXReticule);
  //console.log("valeur y reticule = "+valeurYReticule);

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
   var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getWaferByNameProject&nom_projet='+nomProjet;
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
  var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
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
  var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST';
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

    remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][0]);
    variableGlobaleStockageRequeteProjetList = listProjet.results[0];
    console.log("remplissageSelecteurWafer");
    remplissageSelecteurWafer(selecteurWafer ,listProjet.results[0]["Nom_projet"][0])
  });
}

function remplissageBarNavigationWithID(){
  if(selectedComponent.value !=""){
    console.log("SelectedComponent="+selectedComponent.value);
    var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllNavDataWithIdComponent&id_comp='+selectedComponent.value;
    ajaxGet(url,function(reponseAllInfo){
      listeInfo = JSON.parse(reponseAllInfo);
      console.log(listeInfo);

      selecteurProjet.value=listeInfo.results[5];
      traitement.innerHTML="";
      traitement.innerHTML=listeInfo.results[10];
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

        remplissageNomClient(affichageNomClient, listeInfo.results[6]);
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
      var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllNavDataWithIdComponent&id_comp='+lastComponent.value;
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

          remplissageNomClient(affichageNomClient, listeInfo.results[6]);
          setTimeout(function(){

            selecteurReticule.value = listeInfo.results[2]+ listeInfo.results[3]; // Rempli le sélecteur Réticule
            changementReticule(); //Modification sur la map reticule

            selecteurComposant.value = listeInfo.results[8]+ listeInfo.results[9]; // Rempli le sélecteur Composant
            changementComposant(); //Modification sur la map composant
          },300);
        },300);

      });
    }
  }
}

function affichageLastMesure(conteneur){
  console.log("affichageLastMesure");
  conteneur.style.display="grid";
/*
  SELECT Valeur, Nom_Parametre, Unite
  FROM type_composant, caracteristique
  WHERE caracteristique.ID_Caracteristique = type_composant.ID_Caracteristique AND Nom_Type_C=(SELECT type_Composant_Ref FROM `composant` WHERE ID_Composant = 5005);
  */
  var newEnteteDiv = document.createElement("div");
  newEnteteDiv.style.display = "grid";
  newEnteteDiv.style.gridTemplateColumns = "10px 150px repeat(2,1fr)";
  newEnteteDiv.style.backgroundColor = "#e1f0ff52";
  newEnteteDiv.style.border = "1px solid black";


  var newDivEnteteLogo = document.createElement("div");
  newDivEnteteLogo.style.margin = "auto";
  newDivEnteteLogo.style.width = "10px";
  newDivEnteteLogo.style.gridColumn = "1";
  //newDivEnteteLogo.innerHTML = "Etat";

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

  conteneur.innerHTML = "";
  conteneur.appendChild(newEnteteDiv);


  var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getTypicalMesure&ID_Composant='+idComposantMemory;
  ajaxGet(url,function(reponseTypicalMesure){
    typicalMesure = JSON.parse(reponseTypicalMesure);
      console.log(typicalMesure.results[0]);
      typicalMesure.results[0]["Nom_Parametre"].forEach((nomTypicalParametre, indexTypicalParametre) => {
        var newDiv = document.createElement("div");
        newDiv.id = "ligneAffichageTypicalMesure"+indexTypicalParametre;
        newDiv.style.display = "grid";
        newDiv.style.gridTemplateColumns = "10px 150px repeat(2,1fr)";
        //newDiv.style.border = "1px solid black";

        /*
        var newDivLogo = document.createElement("div");
        newDivLogo.style.margin = "auto";
        newDivLogo.style.width = "10px";
        newDivLogo.style.height = "10px";
        newDivLogo.style.borderRadius = "5px";

        var newDivParametre = document.createElement("div");
        var newContent = document.createTextNode(nomTypicalParametre+ '   ('+ typicalMesure.results[0]["Unite"][indexTypicalParametre] +')');
        newDivParametre.style = "margin:auto;"
        newDivParametre.appendChild(newContent);

        var newDivValeur = document.createElement("div");
        var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getLastMesure&ID_Composant='+idComposantMemory+'&ID_Caracteristique='+typicalMesure.results[0]["ID_Caracteristique"][indexTypicalParametre];
        ajaxGet(url,function(reponseLastMesure){
          lastMesure = JSON.parse(reponseLastMesure);
          console.log(lastMesure);
          if(lastMesure.results[0] === null){
            console.log("il n'y a pas de derniere mesure");
            newDivLogo.style.background = "red";
          }
          else {
            console.log(lastMesure.results[0]["Valeur"][0]);
            newDivLogo.style.background = "green";
            var newContent = document.createTextNode(lastMesure.results[0]["Valeur"][0]);
            newDivValeur.appendChild(newContent);
          }
        });

        var newDivValeurTheorique = document.createElement("div");
        var newContent = document.createTextNode(typicalMesure.results[0]["Valeur"][indexTypicalParametre]);
        newDivValeurTheorique.appendChild(newContent);

        newDiv.appendChild(newDivLogo);
        newDiv.appendChild(newDivParametre);
        newDiv.appendChild(newDivValeur);
        newDiv.appendChild(newDivValeurTheorique);
        */

        var newDivLogo = document.createElement("div");
        newDivLogo.style.margin = "auto";
        newDivLogo.style.width = "10px";
        newDivLogo.style.height = "10px";
        newDivLogo.style.borderRadius = "5px";
        newDivLogo.style.gridColumn = "1";

        var newDivParametre = document.createElement("div");
        var newContent = document.createTextNode(nomTypicalParametre+" : ");
        newDivParametre.style = "text-align:right";
        newDivParametre.style.gridColumn = "2";
        newDivParametre.appendChild(newContent);

        var newDivValeur = document.createElement("div");
        newDivValeur.style.gridColumn = "3";
        newDivValeur.style.marginLeft = "2px";
        newDivValeur.style.marginRight = "2px";
        //newDivValeur.style.borderRight = "1px solid black";

        var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getLastMesure&ID_Composant='+idComposantMemory+'&ID_Caracteristique='+typicalMesure.results[0]["ID_Caracteristique"][indexTypicalParametre];
        ajaxGet(url,function(reponseLastMesure){
          lastMesure = JSON.parse(reponseLastMesure);
          console.log(lastMesure);
          if(lastMesure.results[0] === null){
            console.log("il n'y a pas de derniere mesure");
            newDivLogo.style.background = "red";
            var newContent = document.createTextNode("...." +typicalMesure.results[0]["Unite"][indexTypicalParametre]);
            newDivValeur.appendChild(newContent);
          }
          else {
            console.log(lastMesure.results[0]["Valeur"][0]);
            newDivLogo.style.background = "green";
            var newContent = document.createTextNode(lastMesure.results[0]["Valeur"][0]+typicalMesure.results[0]["Unite"][0]);
            newDivValeur.appendChild(newContent);
          }
        });

        var newDivValeurTheorique = document.createElement("div");
        newDivValeurTheorique.style.gridColumn = "4";
        newDivValeurTheorique.style.marginLeft = "2px";
        newDivValeurTheorique.style.marginRight = "2px";
        newDivValeurTheorique.style.color = "555555";

        var newContent = document.createTextNode("["+typicalMesure.results[0]["Valeur"][indexTypicalParametre]+"\u00a0"+typicalMesure.results[0]["Unite"][indexTypicalParametre]+"]");
        newDivValeurTheorique.appendChild(newContent);

        newDiv.appendChild(newDivLogo);
        newDiv.appendChild(newDivParametre);
        newDiv.appendChild(newDivValeur);
        newDiv.appendChild(newDivValeurTheorique);

        conteneur.appendChild(newDiv);
      });
  });
}
function creationLienModifTheoricalValue(type_c){
  //console.log(type_composant);
  //console.log(lienModifTheoricalValue);
  //lienModifTheoricalValue.target = "_blank";
  var lienModifTheoricalValue = document.getElementById("lienModifTheoricalValue");
  lienModifTheoricalValue.href = "http://vmicro.fr/database/BDD_1.0/TypeComponent/Edit.php?type_c="+type_c+"&id_comp="+idComposantMemory;
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

divClient.addEventListener('mouseout', ()=>{
  survolPasClient();
});

divClient.addEventListener("mouseover", ()=>{
  survolClient();
});

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

    var value_X = parseInt(reticuleSurvol.id.substr(8,1));
    var value_Y = parseInt(reticuleSurvol.id.substr(9,1));

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
  }
  //divTypeComposantSurvol.style.display = "none";
}

function survolReticule(e){

    if(reticuleSurvol){
      //reticuleSurvol.style.backgroundColor = "white";
      //console.log(maxY_Ret);

      //Permet de mettre les réticules dans la même couleur qu'avant le passage de souris
      var value_X = parseInt(reticuleSurvol.id.substr(8,1));
      var value_Y = parseInt(reticuleSurvol.id.substr(9,1));

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

    remplissageTypeReticuleSurvol(affichageTypeReticuleSurvol, variableGlobaleStockageRequeteComposant, e.target.id.substr(8,1), e.target.id.substr(9,1));
    remplissageCoordonnneReticuleSurvol(affichageCoordReticuleSurvol, e.target.id.substr(8,1), e.target.id.substr(9,1));
}

function survolComposant(e){ // Lorsque l'on survol un composant
  divTypeComposantSurvol.style.display = "block";

  if(composantSurvol){
    composantSurvol.style.backgroundColor = "white";
  }
  composantSurvol = e.target;
  composantSelect.style.backgroundColor = "#F06400";
  composantSurvol.style.backgroundColor = "red";

  //console.log(e.target.id.substr(9,1));
  //console.log(e.target.id.substr(10,1));
  remplissageTypeComposantSurvol(affichageTypeComposantSurvol, variableGlobaleStockageRequeteComposant, e.target.id.substr(9,1), e.target.id.substr(10,1));

}
function clickComposant(e){ // Lorsque l'on clique sur un composant
  //console.log(e.target);
  composantSelect.style.backgroundColor = "white";
  composantSelect = e.target;
  composantSelect.style.backgroundColor = "#F06400";

  //console.log(e.target.id.substr(9,e.target.id.length));
  selecteurComposant.value = e.target.id.substr(9,e.target.id.length);

  remplissageTypeComposant(affichageTypeComposant, variableGlobaleStockageRequeteComposant);
  affichageTypeComposant.style.fontSize = "12px";
}

function clickReticule(e){ // Lorsque l'on clique sur un réticule
  console.log(e.target);

  var value_X = parseInt(reticuleSelect.id.substr(8,1)); // On regarde la valeur de X à partir de l'id du réticule sélectionné
  var value_Y = parseInt(reticuleSelect.id.substr(9,1)); // On regarde la valeur de Y à partir de l'id du réticule sélectionné

  //console.log(value_X);
  //console.log(value_Y);

  var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;
  //console.log(reticuleSurvol.id+" va prendre la couleur : "+ bufferCouleurReticule[valeurTableau] +"(index numero : "+valeurTableau+")");
  reticuleSelect.style.backgroundColor = bufferCouleurReticule[valeurTableau];

  //reticuleSelect.style.backgroundColor = "white";
  reticuleSelect = e.target;
  reticuleSelect.style.backgroundColor = "#F06400";

  //console.log(e.target.id.substr(8,e.target.id.length));
  selecteurReticule.value = e.target.id.substr(8,e.target.id.length);


  remplissageNomTypeReticule(affichageTypeReticule, selecteurReticule.value.substr(0,1), selecteurReticule.value.substr(1,1), variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
}

selecteurComposant.addEventListener('change', changementComposant);
selecteurReticule.addEventListener('change', changementReticule);

function changementComposant(){
  composantSelect.style.backgroundColor = "white";
  composantSelect = document.getElementById("composant"+selecteurComposant.value);
  composantSelect.style.backgroundColor = "#F06400";

  setTimeout(function(){
    remplissageTypeComposant(affichageTypeComposant, variableGlobaleStockageRequeteComposant);
  },300);
  affichageTypeComposant.style.fontSize = "12px";
}
function changementReticule(){
  var value_X = parseInt(reticuleSelect.id.substr(8,1));
  var value_Y = parseInt(reticuleSelect.id.substr(9,1));

  var valeurTableau = (value_Y-1)*maxY_Ret + value_X - 1;

  reticuleSelect.style.backgroundColor = bufferCouleurReticule[valeurTableau];
  reticuleSelect = document.getElementById("reticule"+selecteurReticule.value);
  reticuleSelect.style.backgroundColor = "#F06400";

  remplissageNomTypeReticule(affichageTypeReticule, selecteurReticule.value.substr(0,1), selecteurReticule.value.substr(1,1), variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
}

function remplissageEtatDuComposant(idComposant){ // Fonction permettant le remplissage des inputs radio pour définir l'état du composant
  //Fonction appelé dans affichageComposant.js dans la fonction lancementPagePrincipale();
  var surWafer = document.getElementById("onWafer");
  var manipulation = document.getElementById("inManipulation");
  var stocker = document.getElementById("store");

  var vivant = document.getElementById("waferVivant");
  var mort = document.getElementById("waferMort");

  var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getEtatComposant&ID_Component='+idComposant; // On indique le lien pour la requête
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
      var url = 'http://vmicro.fr/database/BDD_1.0/API/api.php?action=getInformationBoxWithComponent&ID_Component='+idComposantMemory;
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
      remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][indexProjet]);
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
    var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=updateEtat1&id_comp="+idComposantMemory+"&valeur="+item.value;
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
    console.log("Changement 2 = "+item.value);
    var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=updateEtat2&id_comp="+idComposantMemory+"&valeur="+item.value;
    ajaxGet(url, function(reponseUpdateEtat2){
      //console.log(reponseUpdateEtat2);
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
  var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=linkComponentWithBox&num_box="+num_box.value+"&coord="+coord_box.value+"&ID_Composant="+idComposantMemory;
  console.log(url);
  ajaxGet(url, function(reponseLinkComponentWithBox){
    console.log(reponseLinkComponentWithBox);
    window.alert("Le composant est ajouté à la boite");
  });
});

seeBox.addEventListener('click',()=>{
  var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllBox&option=1";
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
      window.location.href = "http://vmicro.fr/database/BDD_1.0/Boite/affichageBoite.php?num_box="+num_box.value;
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
    var url = "http://vmicro.fr/database/BDD_1.0/API/api.php?action=updateTraitementWafer&traitement="+traitement.innerHTML+"&Nom_Wafer="+selecteurWafer.value;

    console.log(traitement.innerHTML);
    console.log(selecteurWafer.value);

    ajaxGet(url,function(reponse){
      console.log("Commande envoyé au serveur");
      console.log(reponse);
    });
  }
});

start();
