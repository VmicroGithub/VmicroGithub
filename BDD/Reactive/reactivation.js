
function displayAll()
{
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';

}
/*
document.addEventListener("DOMContentLoaded", function() {
  activate();
});
*/
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
      conteneur.appendChild(option);
    });
  });
}

function remplissageSelecteurProjet(conteneur){
  conteneur.innerHTML = "";
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

function removeDuplicates(tab) {
  let unique = {};
  tab.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
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

function remplissageSelecteurTypeReticule(url,conteneur){
  
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false); // false for synchronous request
  xmlHttp.send( null );
  var resultReq = JSON.parse(xmlHttp.responseText);
  console.log(resultReq);

  var tableauDistinct = removeDuplicates(resultReq.results[0].reticule_type_nom);
    console.log(tableauDistinct);
    tableauDistinct.forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      conteneur.appendChild(option);
    });


}

function remplissageSelecteurTypeComposant(url,conteneur){
  
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false); // false for synchronous request
  xmlHttp.send( null );
  var resultReq = JSON.parse(xmlHttp.responseText);
  console.log(resultReq);

  var tableauDistinct = removeDuplicates(resultReq.results[0].Nom_type_composant);
    console.log(tableauDistinct);
    tableauDistinct.forEach(function(item, i){
      option = document.createElement('option');
      option.appendChild(document.createTextNode(item));
      option.value = item;
      conteneur.appendChild(option);
    });


}

function start()
{
  
    var tableauClient = document.getElementById('tableauClient');
    var tableauProjet = document.getElementById('tableauProjet');
    var tableauParametre = document.getElementById('tableauParametre');
    var tableauCategorie = document.getElementById('tableauCategorie');
    var selecteurProjet = document.getElementById("selecteurProjet");
    var selecteurWafer = document.getElementById("selecteurWafer");
    var buttonSupWafer = document.getElementById('buttonSupWafer');
    var buttonSupTypeReticule = document.getElementById('buttonSupTypeReticule');
    var buttonSupTypeComposant = document.getElementById('buttonSupTypeComposant');


    tableauClient.innerHTML = "";
    tableauProjet.innerHTML = "";
    tableauParametre.innerHTML = "";
    tableauCategorie.innerHTML = "";

    var url;
    var i=0;
    var nbInactif = 0;
    var row;
    var cell;
    var cellText;



    remplissageSelecteurProjet(selecteurProjet);

    var selecteurTypeWafer = document.getElementById('selecteurTypeWafer');

    fillSelectorWithRequeteTypeWafer('https://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurTypeWafer);
    
    var selecteurTypeReticule = document.getElementById('selecteurTypeReticule');

    remplissageSelecteurTypeReticule('https://vmicro.fr/database/BDD_1.0/API/api.php?action=ReticuleTypeLIST',selecteurTypeReticule);

    var selecteurTypeComposant = document.getElementById('selecteurTypeComposant');

    remplissageSelecteurTypeComposant('https://vmicro.fr/database/BDD_1.0/API/api.php?action=TypeComposantNameLIST', selecteurTypeComposant);

    // Affichage de la liste de clients
    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
    ajaxGet(url, function(reponse){
      resultReq = JSON.parse(reponse);
      console.log(resultReq.results[0]);
      while(i<resultReq.results[0].id_client.length)
      {
        if(resultReq.results[0].activation[i] == 0)
        {
          nbInactif++;

          row = document.createElement("tr");
          cell = document.createElement("td");
          cellText = document.createTextNode(resultReq.results[0].id_client[i]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          cell = document.createElement("td");
          cellText = document.createTextNode(resultReq.results[0].Nom_client[i]);
          cell.appendChild(cellText);
          row.appendChild(cell);

          cell = document.createElement("td");
          button = document.createElement("BUTTON");
          buttonText = document.createTextNode("ACTIVATE");
          button.appendChild(buttonText);
          button.className = "buttonActivateClient";
          //button.className = "buttonActivate";
          cell.appendChild(button);
          row.appendChild(cell);

          tableauClient.appendChild(row);
        }
        i++;
      }
      // Case vide car pas de client desactivé
      if(nbInactif == 0)
      {

      }

      // Affichage de la liste de projets
      url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ProjetLIST';
      ajaxGet(url, function(reponse2){
        resultReq2 = JSON.parse(reponse2);

        i=0;
        nbInactif = 0;

        console.log(resultReq2.results[0]);
        //console.log(resultReq2.results[0].id_projet.length);
        //console.log(i);
        while(i<resultReq2.results[0].id_projet.length)
        {
          //console.log(resultReq2.results[0].activation[i]);
          if(resultReq2.results[0].activation[i] == 0)
          {
            nbInactif++;

            row = document.createElement("tr");
            cell = document.createElement("td");
            //console.log(resultReq2.results[0].id_projet[i]);
            cellText = document.createTextNode(resultReq2.results[0].id_projet[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            //console.log(resultReq2.results[0].Nom_projet[i]);
            cellText = document.createTextNode(resultReq2.results[0].Nom_projet[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            //console.log(resultReq2.results[0].id_client[i]);
            cellText = document.createTextNode(resultReq2.results[0].id_client[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            //console.log(resultReq2.results[0].description[i]);
            cellText = document.createTextNode(resultReq2.results[0].description[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            //console.log(resultReq2.results[0].last_modif[i]);
            cellText = document.createTextNode(resultReq2.results[0].last_modif[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            //console.log(resultReq2.results[0].etat[i]);
            cellText = document.createTextNode(resultReq2.results[0].etat[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);

            cell = document.createElement("td");
            button = document.createElement("BUTTON");
            buttonText = document.createTextNode("ACTIVATE");
            button.appendChild(buttonText);
            button.className = "buttonActivateProjet";
            //button.className = "buttonActivate";
            cell.appendChild(button);
            row.appendChild(cell);

            tableauProjet.appendChild(row);
          }
          i++;
        }
        // Case vide car pas de projet desactivé
        if(nbInactif == 0)
        {

        }

        // Affichage de la liste de parametres
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ParamLIST';
        ajaxGet(url, function(reponse3){
          resultReq3 = JSON.parse(reponse3);

          i=0;
          nbInactif = 0;

          console.log(resultReq3.results[0]);
          //console.log(resultReq3.results[0].id_projet.length);
          //console.log(i);
          while(i<resultReq3.results[0].id_param.length)
          {
            //console.log(resultReq3.results[0].activation[i]);
            if(resultReq3.results[0].activation[i] == 0)
            {
              nbInactif++;

              row = document.createElement("tr");
              cell = document.createElement("td");
              //console.log(resultReq3.results[0].id_projet[i]);
              cellText = document.createTextNode(resultReq3.results[0].id_param[i]);
              cell.appendChild(cellText);
              row.appendChild(cell);

              cell = document.createElement("td");
              //console.log(resultReq3.results[0].Nom_projet[i]);
              cellText = document.createTextNode(resultReq3.results[0].Nom_Parametre[i]);
              cell.appendChild(cellText);
              row.appendChild(cell);

              cell = document.createElement("td");
              //console.log(resultReq3.results[0].id_client[i]);
              cellText = document.createTextNode(resultReq3.results[0].Unite[i]);
              cell.appendChild(cellText);
              row.appendChild(cell);

              cell = document.createElement("td");
              button = document.createElement("BUTTON");
              buttonText = document.createTextNode("ACTIVATE");
              button.appendChild(buttonText);
              button.className = "buttonActivateParametre";
              //button.className = "buttonActivate";
              cell.appendChild(button);
              row.appendChild(cell);

              tableauParametre.appendChild(row);
            }
            i++;
          }
          // Case vide car pas de projet desactivé
          if(nbInactif == 0)
          {

          }

          // Affichage de la liste de categorie
          url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
          ajaxGet(url, function(reponse4){
            resultReq4 = JSON.parse(reponse4);

            i=0;
            nbInactif = 0;

            var tableauDistinct = onlyOne(resultReq4.results[0].Nom_categorie,resultReq4.results[0].id_categorie, resultReq4.results[0].activation);

            //console.log(resultReq4.results[0]);
            console.log(tableauDistinct);
            while(i<tableauDistinct[0].length)
            {

              row = document.createElement("tr");
              cell = document.createElement("td");
              //console.log(resultReq4.results[0].id_projet[i]);
              cellText = document.createTextNode(tableauDistinct[0][i]);
              cell.appendChild(cellText);
              row.appendChild(cell);

              cell = document.createElement("td");
              //console.log(resultReq4.results[0].Nom_projet[i]);
              cellText = document.createTextNode(tableauDistinct[1][i]);
              cell.appendChild(cellText);
              row.appendChild(cell);

              cell = document.createElement("td");
              button = document.createElement("BUTTON");
              buttonText = document.createTextNode("ACTIVATE");
              button.appendChild(buttonText);
              button.className = "buttonActivateCategorie";
              //button.className = "buttonActivate";
              cell.appendChild(button);
              row.appendChild(cell);

              tableauCategorie.appendChild(row);
              i++;
            }
            activate();
          });
        });
      });
    });
}

function onlyOne(tabNom, tabIndex, tabActif)
{
  //On regarde si le nom exite dans le tableau de sortie
  // S'il n'existe pas on l'ajoute
  var tabSortie = [];
  var tabNomS = [];
  var tabIndexS = [];
  var exist = false;

  for(let a=0; a<tabNom.length; a++)
  {
    exist = false;
    //console.log(tabNomS.length);
    for(let b=0; b<tabNomS.length;b++)
    {
      if(tabNom[a] == tabNomS[b])
      {
          exist = true;
          break;
      }
    }
    if(exist == false)
    {
      if(tabActif[a] == 0) // On affiche que les non actifs
      {
        tabNomS.push(tabNom[a]);
        tabIndexS.push(tabIndex[a]);
      }
    }
  }
  //console.table(tabIndexS);
  //console.table(tabNomS);

  tabSortie.push(tabIndexS);
  tabSortie.push(tabNomS);

  return tabSortie;

}

function activate()
{
  var id = 0;
  var url;

  //var gridButtonActivateTest = document.getElementById('tableauTest').getElementsByTagName("button");
  //console.log(gridButtonActivateTest)
  //console.log(gridButtonActivateTest.length);

  //var gridButtonActivateClient = document.getElementById('tableauClient').getElementsByTagName("button");
  //console.log(gridButtonActivateClient)
  //console.log(gridButtonActivateClient.length);

  //var gridButtonActivateProjet = document.getElementById('tableauProjet').getElementsByTagName("button");
  //console.log(gridButtonActivateProjet)
  //console.log(gridButtonActivateProjet.length);

  //var gridButtonActivateParametre = document.getElementById('tableauParametre').getElementsByTagName("button");
  //console.log(gridButtonActivateParametre)
  //console.log(gridButtonActivateParametre.length);

  //var gridButtonActivateCategorie = document.getElementById('tableauCategorie').getElementsByTagName("button");
  //console.log(gridButtonActivateCategorie)
  //console.log(gridButtonActivateCategorie.length);

  var gridButtonActivateClient = document.querySelectorAll('.buttonActivateClient');
  var gridButtonActivateProjet = document.querySelectorAll('.buttonActivateProjet');
  var gridButtonActivateParametre = document.querySelectorAll('.buttonActivateParametre');
  var gridButtonActivateCategorie = document.querySelectorAll('.buttonActivateCategorie');

  //console.log(gridButtonActivateClient);
  //console.log(gridButtonActivateProjet);
  //console.log(gridButtonActivateParametre);
  //console.log(gridButtonActivateCategorie);

  var tableauClient = document.getElementById("tableauClient");
  //console.log(tableauClient);
  var trsClient = tableauClient.getElementsByTagName("tr");
  //console.log(trsClient);
  var tdsClient = null;

  gridButtonActivateClient.forEach(function(item,idx){
    item.addEventListener('click', function(){
      tdsClient = trsClient[idx].getElementsByTagName("td");
      //console.log(tdsClient[0].innerHTML);
      //console.log(tdsClient[1].innerHTML);
      if(confirm("Attention ! Cette action va faire ré-intégrer ce client ?"))
      {
        id = tdsClient[0].innerHTML;
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=activateClient&id_client='+id;
        ajaxGet(url,function(reponse1){
          resultReq1 = JSON.parse(reponse1);
          console.log(resultReq1);
          document.location.reload();
        });
      }
    });
  });

  var tableauProjet = document.getElementById("tableauProjet");
  //console.log(tableauProjet);
  var trsProjet = tableauProjet.getElementsByTagName("tr");
  //console.log(trsProjet);
  var tdsProjet = null;

  gridButtonActivateProjet.forEach(function(item,idx){
    item.addEventListener('click', function(){
      tdsProjet = trsProjet[idx].getElementsByTagName("td");
      //console.log(tdsProjet[0].innerHTML);
      //console.log(tdsProjet[1].innerHTML);
      if(confirm("Attention ! Cette action va faire ré-intégrer ce projet ?"))
      {
        id = tdsProjet[0].innerHTML;
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=activateProjet&id_projet='+id;
        ajaxGet(url,function(reponse2){
          resultReq2 = JSON.parse(reponse2);
          console.log(resultReq2);
          document.location.reload();
        });
      }
    });
  });

  var tableauParametre = document.getElementById("tableauParametre");
  //console.log(tableauParametre);
  trsParametre = tableauParametre.getElementsByTagName("tr");
  //console.log(trsParametre);
  tdsParametre = null;

  gridButtonActivateParametre.forEach(function(item,idx){
    item.addEventListener('click', function(){
      tdsParametre = trsParametre[idx].getElementsByTagName("td");
      //console.log(tdsParametre[0].innerHTML);
      //console.log(tdsParametre[1].innerHTML);
      if(confirm("Attention ! Cette action va faire ré-intégrer ce parametre ?"))
      {
        id = tdsParametre[0].innerHTML;
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=activateParametre&id_parametre='+id;
        ajaxGet(url,function(reponse3){
          resultReq3 = JSON.parse(reponse3);
          console.log(resultReq3);
          document.location.reload();
        });
      }
    });
  });

  var tableauCategorie = document.getElementById("tableauCategorie");
  //console.log(tableauCategorie);
  trsCategorie = tableauCategorie.getElementsByTagName("tr");
  //console.log(trsCategorie);
  tdsCategorie = null;

  gridButtonActivateCategorie.forEach(function(item,idx){
    item.addEventListener('click', function(){
      tdsCategorie = trsCategorie[idx].getElementsByTagName("td");
      //console.log(tdsCategorie[0].innerHTML);
      //console.log(tdsCategorie[1].innerHTML);
      if(confirm("Attention ! Cette action va faire ré-intégrer cette catégorie ?"))
      {
        url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=activateCategorie&nom_categorie='+tdsCategorie[1].innerHTML;
        console.log(url);
        ajaxGet(url,function(reponse4){
          resultReq4 = JSON.parse(reponse4);
          console.log(resultReq4);
          document.location.reload();
        });
      }
    });
  });

  selecteurProjet.addEventListener('change', ()=>{ // Si le sélecteur de projet change
    console.log(variableGlobaleStockageRequeteProjetList);
    variableGlobaleStockageRequeteProjetList["Nom_projet"].forEach((nomProjet, indexProjet) => {
      if(nomProjet == selecteurProjet.value)
      {
        remplissageSelecteurWafer(selecteurWafer, listProjet.results[0]["Nom_projet"][indexProjet],null);
      }
    });
  });
/*
  for(idx1=0; idx1<gridButtonActivateClient.length; idx1++)
  {
    console.log(gridButtonActivateClient[idx1]);
    gridButtonActivateClient[idx1].addEventListener('click', function(){
      console.log("click");
      console.log(idx1);
      console.log(document.getElementById('tableauClient').getElementsByTagName('tr')[idx1].getElementsByTagName('td')[0].innerHTML);

      //url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action"

    });
  }
  for(idx2=0; idx2<gridButtonActivateProjet.length; idx2++)
  {
    console.log(gridButtonActivateProjet[idx2]);
    console.log(document.getElementById('tableauProjet').getElementsByTagName('tr')[idx2]);
    console.log(idx2);
    gridButtonActivateProjet[idx2].addEventListener('click', function(){
      console.log("click");
    });
  }
  for(var idx3=0; idx3<gridButtonActivateParametre.length; idx3++)
  {
    console.log(gridButtonActivateParametre[idx3]);
    console.log(document.getElementById('tableauParametre').getElementsByTagName('tr')[idx3]);
    console.log(idx3);
    gridButtonActivateParametre[idx3].addEventListener('click', function(){
      console.log("click");
      });
  }
  for(var idx4=0; idx4<gridButtonActivateCategorie.length; idx4++)
  {
    console.log(document.getElementById('tableauCategorie').getElementsByTagName('tr')[idx4]);
    console.log(gridButtonActivateCategorie[idx4]);
    console.log(idx4);
    gridButtonActivateCategorie[idx4].addEventListener('click', function(){
      console.log("click");
    });
  }
  */
  function supprimer_Wafer(){
    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteWafer&Nom_Wafer='+selecteurWafer.value;
      ajaxGet(url,function(reponse1){
        console.log("Le type wafer a été supprimé.");
      });
  
   }

 function supprimer_TypeWafer(){
  url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteTypeWafer&Nom_Type_Wafer='+selecteurTypeWafer.value;
    ajaxGet(url,function(reponse1){
      console.log("Le type wafer a été supprimé.");
    });

 }

 function supprimer_TypeReticule(){
  url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteTypeReticule&Nom_Type_Reticule='+selecteurTypeReticule.value;
    ajaxGet(url,function(reponse1){
      console.log("Le type reticule a été supprimé.");
    });

 }

 function supprimer_TypeComposant(){
  url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteTypeComposant&Nom_Type_C='+selecteurTypeComposant.value;
    ajaxGet(url,function(reponse1){
      console.log("Le type composant a été supprimé.");
    });

  }

  buttonSupWafer.addEventListener('click', ()=>{ // Si le sélecteur de projet change
    supprimer_Wafer();
    alert("Le wafer : " + selecteurWafer.value + " a été supprimer");
    document.location.reload();
  });

  buttonSupTypeWafer.addEventListener('click', ()=>{ // Si le sélecteur de projet change

    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=Type_Wafer_withNomWafer&Type_Wafer='+selecteurTypeWafer.value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    var resultReq = JSON.parse(xmlHttp.responseText);
    console.log(resultReq);
    if(resultReq.results==null){
      supprimer_TypeWafer();
      alert("Le Type Wafer : " + selecteurTypeWafer.value + " a été supprimer");
      document.location.reload();
    }
    else {alert("Pour supprimer le Type wafer  : " + selecteurTypeWafer.value + ". Il faut supprimer les wafers : "+ resultReq.results.nom_wafer);}
    
  });

  buttonSupTypeReticule.addEventListener('click', ()=>{ // Si le sélecteur de projet change

    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=Type_Wafer_withTypeReticule&Nom_Type_Reticule='+selecteurTypeReticule.value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    var resultReq = JSON.parse(xmlHttp.responseText);
    console.log(resultReq);
    if(resultReq.results==null){
      supprimer_TypeReticule();
      alert("Le Type Reticule : " + selecteurTypeReticule.value + " a été supprimer");
      document.location.reload();
    }
    else {alert("Pour supprimer le Type reticule  : " + selecteurTypeReticule.value + ". Il faut supprimer les types wafers : "+ resultReq.results.type_wafer);}
    
  });

  buttonSupTypeComposant.addEventListener('click', ()=>{ // Si le sélecteur de projet change

    url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=Type_Reticule_withType_Composant&Nom_Type_C='+selecteurTypeComposant.value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false); // false for synchronous request
    xmlHttp.send( null );
    var resultReq = JSON.parse(xmlHttp.responseText);
    console.log(resultReq);
    if(resultReq.results==null){
      supprimer_TypeComposant();
      alert("Le Type Composant : " + selecteurTypeComposant.value + " a été supprimer");
      document.location.reload();
    }
    else {alert("Pour supprimer le Type Composant  : " + selecteurTypeComposant.value + ". Il faut supprimer les types reticules : "+ resultReq.results.nom_type_reticule);}
    
  });
}

displayAll();
start();
