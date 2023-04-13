var name_type_c_GET = document.getElementById("type_c_GET").value;
var id_comp_GET = document.getElementById("id_comp_GET").value;

const boutonValide = document.querySelector('.valide');
const boutonRetour = document.querySelector('.retour');

var listeParam = document.getElementById('listeParam');

var nbInput = 0;
var initialValue = [];

function start(){
  var i=0;

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getTypicalMesureWithNameTypeComponent&nom_type_composant='+name_type_c_GET;
  console.log(url);

  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);

    console.log(resultReq);

    //var url2 = "https://vmicro.fr/database/BDD_1.0`/API/api.php?action="

    while(i < resultReq.results[0]['Nom_Parametre'].length)
    {
      label = document.createElement('label');
      label.textContent = "Veuillez indiquer la valeur du parametre : "+ resultReq.results[0].Nom_Parametre[i]+" ("+resultReq.results[0].Unite[i]+')';
      listeParam.appendChild(label);

      input = document.createElement("INPUT");
      input.id = 'input('+i+')';
      input.type = 'number';
      input.value = resultReq.results[0].Valeur[i];
      listeParam.appendChild(input);

      initialValue.push(resultReq.results[0].Valeur[i]);

      input = document.createElement("INPUT");
      input.id = 'inputIDcarac('+i+')';
      input.type = 'hidden';
      input.value = resultReq.results[0].ID_Caracteristique[i];
      listeParam.appendChild(input);

      saut = document.createElement("br");
      listeParam.appendChild(saut);
      nbInput++;
      i++;
    }

    console.log(initialValue);
  });
}

// Evénement
boutonRetour.addEventListener('click',()=>{ // Si on appuie sur le bouton de retour
  location.replace("https://vmicro.fr/database/BDD_1.0/Composant/affichageComposant.php?selectedComponent="+id_comp_GET);
})
boutonValide.addEventListener('click',()=>{ // Si on appuie sur le bouton de validation
  for(var a=0; a < nbInput; a++)
  {
    var valeurChamp = document.getElementById('input('+a+')').value;
    var idParam = document.getElementById('inputIDcarac('+a+')').value;
    //console.log(valeurChamp);
    if(valeurChamp != initialValue[a]){ // S'il y a eu modification de la valeur dans le champs alors on fait une requête
      //console.log("REQUETE");
      if(valeurChamp != "")
      {
        var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=updateTheoricalValue&nom_type_composant="+name_type_c_GET+"&id_caracteristique="+idParam+"&valeur="+valeurChamp;
        console.log(url);
        ajaxGet(url, function(reponse){
          resultReq = JSON.parse(reponse);
          console.log(resultReq);
          location.replace("https://vmicro.fr/database/BDD_1.0/Composant/affichageComposant.php?selectedComponent="+id_comp_GET);
        });
      }

    }
  }
});
start()
