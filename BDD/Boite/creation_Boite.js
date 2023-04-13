//***************************************************************************//
//Variable Globale

const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');

var num_box = document.getElementById('num_box');

var erreur1 = document.getElementById('error1');

var corpsTableauBoite = document.getElementById('corpsTableauBoite');
var menuDeroulantClient = document.getElementById("menuDeroulantClient");

//***************************************************************************//
// Partie du code qui regroupe les fonctions :
function chargementClient(){

  var option;
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=ClientLIST';
  var i=0;
  ajaxGet(url,function(reponse){
    resultReq = JSON.parse(reponse);

    while(i<resultReq.results[0].id_client.length)
    {
      option = document.createElement("option");
      option.text = resultReq.results[0].Nom_client[i];
      option.value = resultReq.results[0].id_client[i];
      menuDeroulantClient.add(option);
      i++;
    }
  });
}
function chargementDesBoites(){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getAllBox&option=2';
  ajaxGet(url, function(reponseGetAllBox){

    getAllBox = JSON.parse(reponseGetAllBox);
    console.log(getAllBox);

    getAllBox['results'].forEach((boite, indexBoite) => {
      //Création d'un élément ligne
      ligne = document.createElement("tr");
      //Création des éléments colonnes
      colonne_num_box = document.createElement("td");
      colonne_nb_comp_box = document.createElement("td");
      colonne_client_box = document.createElement("td");
      colonne_expedie_box = document.createElement("td");
      colonne_date_expedition_box = document.createElement("td");

      colonne_num_box.style.textAlign = "center";
      colonne_nb_comp_box.style.textAlign = "center";
      colonne_client_box.style.textAlign = "center";
      colonne_expedie_box.style.textAlign = "center";
      colonne_date_expedition_box.style.textAlign = "center";

      colonne_num_box.style.height = "30px";
      colonne_nb_comp_box.style.height = "30px";
      colonne_client_box.style.height = "30px";
      colonne_expedie_box.style.height = "30px";
      colonne_date_expedition_box.style.height = "30px";

      //Création des éléments span
      console.log(boite);

      a = document.createElement("a");
      a.innerHTML = boite['num_box'];
      a.href = "https://vmicro.fr/database/BDD_1.0/Boite/affichageBoite.php?num_box="+boite['num_box'];
      a.style.textDecoration = "none";
      a.style.color = "black";

      span2 = document.createElement("span");
      span2.innerHTML = boite['nb_compo'][0];
      console.log(boite['nb_compo'][0]);

      span3 = document.createElement("span");
      span3.innerHTML = boite['Nom_Entreprise'];

      span4 = document.createElement("span");
      if(boite['Expedie']==0)
      {
        span4.innerHTML = "Non";
      }
      if(boite['Expedie']==1){
        span4.innerHTML = "Oui";
      }

      span5 = document.createElement("span");
      if(boite['Date_Expedition'] == "0000-00-00 00:00:00"){
        span5.innerHTML = "";
      }
      else {
        span5.innerHTML = boite['Date_Expedition'];
      }

      //Ajout des spans aux cellules
      colonne_num_box.appendChild(a);
      colonne_nb_comp_box.appendChild(span2);
      colonne_client_box.appendChild(span3);
      colonne_expedie_box.appendChild(span4);
      colonne_date_expedition_box.appendChild(span5);
      //Ajout des cellules à la ligne
      ligne.appendChild(colonne_num_box);
      ligne.appendChild(colonne_nb_comp_box);
      ligne.appendChild(colonne_client_box);
      ligne.appendChild(colonne_expedie_box);
      ligne.appendChild(colonne_date_expedition_box);

      //Ajout de la ligne au corps du tableau
      corpsTableauBoite.appendChild(ligne);

    });
  });
}
function start(){
  chargementDesBoites();
  chargementClient();
}
// Partie du code qui regroupe les événements :
boutonValide.addEventListener('click', function(){
  var valideFormulaire = true;

  var buffer1 = num_box.value;
  var buffer2 = menuDeroulantClient.value;

  console.log(buffer1);
  console.log("ici"+buffer2);

  if(num_box.value == ""){
    erreur1.style.display = "block";
    valideFormulaire = false;
  }

  if(valideFormulaire==true){
    erreur1.style.display="none";

    var data = new FormData();

    data.append('action', 'addBox');
    data.append('num_box', buffer1);
    data.append('client', buffer2);

    var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
    ajaxPost(url, data, function(reponse){
      console.log(reponse);
      window.alert("La boite "+ buffer1 + " à été créée");
      document.location.href="https://vmicro.fr/database/BDD_1.0/Boite/creation_Boite.php";
    });
  }
});

start();
