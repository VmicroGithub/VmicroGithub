const boutonValide = document.querySelector('.valide');
const boutonAnnule = document.querySelector('.retour');
const selecteur = document.getElementById('nomC');
var nbInput = 0;
var data = new FormData();

boutonValide.addEventListener('click',()=>{ // Si on appuie sur le bouton de validation
  var url = "https://vmicro.fr/database/BDD_1.0/API/api.php";
  var valideFormulaire = true;

  // Pour la reqûete nous avons besoin de :
    // -le nom du type de composant
    // - la valeur
    // -l'id caractéristique
    //- le nom de la catégorie
    //- la taille du composant en X
    //- la taille du composant en Y

    var categorieComposant = document.getElementById('nomC').value;
    var nomTypeComposant = document.getElementById('name_type_component').value;

    /* 
    requete pas de doublon
  */
    var urldoublon = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=TypeComposantNameLIST";
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", urldoublon, false); // false for synchronous request
    xmlHttp.send( null );
    var responseDoublon = JSON.parse(xmlHttp.responseText);
    try{
      if(responseDoublon.results[0].Nom_type_composant.includes(nomTypeComposant)){
        alert(nomTypeComposant + " existe deja dans la liste des types de composant");
        return;
      }
    }

    catch(TypeError){
      console.log("c'est vide");
    }
    /* 
    Fin requete pas de doublon
    */

    var tailleX = document.getElementById('tailleX').value;
    var tailleY = document.getElementById('tailleY').value;
    var tabInput = new Array();
    var tabIndex = new Array();

    console.log(document.getElementById('inputIDcarac(1)'))

    if(categorieComposant== "---"){
      document.getElementById("error1").style.display="block";
      valideFormulaire = false;
    }
    else {
      document.getElementById("error1").style.display="none";
    }

    if(nomTypeComposant== ""){
      document.getElementById("error2").style.display="block";
      valideFormulaire = false;
    }
    else {
      document.getElementById("error2").style.display="none";
    }

    if(tailleY== ""){
      document.getElementById("error3").style.display="block";
      valideFormulaire = false;
    }
    else {
      document.getElementById("error3").style.display="none";
    }

    if(tailleX== ""){
      document.getElementById("error4").style.display="block";
      valideFormulaire = false;
    }
    else {
      document.getElementById("error4").style.display="none";
    }

    for(var a=0; a < nbInput; a++)
    {
      tabInput[a] =  document.getElementById('input('+a+')').value;
      tabIndex[a] = document.getElementById('inputIDcarac('+a+')').value;

      console.log("tabInput["+a+"] = "+tabInput[a]);
      console.log("tabIDcarac["+a+"] = "+tabIndex[a]);
    }

    if(valideFormulaire){
      data.append('action','addTypeComponent');
      data.append('n_t_c', nomTypeComposant);
      data.append('id_carac',tabIndex);
      data.append('n_cat', categorieComposant);
      data.append('taille_c_x',tailleX);
      data.append('taille_c_y',tailleY)
      data.append('tabValeur', tabInput);

      ajaxPost(url, data, function(reponse){
        console.log(reponse);
      });

      console.log('categorie du composant : ' + categorieComposant);
      console.log('nom type composant : ' + nomTypeComposant);
      console.log('taille du composant en X : ' + tailleX);
      console.log('taille du composant en Y : ' + tailleY);

      alert("Le type de composant vient d'être ajouté à la base de données");

      window.location.href = "https://vmicro.fr/database/BDD_1.0/Home/home.php";
    }
});
boutonAnnule.addEventListener('click',()=>{
    window.location.href = "../Home/home.php";
});

selecteur.addEventListener('change',()=>{

  console.log("changement");
  displayInput(selecteur.selectedIndex);

});

function displayInput(index)
{
  var i=0;
  var listeParam = document.getElementById('listeParam');
  console.log(index);
  console.log(selecteur.options);
  console.log(selecteur.options[0].text);
  var categorieSelected = selecteur.options[index].text;
  console.log(categorieSelected);

  listeParam.innerHTML='';

  if(categorieSelected != "---")
  {
    var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=askParamWithCategorie&nomC='+categorieSelected;

    ajaxGet(url, function(reponse){
      resultReq = JSON.parse(reponse);

      console.log(url);
      console.log(resultReq.results);
      console.log(resultReq.results['Nom_Parametre']);
      console.log(resultReq.results['Nom_Parametre'].length);
      console.log(resultReq.results.Nom_Parametre);

      while(i < resultReq.results['Nom_Parametre'].length)
      {
        label = document.createElement('label');
        label.textContent = "Veuillez indiquer la valeur du parametre : "+ resultReq.results.Nom_Parametre[i]+" ("+resultReq.results.Unite[i]+')';
        listeParam.appendChild(label);

        input = document.createElement("INPUT");
        input.id = 'input('+i+')';
        input.type = 'text';
        listeParam.appendChild(input);

        input = document.createElement("INPUT");
        input.id = 'inputIDcarac('+i+')';
        input.type = 'hidden';
        input.value = resultReq.results.ID_Caracteristique[i];
        listeParam.appendChild(input);

        saut = document.createElement("br");
        listeParam.appendChild(saut);
        nbInput++;
        i++;
      }
    });
  }
}

function displayAll()
{
  fillSelector(); // Permet de remplir le sélecteur
  console.log(selecteur);
  displayInput(0);
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
      if(tabActif[a] == 1) // On affiche que les non actifs
      {
        tabNomS.push(tabNom[a]);
        tabIndexS.push(tabIndex[a]);
      }
    }
  }
  console.table(tabIndexS);
  console.table(tabNomS);

  tabSortie.push(tabIndexS);
  tabSortie.push(tabNomS);

  return tabSortie;

}

function fillSelector()
{
  //console.log(selecteur);
  var option;

  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=CategorieLIST';
  ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);
    console.log(resultReq);
    var tableauDistinct = onlyOne(resultReq.results[0].Nom_categorie, resultReq.results[0].id_categorie,resultReq.results[0].activation);
    console.log(tableauDistinct);

    tableauDistinct[0].forEach(function(item,idx){
      option = document.createElement('option');
      option.text = tableauDistinct[1][idx];
      option.value= tableauDistinct[1][idx];
      selecteur.add(option);

    });
  });
}

displayAll();
