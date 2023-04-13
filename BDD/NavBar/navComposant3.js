var selecteurProjet = document.getElementById("selecteurProjet");
var affichageNomClient = document.getElementById("affichageNomClient");
var selecteurWafer = document.getElementById("selecteurWafer");

/* START */
remplissageSelecteurProjet(selecteurProjet);
/* */

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
      console.log("remplissageSelecteurWafer");
      remplissageSelecteurWafer(selecteurWafer ,listProjet.results[0]["Nom_projet"][0])
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
            remplissageNomTypeWafer(affichageTypeWafer,listWafer.results[0]['Nom_Type_Wafer'][indexWafer]);
            loadComponent(listWafer.results[0]['Nom_Wafer'][indexWafer]);
          }
        }
        conteneur.appendChild(option);
      });
 
      variableGlobaleStockageRequeteWaferByNameProject = listWafer.results[0];
      if(value == null) {
        remplissageNomTypeWafer(affichageTypeWafer,);
        loadComponent(listWafer.results[0]['Nom_Wafer'][0]);
      }
 
    });
 }
 /* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

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