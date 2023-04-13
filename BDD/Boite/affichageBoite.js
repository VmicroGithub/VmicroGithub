var corpsTableauBoite = document.getElementById("corpsTableauBoite");
var selecteurClient = document.getElementById("selecteurClient");
var expedition_yes = document.getElementById("expedition_yes");
var expedition_no = document.getElementById("expedition_no");
var btn_expedier = document.getElementById("btn_expedier");
var btn_new_client = document.getElementById("btn_new_client");
var btn_old_client = document.getElementById("btn_old_client");
var div_New_Client = document.getElementById("div_New_Client");
var div_Selecteur_Client = document.getElementById("div_Selecteur_Client");
var div_Bouton_New_Client = document.getElementById("div_Bouton_New_Client");
var div_Bouton_Old_Client = document.getElementById("div_Bouton_Old_Client");
var name_new_client = document.getElementById("name_new_client");

var num_box = document.getElementById("num_box").value;

var typeClient=0;

//Partie fonctions
function remplissageClient(){
  var option;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=AllClientLIST';
  ajaxGet(url,function(reponse){
    resultReq = JSON.parse(reponse);

    console.log(resultReq);

    resultReq['results'][0]['Nom_client'].forEach((nom_client, indexClient) => {
      //console.log(nom_client);

      option = document.createElement("option");
      option.text = nom_client;
      option.value = nom_client;

      selecteurClient.add(option);
    });

  });
}
function remplissageExpedition(){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllBox&option=2';
  ajaxGet(url, function(reponseGetAllBox){

    getAllBox = JSON.parse(reponseGetAllBox);
    console.log(getAllBox);
    getAllBox['results'].forEach((boite, indexBoite) => {
      if(boite['num_box'] == num_box){
        if(boite['Expedie']==0){
          expedition_no.checked = true;
          expedition_yes.disabled = true;
        }
        else {
          expedition_yes.checked = true;
          selecteurClient.value = boite['Nom_Entreprise'];
          expedition_yes.disabled = false;
        }
      }
    });
  });
}

function remplissageComposantBoite(){

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getInsideBox&num_box='+num_box;
  console.log(url);
  ajaxGet(url, function(reponseGetInsideBox){
    getInsideBox = JSON.parse(reponseGetInsideBox);
    console.log(getInsideBox);

    getInsideBox["results"].forEach((composant, indexComposant) =>{
      var url2 = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllNavDataWithIdComponent&id_comp='+composant['ID_Composant'];
      console.log(url2);
      ajaxGet(url2, function(reponseAllDataComponent){
        allDataComponent = JSON.parse(reponseAllDataComponent);
        console.log(allDataComponent);
        var url3 = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getEtatComposant&ID_Component='+composant['ID_Composant'];
        console.log(url3); // On affiche le lien (Optionnel)
        ajaxGet(url3, function(reponseEtat){
          listEtat = JSON.parse(reponseEtat);
          var vie = listEtat.results[0]['vie'][0];

          //Création d'un élément ligne
          ligne = document.createElement("tr");
          //Création des éléments colonnes
          colonne_position_composant = document.createElement("td");
          colonne_type_wafer = document.createElement("td");
          colonne_type_reticule = document.createElement("td");
          colonne_type_composant = document.createElement("td");
          colonne_composant = document.createElement("td");
          colonne_etat = document.createElement("td");

          colonne_position_composant.style.textAlign = "center";
          colonne_type_wafer.style.textAlign = "center";
          colonne_type_reticule.style.textAlign = "center";
          colonne_type_composant.style.textAlign = "center";
          colonne_composant.style.textAlign = "center";
          colonne_etat.style.textAlign = "center";


          colonne_position_composant.style.height = "30px";
          colonne_type_wafer.style.height = "30px";
          colonne_type_reticule.style.height = "30px";
          colonne_type_composant.style.height = "30px";
          colonne_composant.style.height = "30px";
          colonne_etat.style.height = "30px";

          //Création des éléments span

          var span1 = document.createElement("span");
          if(composant['Pos_B']=="-1"){
            span1.innerHTML = ".";
          }
          else {
            span1.innerHTML = composant['Pos_B'];
          }

          var span2 = document.createElement("span");
          span2.innerHTML = allDataComponent['results'][4];

          var span3 = document.createElement("span");
          span3.innerHTML = allDataComponent['results'][7];

          var span4 = document.createElement("span");
          span4.innerHTML = allDataComponent['results'][1];

          var span5 = document.createElement("span");
          if(vie==0){
            span5.innerHTML = "Mort";
          }
          else {
            span5.innerHTML = "";
          }

          a = document.createElement("a");
          a.innerHTML = composant['ID_Composant'];
          a.href = "https://vmicro.fr/database/BDD_1.0/Composant/affichageComposant.php?selectedComponent="+composant['ID_Composant'];
          a.style.textDecoration = "none";
          a.style.color = "black";

          //Ajout des spans aux cellules
          colonne_position_composant.appendChild(span1);
          colonne_type_wafer.appendChild(span2);
          colonne_type_reticule.appendChild(span3);
          colonne_type_composant.appendChild(span4);
          colonne_composant.appendChild(a);
          colonne_etat.appendChild(span5);

          //Ajout des cellules à la ligne
          ligne.appendChild(colonne_position_composant);
          ligne.appendChild(colonne_type_wafer);
          ligne.appendChild(colonne_type_reticule);
          ligne.appendChild(colonne_type_composant);
          ligne.appendChild(colonne_composant);
          ligne.appendChild(colonne_etat);

          //Ajout de la ligne au corps du tableau
          corpsTableauBoite.appendChild(ligne);
        });
      });
    });
  });
}
function start(){
  remplissageClient();
  remplissageExpedition();
  remplissageComposantBoite();
}
//Partie événements
expedition_no.addEventListener('click', function(){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateExpedition&option=1&num_box='+num_box;
  console.log(url);
  ajaxGet(url, function(reponseExpediePas){
     expediePas = JSON.parse(reponseExpediePas);
     console.log(expediePas);
     window.location.href = "https://vmicro.fr/database/BDD_1.0/Boite/creation_Boite.php";
  });

  expedition_yes.disabled = true;
});
btn_expedier.addEventListener('click', function(){
  if(typeClient == 0){
    //REQUETE POUR UPDATE L'ETAT D'EXPEDITION ET LE CLIENT
    var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateExpedition&option=2&nom_client='+selecteurClient.value+'&num_box='+num_box;
    console.log(url);
    ajaxGet(url, function(reponseExpedie){
       expedie = JSON.parse(reponseExpedie);
       console.log(expedie);
       window.location.href = "https://vmicro.fr/database/BDD_1.0/Boite/creation_Boite.php";
    });
  }
  if(typeClient == 1){
    if (confirm("ATTENTION !  Vous allez créer un nouveau client nommée "+name_new_client.value+"?")){
      //création du client dans la base client_expedition
      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
      var data = new FormData();

      data.append('action','addClientExpedition');
      data.append('name_client',name_new_client.value);

      ajaxPost(url,data,function(reponse){
        console.log(reponse);
        var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateExpedition&option=2&nom_client='+name_new_client.value+'&num_box='+num_box;
        console.log(url);
        ajaxGet(url, function(reponseExpedie){
           expedie = JSON.parse(reponseExpedie);
           console.log(expedie);
           window.location.href = "https://vmicro.fr/database/BDD_1.0/Boite/creation_Boite.php";
        });
      });
    }
  }
});
btn_new_client.addEventListener('click', function(){
  div_New_Client.style.display="contents";
  div_Selecteur_Client.style.display="none";
  div_Bouton_Old_Client.style.display="flex";
  div_Bouton_New_Client.style.display="none";

  typeClient = 1;
});
btn_old_client.addEventListener('click', function(){
  div_New_Client.style.display="none";
  div_Selecteur_Client.style.display="contents";
  div_Bouton_Old_Client.style.display="none";
  div_Bouton_New_Client.style.display="flex";

  type_Client = 0;
});

start();
