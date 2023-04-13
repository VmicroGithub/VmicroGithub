/*
 Ce code Javascript réalise:

  - Le remplissage du sélecteur de projet (F1)

  La fonction start execute au départ les fonctions:
  - F1

*/

var selecteurProjet = document.getElementById("selecteurProjet");
var affichageNomClient = document.getElementById("affichageNomClient");
var selecteurWafer = document.getElementById("selecteurWafer");
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
var colonne3 = document.getElementById("colonne3");
var colonne4 = document.getElementById("colonne4");
var divTypeReticuleSurvol = document.getElementById("divTypeReticuleSurvol");
var affichageTypeReticuleSurvol = document.getElementById("affichageTypeReticuleSurvol");
var affichageCoordReticuleSurvol = document.getElementById("affichageCoordReticuleSurvol");

var selecteurParametre = document.getElementById("selecteurParametre");
var boutonValideMesure = document.getElementById("boutonMesure");
var fisrtNameUser = document.getElementById("firstNameUser");
var lastNameUser = document.getElementById("lastNameUser");
var idUser = document.getElementById("idUser");
var selecteurAuteurExperience = document.getElementById("selecteurAuteurExperience")
var boutonValideExperience = document.getElementById("boutonExperience");
var descriptionExperience = document.getElementById("descriptionExperience");
var valeurMesure = document.getElementById("valeurMesure");
var corpsEditionME = document.getElementById("corpsEditionME");
var corpsEditionAuteur = document.getElementById("corpsEditionAuteur");
var corpsEditionDate = document.getElementById("corpsEditionDate");
var corpsEditionCommentaire = document.getElementById("corpsEditionCommentaire");
var corpsEditionAuteurCommentaire = document.getElementById("corpsEditionAuteurCommentaire");
var corpsEditionDateCommentaire = document.getElementById("corpsEditionDateCommentaire");
var selecteurAuteurCommentaire = document.getElementById("selecteurAuteurCommentaire");
var descriptionCommentaire = document.getElementById("descriptionCommentaire");
var boutonValideCommentaire = document.getElementById("boutonCommentaire");
var selecteurPhoto = document.getElementById("selecteurPhoto");

var variableGlobaleStockageRequeteProjetList;
var variableGlobaleStockageRequeteWaferByNameProject;
var variableGlobaleStockageRequeteComposant;

var reticuleSelect;
var composantSelect;
var parametreSelect;
var experienceMemory;
var idComposantMemory;
var reticuleSurvol;
var composantSurvol;

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
      composantXY.innerHTML = x.toString() + y.toString() + " : ";
      for(var indexNomTypeComposant=0; indexNomTypeComposant < variableGlobaleStockageRequeteComposant['Nom_Type_C'].length; indexNomTypeComposant++){
        if(variableGlobaleStockageRequeteComposant['Pos_X_Ret'][indexNomTypeComposant] == reticuleSelect.id.substr(8,1)){
          if(variableGlobaleStockageRequeteComposant['Pos_Y_Ret'][indexNomTypeComposant] == reticuleSelect.id.substr(9,1)){
            if(variableGlobaleStockageRequeteComposant['Coord_X_C'][indexNomTypeComposant] == x){
              if(variableGlobaleStockageRequeteComposant['Coord_Y_C'][indexNomTypeComposant] == y){
                  composantXY.innerHTML += variableGlobaleStockageRequeteComposant['Nom_Type_C'][indexNomTypeComposant];
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
  divRepresentationReticule.style.gridTemplateColumns = "1fr 20px repeat(" + parseInt(tailleX+1) + ",1fr)";
  divRepresentationReticule.style.gridTemplateRows = "repeat("+parseInt(tailleY+1)+" ,1fr)";

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
  divMeplat.style.fontSize = "small";
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
    iX.innerHTML = x
    ;
    divRepresentationReticule.appendChild(iX);
  }

  for(var y=1; y <= tailleY; y++){
    for(var x=1; x <= tailleX; x++){
      var reticuleXY = document.createElement("div");
      reticuleXY.id = "reticule"+x+y;
      reticuleXY.style.backgroundColor = "white";
      reticuleXY.style.border = "1px solid black";
      reticuleXY.style.gridColumn = x+2;
      reticuleXY.style.gridRow = tailleY-y+1;

      reticuleXY.addEventListener("click", (e)=>{
        clickReticule(e);
      });
      reticuleXY.addEventListener("mouseover", (e)=>{
        survolReticule(e);
      });


      divRepresentationReticule.appendChild(reticuleXY);
    }
  }

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

  creationGridComposant(representationComposant, parseInt(maxX), parseInt(maxY));
  console.log(composantSelect);
  if(composantSelect == undefined){
    composantSelect = document.getElementById("composant" + contenu['Coord_X_C'][0] + contenu['Coord_Y_C'][0]);
  }
  else{
    console.log(composantSelect.id.substr(9,1));
    console.log(composantSelect.id.substr(10,1));
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

}

function remplissageSelecteurReticule(conteneur, contenu){
  //console.log(contenu);

  conteneur.innerHTML = "";

  var option = document.createElement('option');
  option.appendChild(document.createTextNode(contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]));
  option.value = contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0];
  conteneur.appendChild(option);

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

  creationGridReticule(representationReticule, parseInt(maxX), parseInt(maxY));

  reticuleSelect = document.getElementById("reticule"+contenu['Pos_X_Ret'][0]+contenu['Pos_Y_Ret'][0]);
  reticuleSelect.style.backgroundColor = "#F06400";

  remplissageNomTypeReticule(affichageTypeReticule, contenu['Pos_X_Ret'][0],contenu['Pos_Y_Ret'][0], contenu);
  remplissageSelecteurComposant(selecteurComposant, contenu);

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
            conteneur.innerHTML = contenu['Nom_Type_C'][indexNomTypeComposant];
            //console.log(contenu['ID_Composant'][indexNomTypeComposant]);
            affichageIDComposant.innerHTML = "";
            affichageIDComposant.innerHTML = "ID Composant => "+contenu['ID_Composant'][indexNomTypeComposant];
            idComposantMemory = contenu['ID_Composant'][indexNomTypeComposant];
            console.log(idComposantMemory);
            //lancementPagePrincipale(contenu['ID_Composant'][indexNomTypeComposant]);
            lancementPagePrincipale();
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
        break;
      }
    }
  }
}

function remplissageNomTypeWafer(conteneur, contenu){
  conteneur.innerHTML = "";
  conteneur.innerHTML = contenu;
}

function remplissageSelecteurWafer(conteneur, nomWafer){
   var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getWaferByNameProject&nom_projet='+nomWafer;
   ajaxGet(url, function(reponseWaferList){
     listWafer = JSON.parse(reponseWaferList);
     //console.log(listWafer.results['Nom_Wafer']);

     conteneur.innerHTML = "";
     listWafer.results[0]['Nom_Wafer'].forEach((nomWafer, indexWafer) => {
       var option = document.createElement('option');
       option.appendChild(document.createTextNode(nomWafer));
       option.value = nomWafer;
       conteneur.appendChild(option);
     });

     variableGlobaleStockageRequeteWaferByNameProject = listWafer.results[0];
     remplissageNomTypeWafer(affichageTypeWafer,listWafer.results[0]['Nom_Type_Wafer'][0]);
     loadComponent(listWafer.results[0]['Nom_Wafer'][0]);
   });
}

function remplissageNomClient(conteneur, contenu){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
  ajaxGet(url,function(reponseClientList){
    listClient = JSON.parse(reponseClientList);
    console.log(listClient.results[0]);
    listClient.results[0]["Nom_client"].forEach((nomClient, indexClient) => {
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

    remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][0]);
    variableGlobaleStockageRequeteProjetList = listProjet.results[0];
    remplissageSelecteurWafer(selecteurWafer ,listProjet.results[0]["Nom_projet"][0])
  });
}

//---------------------------------------------//
/////// Fonction pour la page principale ////////
//---------------------------------------------//

function remplissageSelecteurParametre(conteneur, idComposant){

  conteneur.innerHTML = "";
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getCaracteristiqueWithIDcomponent&ID_Component='+idComposant;
  ajaxGet(url,function(reponseCaracteristique){
    caracteristique = JSON.parse(reponseCaracteristique);
    console.log(caracteristique.results[0]);
    console.log(caracteristique.results[0]["Nom_Parametre"]);
    caracteristique.results[0]["Nom_Parametre"].forEach((nomParametre, indexParametre) => {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(nomParametre + '   ('+ caracteristique.results[0]["Unite"][indexParametre] +')'));
        option.value = caracteristique.results[0]["ID_Caracteristique"][indexParametre];
        conteneur.appendChild(option);
    });
    if(parametreSelect == undefined){
      parametreSelect = caracteristique.results[0]["ID_Caracteristique"][0];
    }
    else{
      conteneur.value = parametreSelect;
    }
  });
}

function remplissageSelecteurAuteurExperience(conteneur){

  if(fisrtNameUser.value != undefined){
    if(lastNameUser.value != undefined){
      conteneur.innerHTML="";
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(fisrtNameUser.value + ' ' + lastNameUser.value));
      console.log(fisrtNameUser.value);
      console.log(lastNameUser.value);
      console.log(idUser.value);
      option.value = idUser.value;
      conteneur.appendChild(option);
    }
  }
}

function remplissageHistoriqueMesExp(idComposant){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getCommentWithIDcomponent&ID_Component='+idComposant;
  console.log(url);
  ajaxGet(url, function(reponseCommentExp){
    listCommentExp = JSON.parse(reponseCommentExp);
    //console.log(listCommentExp);
    console.log(listCommentExp['results'][0]);
    corpsEditionME.innerHTML="";
    corpsEditionAuteur.innerHTML="";
    corpsEditionDate.innerHTML="";
    if(listCommentExp['results'][0]!=null){
      //console.log("Différent de null");
      listCommentExp['results'][0]["Mesure/Experience"].forEach((ME, numME) => {
        var newDivME = document.createElement("div");
        if(listCommentExp['results'][0]["parametre"][numME] != "")
        {
          if(listCommentExp['results'][0]["unite"][numME] != ""){
            var newContentME = document.createTextNode(listCommentExp['results'][0]["parametre"][numME]+ " : "+ME+" "+listCommentExp['results'][0]["unite"][numME]);
          }
        }
        else {
          var newContentME = document.createTextNode(ME);
        }

        newDivME.appendChild(newContentME);
        newDivME.id = "ME"+numME;
        newDivME.style.border="1px solid white";
        corpsEditionME.appendChild(newDivME);

        var newDivAuteur = document.createElement("div");
        if(listCommentExp['results'][0]["Auteur"][numME] == ""){
          var newContentAuteur = document.createTextNode(" - ");
        }
        else{
          var newContentAuteur = document.createTextNode(listCommentExp['results'][0]["Auteur"][numME]);
        }

        newDivAuteur.appendChild(newContentAuteur);
        newDivAuteur.id = "ME"+numME;
        newDivAuteur.style.border="1px solid white";
        corpsEditionAuteur.appendChild(newDivAuteur);

        var newDivDate = document.createElement("div");
        var newContentDate = document.createTextNode(listCommentExp['results'][0]["Last_Modif"][numME]);
        newDivDate.appendChild(newContentDate);
        newDivDate.id = "ME"+numME;
        newDivDate.style.border="1px solid white";
        corpsEditionDate.appendChild(newDivDate);
      });
    }
  });
}
function remplissageCommentaire(idComposant){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component='+idComposant;
  console.log(url);
  ajaxGet(url, function(reponseComment){
    listComment = JSON.parse(reponseComment);
    console.log(listComment);
    console.log(listComment['results'][0]);
    corpsEditionCommentaire.innerHTML="";
    corpsEditionAuteurCommentaire.innerHTML="";
    corpsEditionDateCommentaire.innerHTML="";
    if(listComment['results'][0]!= null){
      listComment['results'][0]["Contenu"].forEach((commentaire, idCommentaire) => {

        var newDivCommentaire = document.createElement("div");
        var newContentCommentaire = document.createTextNode(commentaire);
        newDivCommentaire.appendChild(newContentCommentaire);
        newDivCommentaire.id = "COM"+idCommentaire;
        newDivCommentaire.style.border="1px solid white";
        corpsEditionCommentaire.appendChild(newDivCommentaire);
        console.log("tif2:"=listComment['results'][0]["ID_Image"][idCommentaire]);
        if(listComment['results'][0]["ID_Image"][idCommentaire] != -1){
          //On affiche la photo
          var img = document.createElement("img");
          var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithID&ID_picture='+listComment['results'][0]["ID_Image"][idCommentaire];
          console.log(url);
          ajaxGet(url, function(reponseLink){
            listLink = JSON.parse(reponseLink);
            //console.log(listLink);
            //console.log('../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']);
            img.src = '../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension'];
            //img.src = '../image/component/5005/071020114450.jpg';
            img.style.height = "400px";
            img.style.width = "400px";
            newDivCommentaire.appendChild(img);
            newDivAuteurCommentaire.style.height = newDivCommentaire.offsetHeight+"px";
            console.log("TRAVAIL TERMINE");
            newDivDateCommentaire.style.height = newDivCommentaire.offsetHeight+"px";
          })
        }

        var newDivAuteurCommentaire = document.createElement("div");
        var newContentAuteurCommentaire = document.createTextNode(listComment['results'][0]["prenom"][idCommentaire]+" "+listComment['results'][0]["nom"][idCommentaire]);
        newDivAuteurCommentaire.appendChild(newContentAuteurCommentaire);
        newDivAuteurCommentaire.id = "COM"+idCommentaire;
        newDivAuteurCommentaire.style.border="1px solid white";
        //newDivAuteurCommentaire.style.height = newDivCommentaire.offsetHeight+"px";
        corpsEditionAuteurCommentaire.appendChild(newDivAuteurCommentaire);

        var newDivDateCommentaire = document.createElement("div");
        var newContentDateCommentaire = document.createTextNode(listComment['results'][0]["DateCom"][idCommentaire]);
        newDivDateCommentaire.appendChild(newContentDateCommentaire);
        newDivDateCommentaire.id = "COM"+idCommentaire;
        newDivDateCommentaire.style.border="1px solid white";
        //newDivDateCommentaire.style.height = newDivCommentaire.offsetHeight+"px";
        corpsEditionDateCommentaire.appendChild(newDivDateCommentaire);
      });
    }
  });
}

function lancementPagePrincipale(){

  remplissageSelecteurParametre(selecteurParametre, idComposantMemory);
  remplissageSelecteurAuteurExperience(selecteurAuteurExperience);
  remplissageSelecteurAuteurExperience(selecteurAuteurCommentaire); // Même si cela n'est pas utilisé pour expérience
  remplissageHistoriqueMesExp(idComposantMemory);
  remplissageCommentaire(idComposantMemory);

}

function start(){
  remplissageSelecteurProjet(selecteurProjet);
}

/*
 Partie du code qui attend les événements
*/
boutonValideMesure.addEventListener('click', ()=>{

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
  var data = new FormData();
  data.append('action','addMesure');
  data.append('id_comp',idComposantMemory);
  data.append('id_carac',parametreSelect);
  data.append('valeur',valeurMesure.value);
  ajaxPost(url, data, function(reponse){
    console.log(reponse);
    $(".check-icon").hide();
    setTimeout(function () {
      $(".check-icon").show();
    }, 10);
    remplissageHistoriqueMesExp(idComposantMemory);
  });
});
boutonValideExperience.addEventListener('click', ()=>{
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
  var data = new FormData();
  data.append('action','addExperience');
  data.append('id_comp',idComposantMemory);
  data.append('id_auteur',selecteurAuteurExperience.value);
  data.append('Contenu_Exp',descriptionExperience.value);

  console.log(idComposantMemory);
  console.log(selecteurAuteurExperience.value);
  console.log(descriptionExperience.value);
  ajaxPost(url, data, function(reponse){
    console.log(reponse);
    $(".check-icon").hide();
    setTimeout(function () {
      $(".check-icon").show();
    }, 10);
    remplissageHistoriqueMesExp(idComposantMemory);
  });
})
boutonValideCommentaire.addEventListener('click',()=>{
  //Enregistrement photo:
  /*
  console.log(document.querySelector('#selecteurPhoto').files[0]);

  const formData = new FormData(document.querySelector('#selecteurPhoto'));

  try{
    await fetch("https://vmicro.fr/database/BDD_1.0/API/upload.php",{
      method: "POST",
      body: formData,
    })
  }
  */
  var file_data_photo = document.querySelector('#selecteurPhoto').files[0];
  var file_data_file = document.querySelector("#selecteurFichier").files[0];

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
  var data = new FormData();
  data.append('action', 'addCommentaire');
  data.append('id_auteur', selecteurAuteurCommentaire.value);
  if(file_data_photo==undefined){
    data.append('id_photo',-1);
  }
  else{
    data.append('id_photo',0);
    data.append('file_photo',file_data_photo);
  }

  if(file_data_file!=undefined){
    data.append('file_fichier',file_data_file);
  }
  data.append('id_composant', idComposantMemory);
  data.append('contenu_Commentaire',descriptionCommentaire.value);

  for (var value of data.values()) {
   console.log(value);
  }

  ajaxPost(url, data, function(reponse){
    console.log(reponse);
  });

  remplissageCommentaire(idComposantMemory);
})

//----------------------------------------------//
///// Evenement par rapport a la navigation //////
//----------------------------------------------//
colonne3.addEventListener('mouseout', ()=>{
  survolePasRepresentationReticule();
});
colonne4.addEventListener('mouseout', ()=>{
  survolePasRepresentationComposant();
});

function survolePasRepresentationReticule(){
  if(reticuleSurvol){
    reticuleSurvol.style.backgroundColor = "white";
    if(reticuleSelect){
      reticuleSelect.style.backgroundColor = "F06400";
    }
  }
  //divTypeReticuleSurvol.style.display = "none";
}

function survolePasRepresentationComposant(){
  if(composantSurvol){
    composantSurvol.style.backgroundColor = "white";
    if(composantSelect){
      composantSelect.style.backgroundColor = "F06400";
    }
  }
  //divTypeComposantSurvol.style.display = "none";
}

function survolReticule(e){
    divTypeReticuleSurvol.style.display = "block";

    if(reticuleSurvol){
      reticuleSurvol.style.backgroundColor = "white";
    }
    reticuleSurvol = e.target;
    reticuleSelect.style.backgroundColor = "#F06400";
    reticuleSurvol.style.backgroundColor = "red";

    console.log(variableGlobaleStockageRequeteComposant);

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
}

function clickReticule(e){ // Lorsque l'on clique sur un réticule
  console.log(e.target);
  reticuleSelect.style.backgroundColor = "white";
  reticuleSelect = e.target;
  reticuleSelect.style.backgroundColor = "#F06400";

  //console.log(e.target.id.substr(8,e.target.id.length));
  selecteurReticule.value = e.target.id.substr(8,e.target.id.length);

  remplissageNomTypeReticule(affichageTypeReticule, selecteurReticule.value.substr(0,1), selecteurReticule.value.substr(1,1), variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
}

selecteurComposant.addEventListener('change', ()=>{ // Si le sélecteur de composant change
  composantSelect.style.backgroundColor = "white";
  composantSelect = document.getElementById("composant"+selecteurComposant.value);
  composantSelect.style.backgroundColor = "#F06400";

  remplissageTypeComposant(affichageTypeComposant, variableGlobaleStockageRequeteComposant);

});

selecteurReticule.addEventListener('change', ()=>{ // Si le séleteur de réticule change
  reticuleSelect.style.backgroundColor = "white";
  reticuleSelect = document.getElementById("reticule"+selecteurReticule.value);
  reticuleSelect.style.backgroundColor = "#F06400";

  remplissageNomTypeReticule(affichageTypeReticule, selecteurReticule.value.substr(0,1), selecteurReticule.value.substr(1,1), variableGlobaleStockageRequeteComposant);
  remplissageSelecteurComposant(selecteurComposant, variableGlobaleStockageRequeteComposant);
});

selecteurProjet.addEventListener('change', ()=>{ // Si le sélecteur de projet change
  console.log(variableGlobaleStockageRequeteProjetList);
  variableGlobaleStockageRequeteProjetList["Nom_projet"].forEach((nomProjet, indexProjet) => {
    if(nomProjet == selecteurProjet.value)
    {
      remplissageNomClient(affichageNomClient ,listProjet.results[0]["id_client"][indexProjet]);
      remplissageSelecteurWafer(selecteurWafer, listProjet.results[0]["Nom_projet"][indexProjet]);
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

selecteurParametre.addEventListener('change', ()=>{
  parametreSelect = selecteurParametre.value;
})

start();
