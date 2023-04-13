var selecteurWaferType = document.getElementById('selectWaferType');
var svgPrincipale = document.getElementById("svgPrincipale");
var couche_reticule = document.getElementById("couche_reticule");
var affichageWafer = document.getElementById("affichageWafer");
var wafer = document.getElementById("wafer");
var meplat = document.getElementById("meplat");

var facteurResize = 0;
var rayon = 0;
var centreWaferX;
var centreWaferY;

fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurWaferType);
fitSVGwithWindow();

function fillSelectorWithRequeteTypeWafer(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
  var resultReq = JSON.parse(reponse);
  console.log(resultReq.results[0]);
  console.log(resultReq.results[0].Nom_Type_wafer);
  var tableauDistinct = removeDuplicates(resultReq.results[0].Nom_Type_wafer);
  console.log(tableauDistinct);
  tableauDistinct.forEach(function(item, i){
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    option.value = item;
    conteneur.appendChild(option);
    });
  });
}

function fitSVGwithWindow(){

  var tailleX = window.innerWidth;
  var tailleY = window.innerHeight - 113;

  console.log(tailleX);
  console.log(tailleY);

  //console.log(document.body.clientWidth);
  //console.log(document.body.clientHeight);

  centreWaferX = tailleX/2;
  centreWaferY = tailleY/2;

  console.log("Centre X = " + centreWaferX);
  console.log("Centre Y = " + centreWaferY);

  if(tailleX>tailleY){
    rayon = centreWaferY - 50;
  }
  else {
    rayon = centreWaferX - 50;
  }

  console.log("Rayon:" +rayon);

  var newWafer = document.createElementNS("https://www.w3.org/2000/svg", "circle");
  newWafer.setAttribute("cx",centreWaferX);
  newWafer.setAttribute("cy",centreWaferY);
  newWafer.setAttribute("r",rayon);
  newWafer.setAttribute("fill","black");
  svgPrincipale.appendChild(newWafer);

  var newMeplat = document.createElementNS("https://www.w3.org/2000/svg", "rect");
  newMeplat.setAttribute("height", tailleY);
  newMeplat.setAttribute("width", centreWaferX-rayon+40);
  newMeplat.setAttribute("fill","white");
  svgPrincipale.appendChild(newMeplat);
  //meplat.setAttribute("height", tailleY);
  //meplat.setAttribute("width", centreWaferX-rayon+40);

}

function displayWafer(){
  svgPrincipale.innerHTML = "";

  fitSVGwithWindow();

  ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', function(reponse1){
    var resultReq1 = JSON.parse(reponse1);
    ajaxGet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST', function(reponse2){
      var resultReq2 = JSON.parse(reponse2);
      console.log(resultReq2.results[0]);

      var tableauWafer = selectionWafer(selectWaferType.value, resultReq1.results[0]);
      console.log(tableauWafer);
      if(tableauWafer['taille_wafer'][0]=='4'){
        facteurResize = 50.6/rayon;
      }

      tableauWafer['Nom_Type_reticule'].forEach((item, i) => {

        var positionX = (parseInt(tableauWafer['position_reticule_x'][i]*100*facteurResize)+centreWaferX);
        var positionY = (-parseInt(tableauWafer['position_reticule_y'][i]*100*facteurResize)+centreWaferY);

        if(tableauWafer['Nom_Type_reticule'][i] != "")
        {
          for(var iReticule=0; iReticule<resultReq2.results[0]['reticule_type_nom'].length; iReticule++){
            if(item == resultReq2.results[0]['reticule_type_nom'][iReticule]){

                tailleReticuleX = resultReq2.results[0]['reticule_taille_X'][iReticule]*100*facteurResize;
                tailleReticuleY = resultReq2.results[0]['reticule_taille_Y'][iReticule]*100*facteurResize;

                var newRet = document.createElementNS("https://www.w3.org/2000/svg", "rect");
                newRet.setAttribute("x",positionX);
                newRet.setAttribute("y",positionY);
                newRet.setAttribute("width",tailleReticuleX);
                newRet.setAttribute("height",tailleReticuleY);
                newRet.setAttribute("fill","red");
                svgPrincipale.appendChild(newRet);
            }
          }
        }
      });
    });
  });
}

function selectionWafer(nomTypeWafer, tableauRecherche){
  var tableauRetour = Array();
  tableauRetour['Nom_Type_reticule'] = Array();
  tableauRetour['coordonnee_reticule_x'] = Array();
  tableauRetour['coordonnee_reticule_y'] = Array();
  tableauRetour['id_type_wafer'] = Array();
  tableauRetour['position_reticule_x'] = Array();
  tableauRetour['position_reticule_y'] = Array();
  tableauRetour['taille_wafer'] = Array();
  console.log(tableauRecherche);
  tableauRecherche['Nom_Type_wafer'].forEach((item, i) => {
    if(item == nomTypeWafer){
      tableauRetour['Nom_Type_reticule'].push(tableauRecherche['Nom_Type_reticule'][i]);
      tableauRetour['coordonnee_reticule_x'].push(tableauRecherche['coordonnee_reticule_x'][i]);
      tableauRetour['coordonnee_reticule_y'].push(tableauRecherche['coordonnee_reticule_y'][i]);
      tableauRetour['id_type_wafer'].push(tableauRecherche['id_type_wafer'][i]);
      tableauRetour['position_reticule_x'].push(tableauRecherche['position_reticule_x'][i]);
      tableauRetour['position_reticule_y'].push(tableauRecherche['position_reticule_y'][i]);
      tableauRetour['taille_wafer'].push(tableauRecherche['taille_wafer'][i]);
    }
  });
  //console.log(tableauRetour);
  return tableauRetour;
}

window.addEventListener('resize', fitSVGwithWindow);
selecteurWaferType.addEventListener('change', displayWafer);
