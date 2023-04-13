//***************************************************************************//
//Variable Globale

const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

var selecteurProjet = document.getElementById('selectProjet');
var selecteurTypeWafer = document.getElementById('selectTypeWafer');

//***************************************************************************//
// Partie du code qui regroupe les fonctions
function fillSelectorWithRequeteProjet(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);
    var tableauDistinctNom = doublonType1(resultReq.results[0].Nom_projet,resultReq.results[0].activation);
    var tableauDistinctID = doublonType1(resultReq.results[0].id_projet, resultReq.results[0].activation);
    console.log(tableauDistinctNom);
    console.log(tableauDistinctID);
    tableauDistinctNom[0].forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = tableauDistinctID[0][i];
      conteneur.appendChild(option);
    });
  });
}

function fillSelectorWithRequeteTypeWafer(lienAPI, conteneur){
  ajaxGet(lienAPI, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq.results[0]);
    console.log(resultReq.results[0].Nom_Type_wafer);
    var tableauDistinct = removeDuplicates(resultReq.results[0].Nom_Type_wafer);
    console.log(tableauDistinct);
    tableauDistinct.forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      conteneur.appendChild(option);
    });
  });
}

function start(){
  //Remplissage du sélecteur projet:
  fillSelectorWithRequeteProjet('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST', selecteurProjet);
  //Remplissage du sélecteur
  fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurTypeWafer);
}
//***************************************************************************//
// Partie du code qui regroupe les événements:

boutonValide.addEventListener('click',function(){
  var valideFormulaire = true;

  var idDuProjet = document.getElementById('selectProjet').value;
  var typeDuWafer = document.getElementById('selectTypeWafer').value;
  var numeroDuRun = document.getElementById('num_Run').value;
   
  if(numeroDuRun == ""){
    document.getElementById("error1").style.display="block";
    valideFormulaire = false;
  }
  var nomDuWafer = document.getElementById('nom_Wafer').value;
  /* 
    requete pas de doublon
  */
    var urldoublon = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferLIST_by_projet&ID_Projet=" + idDuProjet;
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urldoublon, false); // false for synchronous request
    xmlHttp.send( null );
    var responseDoublon = JSON.parse(xmlHttp.responseText);
    console.log(responseDoublon.results);
    try{
      if(responseDoublon.results.Nom_wafer.includes(nomDuWafer)){
        alert("Le wafer existe deja dans le projet selectionné");
        return;
      }
    }
    catch(TypeError){
      console.log("c'est vide");
    }
    /* 
    Fin requete pas de doublon
    */
  if(nomDuWafer == ""){
    document.getElementById("error2").style.display="block";
    valideFormulaire = false;
  }

  if(valideFormulaire == true){
    var data = new FormData();

    console.log("nom du wafer = "+nomDuWafer);
    console.log("type du wafer = "+typeDuWafer);
    console.log("numéro du run = "+ numeroDuRun);
    console.log("identifiant du projet = "+ idDuProjet)

    data.append('action', 'addWafer');
    data.append('nameWafer', nomDuWafer);
    data.append('typeWafer', typeDuWafer);
    data.append('num_Run', numeroDuRun);
    data.append('id_Projet', idDuProjet);

    var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
    ajaxPost(url, data, function(reponse){
      console.log(reponse);
    });
    document.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
  }
});

boutonAnnule.addEventListener('click',function(){

});

start();
