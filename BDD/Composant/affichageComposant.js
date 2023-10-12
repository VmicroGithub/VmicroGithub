var fisrtNameUser = document.getElementById("firstNameUser");
var lastNameUser = document.getElementById("lastNameUser");
var idUser = document.getElementById("idUser");
var boutonValideMesure = document.getElementById("boutonMesure");
var boutonValideExperience = document.getElementById("boutonExperience");
var boutonValideCommentaire = document.getElementById("boutonCommentaire");
var selecteurReticule = document.getElementById('selecteurReticule');
var chargement=false;
// Sélectionnez la première option en définissant selectedIndex à 0
const toggleButton = document.getElementById("toggleButton");
var btncomp=document.getElementById("btncomp");
var btnret=document.getElementById("btnret");
var selecteurParametre = document.getElementById("selecteurParametre");
var uniteeParamMesure = document.getElementById("uniteeParamMesure");
var selecteurAuteurExperience = document.getElementById("selecteurAuteurExperience");
var descriptionExperience = document.getElementById("descriptionExperience");
var valeurMesure = document.getElementById("valeurMesure");
var corpsEditionME = document.getElementById("corpsEditionME");
var corpsEditionAuteur = document.getElementById("corpsEditionAuteur");
var corpsEditionDate = document.getElementById("corpsEditionDate");



var selecteurAuteurCommentaire = document.getElementById("selecteurAuteurCommentaire");
var descriptionCommentaire = document.getElementById("descriptionCommentaire");
var selecteurPhoto = document.getElementById("selecteurPhoto");
var eraseExp = document.getElementById("EraseExp");
var eraseCommentaire = document.getElementById("EraseCommentaire");
var composantXY= document.getElementById("composantXY")

var conteneurMenu = document.getElementById("conteneurMenu");
var historique = document.getElementById("historique");

var container = document.querySelector('.container');
var contain = document.querySelector('.contain');
var selectedComponent = document.getElementById("selectedComponent");
var  maxX_C = document.getElementById(" maxX_C");
var  maxY_C = document.getElementById(" maxY_C");
var composant = document.getElementById("composant");
var composant= document.getElementById("idPremierComposant");
var parametreSelect;
var variableGlobaleStockageRequeteComposant = document.getElementById("variableGlobaleStockageRequeteComposant"); 
const checkbox = document.getElementById('checkboxId'); // Remplacez 'checkboxId' par l'ID de votre case à cocher
//---------------------------------------------//
/////// Fonction pour la page principale ////////
//---------------------------------------------//

/*function remplissageSelecteurParametre(conteneur, idComposant){

  conteneur.innerHTML = ""; // On vide le contenu du conteneur au préalable
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getCaracteristiqueWithIDcomponent&ID_Component='+idComposant;
  console.log(url);
  ajaxGet(url,function(reponseCaracteristique){
    caracteristique = JSON.parse(reponseCaracteristique);
    console.log(caracteristique.results[0]);
    console.log(caracteristique.results[0]["Nom_Parametre"]);
    caracteristique.results[0]["Nom_Parametre"].forEach((nomParametre, indexParametre) => {
        var option = document.createElement('option');
        //option.appendChild(document.createTextNode(nomParametre + '   ('+ caracteristique.results[0]["Unite"][indexParametre] +')'));
        option.appendChild(document.createTextNode(nomParametre));
        option.value = caracteristique.results[0]["ID_Caracteristique"][indexParametre];
        var input = document.createElement("input");
        input.type = "hidden";
        input.id = "unite"+caracteristique.results[0]["ID_Caracteristique"][indexParametre];
        input.value = caracteristique.results[0]["Unite"][indexParametre];
        conteneur.appendChild(input);
        conteneur.appendChild(option);
    });
    if(parametreSelect == undefined){
      parametreSelect = caracteristique.results[0]["ID_Caracteristique"][0];
      uniteeParamMesure.innerHTML = caracteristique.results[0]["Unite"][0]; // On affiche l'unité du parametre
    }
    else{
      conteneur.value = parametreSelect;
    }
  });
}
*/
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
            //newDivME.innerHTML = listCommentExp['results'][0]["parametre"][numME]+ " : "+ME+" "+listCommentExp['results'][0]["unite"][numME];
            newDivME.appendChild(newContentME);
          }
        }
        else {
          //var newContentME = document.createTextNode(ME);
          newDivME.innerHTML = ME;
        }



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
        newDivAuteur.style.border= "1px solid white";
        newDivAuteur.style.height = newDivME.offsetHeight;
        corpsEditionAuteur.appendChild(newDivAuteur);

        var newDivDate = document.createElement("div");
        var newContentDate = document.createTextNode(listCommentExp['results'][0]["Last_Modif"][numME]);
        newDivDate.appendChild(newContentDate);
        newDivDate.id = "ME"+numME;
        newDivDate.style.border="1px solid white";
        newDivDate.style.height = newDivME.offsetHeight;
        corpsEditionDate.appendChild(newDivDate);
      });
    }
  });
}

function pagePredefini(){
  if(selectedComponent.value!=""){
    idComposantMemory = selectedComponent.value;
    console.log("composantselec",idComposantMemory);
  }
  else{
    if(lastComponent.value!=""){
      idComposantMemory = lastComponent.value;
      console.log(idComposantMemory);
    }
  }
}

function lancementPagePrincipale(){

  historique.style.marginTop = '10px';
  console.log("idmem",idComposantMemory);
  remplissageEtatDuComposant(idComposantMemory);
  //remplissageSelecteurParametre(selecteurParametre, idComposantMemory);
  //remplissageSelecteurAuteurExperience(selecteurAuteurExperience);
  //remplissageSelecteurAuteurExperience(selecteurAuteurCommentaire); // Même si cela n'est pas utilisé pour expérience
  //remplissageHistoriqueMesExp(idComposantMemory);
  remplissageCommentaire(idComposantMemory);
  //remplissageCarou();
  if(chargement!=true){
    selectedret=selecteurReticule.selectedIndex = 0;
    handleReticuleSelected(selectedret);
    console.log("reticuleselectdchar",selectedret);
    chargement=true;
    toggleButton.click();
   

  }
  
}
function remplissageCommentaire(idComposantMemory) {
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component=' + idComposantMemory;
  
  ajaxGet(url, function(reponseComment) {
    listComment = JSON.parse(reponseComment);
   
    if (listComment['results'][0] != null){
      if (listComment['results'][0]["Contenu"][0]!=""){
        savedText = listComment['results'][0]["Contenu"][0]
         document.getElementById("descriptionCommentaire").value = savedText;
      }
      else {
        com=document.getElementById("descriptionCommentaire");
      com.value="";
      }
    }
    else{
      
      com=document.getElementById("descriptionCommentaire");
      com.value="";
      
    }
 });
}
/*
 Partie du code qui attend les événements 
*/

function modifCommentaire(e){
  console.log(e);
  console.log(e.path);

  if(e.path[0].id == "label"){
    var divModifCommentaire = document.createElement("div");
    divModifCommentaire.style.display = "flex";

    var inputCommentaire = document.createElement("input");
    console.log(e.path[0].innerHTML);
    inputCommentaire.value = e.path[0].innerHTML;
    inputCommentaire.style.color = "black";
    inputCommentaire.style.textAlign = "center";
    inputCommentaire.style.width= "100%";


    var boutonDelete = document.createElement("button");
    boutonDelete.innerHTML = "DELETE";
    boutonDelete.style.width = "75px";
    boutonDelete.style.height = "25px";
    boutonDelete.style.color = "black";
    boutonDelete.style.backgroundColor = "#e21e1ef0";

    var boutonUpdate = document.createElement("button");
    boutonUpdate.innerHTML = "UPDATE";
    boutonUpdate.style.width = "75px";
    boutonUpdate.style.height = "25px";
    boutonUpdate.style.color = "black";

    divModifCommentaire.appendChild(inputCommentaire);
    divModifCommentaire.appendChild(boutonUpdate);
    divModifCommentaire.appendChild(boutonDelete);

    e.path[1].replaceChild(divModifCommentaire, e.path[0]);

    boutonUpdate.addEventListener('click', (e)=>{
      console.log(e);
      console.log(inputCommentaire.value);
      //-> Requete udpdate du commentaire
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
      var data = new FormData();
      data.append('action','updateComment');
      data.append('new_content',inputCommentaire.value);

      console.log(e.path[2].childNodes[0].value);
      data.append('id_comment',e.path[2].childNodes[0].value);

      ajaxPost(url,data, function(reponse){
        console.log(reponse);
      });
      //-> Réaffichage des commentaires
      setTimeout(function () {
        remplissageCommentaire(idComposantMemory);
      }, 100);
    });

    boutonDelete.addEventListener("click", (e)=>{
      console.log(e);
      console.log(e.path[2].childNodes[0].value);

      var url = "https://vmicro.fr/database/BDD_1.0/API/api.php?action=deleteComment&ID_Comment="+e.path[2].childNodes[0].value;
      ajaxGet(url, function(reponseDeleteComment){
        //console.log(JSON.parse(reponseDeleteComment));
        //-> Réaffichage des commentaires
        setTimeout(function () {
          remplissageCommentaire(idComposantMemory);
        }, 100);
      });
    })
  }

}
/*eraseExp.addEventListener('click', ()=>{
  descriptionExperience.value="";
});
*/
descriptionCommentaire.addEventListener('blur', function() {
  
  

  
  // Exemple : Appel à une fonction nommée "handleCtrlS()"
  ctrlS();
  

});
function ctrlS(){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component=' + idComposantMemory;

  ajaxGet(url, function(reponseComment) {
    listComment = JSON.parse(reponseComment);
    console.log("responsetest",listComment);
    
    
    
   
    if (listComment['results'][0] != null){
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
      var data = new FormData();
      data.append('action','updateComment');
      data.append('new_content',descriptionCommentaire.value);
    

      data.append('id_comment',listComment['results'][0]['ID_Commentaire'][0]);
    
      ajaxPost(url,data, function(reponse){
        console.log(reponse);
      });
      

    }
   else {
      var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php';
      var data = new FormData();
      data.append('action', 'addCommentaire');
      data.append('id_composant', idComposantMemory);
      
      data.append('id_photo',-1);
      data.append('id_fichier',-1);
      data.append('contenu_Commentaire',descriptionCommentaire.value);
      
      data.append('id_auteur', selecteurAuteurCommentaire.value);
      ajaxPost(url, data, function(reponse){
        console.log(reponse);
      });
      
    }
  });
  var confirmationDiv = document.getElementById('confirmationDiv');
  confirmationDiv.style.display = 'block';

  // Masquer la div de confirmation après 2 secondes (2000 millisecondes)
  setTimeout(function() {
    confirmationDiv.style.display = 'none';
  }, 2000)
}


/*boutonValideMesure.addEventListener('click', ()=>{
  affichageLastMesure(listMesure);
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
  affichageLastMesure(listMesure);
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
*/
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
  data.append('id_auteur', "34");
  if(file_data_photo==undefined){
    data.append('id_photo',-1);
  }
  else{
    data.append('id_photo',0);
    data.append('file_photo',file_data_photo);
  }
  if(file_data_file==undefined){
    data.append('id_fichier',-1);
  }
  else{
    data.append('id_fichier',0);
    data.append('file_fichier', file_data_file);
  }

  data.append('id_composant', idComposantMemory);
  data.append('contenu_Commentaire',"");

  for (var value of data.values()) {
   console.log(value);
  }

  ajaxPost(url, data, function(reponse){
    console.log(reponse);
    remplissageCommentaire(idComposantMemory);
    console.log("remplissageCommentaire");
    selecteurPhoto.value="";
    selecteurFichier.value="";
    selecteurPhoto.disabled = false;
    selecteurFichier.disabled = false;
  });
  ListPhoto();
})
/*
selecteurParametre.addEventListener('change', ()=>{
  parametreSelect = selecteurParametre.value;
  //--> Afficher l'unité correspondant au parametre
  console.log(parametreSelect);
  console.log(document.getElementById("unite"+parametreSelect));
  uniteeParamMesure.innerHTML = document.getElementById("unite"+parametreSelect).value;
})
*/
function switch_tab(tab) {
  var ajoutCommentaire = document.getElementById("ajoutCommentaire");
  var content_2 = document.getElementById("content_2");
  var tab_1 = document.querySelectorAll('.tab')[0];
  var tab_2 = document.querySelectorAll('.tab')[1];
  var checkbox = document.getElementById("checkboxId"); // Récupérer l'élément de case à cocher
  var currentSlide = document.querySelector('.carousel__slides li:not([style*="display: none"])');
  var currentSlideid = currentSlide.getAttribute("data-idcomposants");
  var indicator1 = document.getElementById("indicator1");
  var indicator2 = document.getElementById("indicator2");
  if (tab == 1) {
    tab_1.className = 'tab selected';
    tab_2.className = 'tab';
    ajoutCommentaire.style.display = 'block';
    content_2.style.display = 'none';
    checkbox.style.display='none'
    btncomp.style.backgroundColor='green';
    btnret.style.backgroundColor='red';
    
    // Cocher la case lorsque tab est égal à 1
    checkbox.checked = true;
    if(currentSlideid){
    // Exécuter la fonction pour cacher les miniatures en passant l'ID de la diapositive actuelle
    cacherMiniaturesSauf(currentSlideid);
    }
  } else {
    tab_1.className = 'tab';
    tab_2.className = 'tab selected';
    content_2.style.display = 'block';
    ajoutCommentaire.style.display = 'none';
    checkbox.style.display='block'
    btncomp.style.backgroundColor='red';
    btnret.style.backgroundColor='green';
    // Décocher la case lorsque tab n'est pas égal à 1
    checkbox.checked = false;
    
    // Rétablir l'affichage complet des miniatures
    cacherMiniaturesSauf(currentSlideid);
  }
}


//switch_tab(1); // Appeler la fonction pour activer l'onglet 1 par défaut
function handleReticuleSelected(event){
  matchingInfos = [];
  NomTypeC= [];
  console.log("Reticule sélectionnée :", reticuleSelect);
  console.log("petitcitron", maxX_C);
  console.log("petitcitron", maxY_C);
  container.innerHTML = "";
  console.log("uwu", reticuleSelect);
  let reticule14 = reticuleSelect.id;

  let premierChiffreHexadecimal = parseInt(reticule14.charAt(8), 16);
  console.log("Le premier chiffre en hexadécimal est :", premierChiffreHexadecimal); // Résultat: 8
  let deuxiemeChiffreHexadecimal = parseInt(reticule14.charAt(9), 16);
  console.log("Le deuxième chiffre en hexadécimal est :", deuxiemeChiffreHexadecimal); // Résultat: 11

  console.log("tabtest :", variableGlobaleStockageRequeteComposant);
  console.log("tabtest2 :", variableGlobaleStockageRequeteComposant.Coord_Y_C[1]);
  console.log("tabtest1 :", variableGlobaleStockageRequeteComposant.Coord_X_C[1]);
  console.log("tabtest3 :", variableGlobaleStockageRequeteComposant.ID_Composant[1]);

  for (let i = 0; i < variableGlobaleStockageRequeteComposant.Pos_X_Ret.length; i++) {
    console.log("X=", variableGlobaleStockageRequeteComposant.Pos_X_Ret[i]);
    if (variableGlobaleStockageRequeteComposant.Pos_X_Ret[i] === premierChiffreHexadecimal) {
      console.log("Y=", variableGlobaleStockageRequeteComposant.Pos_Y_Ret[i]);
      if (variableGlobaleStockageRequeteComposant.Pos_Y_Ret[i] === deuxiemeChiffreHexadecimal) {
        matchingInfos.push(variableGlobaleStockageRequeteComposant.ID_Composant[i]);
        NomTypeC.push(variableGlobaleStockageRequeteComposant.Nom_Type_C[i]);
        console.log("nomtypecglobale",NomTypeC);
      } // Les valeurs correspondent, ajoutez les informations correspondantes à votre résultat

    }
  }
 
  // Utilisez matchingInfos comme vous le souhaitez
  console.log("blanchette", matchingInfos);
  processMatchingInfos();
};
document.addEventListener('reticuleSelected', handleReticuleSelected);
selecteurReticule.addEventListener('change',handleReticuleSelected );

function processMatchingInfos() {
  var nbimage = 0;
  let promises = [];

  matchingInfos.sort((a,b) => a - b);
  createCarousel(matchingInfos.length);
  getImagesForComponents(matchingInfos);
  //calculerMoyennesPourListeComposants(matchingInfos,NomTypeC);
  ListPhoto(matchingInfos)
    .then(() => {
      console.log("ListPhoto terminée, vous pouvez maintenant exécuter votre action ici.");
      var simuclick ="composant"+"1"+"1";
      simuclickcomp(simuclick);
      console.log("listphoto?");
      tab=1;
      switch_tab(tab);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite dans ListPhoto :", error);
      // Gérez les erreurs ici si nécessaire
    });
    
  carouselCreated = false;
}


checkbox.addEventListener('change', function() {
  const selectedThumbnail = document.querySelector('.carousel__thumbnails li.active');
  const idcompslide = selectedThumbnail.getAttribute('data-idcomposants');
   cacherMiniaturesSauf(idcompslide);
});


function cacherMiniaturesSauf(idcompslide) {
  const isChecked = checkbox.checked;
  console.log('je suis coche',checkbox.checked);
  var thumbnails = document.querySelectorAll('.carousel__thumbnails li');
  for (var i = 0; i < thumbnails.length; i++) {
    thumbnails[i].style.display = 'block';
  }
  

  if (isChecked) {
    for (let i = 0; i < thumbnails.length; i++) {
      const thumbnail = thumbnails[i];
      const dataIdComposant = thumbnail.getAttribute('data-idcomposants');
      if (dataIdComposant !== idcompslide) {
        thumbnail.style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < thumbnails.length; i++) {
      const thumbnail = thumbnails[i];
      thumbnail.style.display = 'block';
    }
  }
}








function getImagesForComponents(ID_components) {
  console.log('get image', ID_components);

  // Effectuer une requête GET vers le serveur PHP avec la liste des ID de composants
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDcompList&ID_components=' + ID_components.join(',');

  ajaxGet(url, function(response) {
    listLink = JSON.parse(response);
   
    if (listLink.length === 0) {
      // Gérez le cas où aucune image n'a été trouvée
      console.log('Aucune image trouvée pour les ID de composant fournis.');
    } else {
      // Traitez les données des images ici (par exemple, affichez-les dans la console)
      console.log('Images récupérées avec succès :', listLink);
      console.log('chemin0',listLink[0].Chemin); 
    }
    
  });
}


function ListPhoto(matchingInfos) {
  return new Promise((resolve, reject) => {
    try {
      var ID_components = matchingInfos;
      var slidesContainer = document.querySelector('.carousel__slides');
      var thumbnailsContainer = document.querySelector('.carousel__thumbnails');
   
      var url =
        'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithIDcompList&ID_components=' +
        ID_components.join(',');

      // Fonction pour charger une image
      function loadImage(src, slideItem, thumbnailItem, i, idComposant, coordx, coordy) {
        return new Promise((resolve) => {
          var slideImg = document.createElement('img');
          slideImg.alt = '';

          var thumbnailImg = document.createElement('img');
          thumbnailImg.alt = '';

          slideImg.style.maxWidth = '100%';
          slideImg.style.maxHeight = '100%';

          thumbnailImg.style.width = '100%';
          thumbnailImg.style.height = '100%';

          if (src.endsWith('.null')) {
            src = 'https://vmicro.fr/database/BDD_1.0/Composant/PasDePhoto.png';
          }

          if (src.endsWith('.tif')) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('GET', src);
            xhr.onload = function (e) {
              try {
                var tiff = new Tiff({ buffer: xhr.response });
                if (tiff === null) {
                  // La fonction TIFFOpen a renvoyé NULL, chargez l'image de remplacement
                  src = 'https://vmicro.fr/database/BDD_1.0/Composant/ErreurTiff.png';
                } else {
                  var canvas_tiff = tiff.toCanvas();
                  slideImg.src = canvas_tiff.toDataURL();
                  thumbnailImg.src = canvas_tiff.toDataURL();
                }
              } catch (tiffError) {
                console.error('Erreur lors du chargement de l\'image TIFF :', tiffError);
                // En cas d'erreur TIFF, chargez l'image de remplacement
                src = 'https://vmicro.fr/database/BDD_1.0/Composant/ErreurTiff.png';
                slideImg.src = src;
                thumbnailImg.src = src;
              }

              var labelSlide = document.createElement('label');
              labelSlide.setAttribute('for', 'slide-' + i);
              labelSlide.appendChild(slideImg);
              slideItem.innerHTML = ''; // Supprimez le contenu existant
              slideItem.appendChild(labelSlide);

              var labelThumbnail = document.createElement('label');
              labelThumbnail.setAttribute('for', 'thumbnail-' + i);
              labelThumbnail.appendChild(thumbnailImg);
              thumbnailItem.innerHTML = ''; // Supprimez le contenu existant
              thumbnailItem.appendChild(labelThumbnail);

              addThumbnailClickListener(thumbnailItem, i, idComposant, coordx, coordy);
              resolve();
            };
            xhr.send();
          } else {
            slideImg.src = src;
            thumbnailImg.src = src;

            var labelSlide = document.createElement('label');
            labelSlide.setAttribute('for', 'slide-' + i);
            labelSlide.appendChild(slideImg);
            slideItem.innerHTML = ''; // Supprimez le contenu existant
            slideItem.appendChild(labelSlide);

            var labelThumbnail = document.createElement('label');
            labelThumbnail.setAttribute('for', 'thumbnail-' + i);
            labelThumbnail.appendChild(thumbnailImg);
            thumbnailItem.innerHTML = ''; // Supprimez le contenu existant
            thumbnailItem.appendChild(labelThumbnail);

            addThumbnailClickListener(thumbnailItem, i, idComposant, coordx, coordy);
            resolve();
          }
        });
      }

      ajaxGet(url, function (response) {
        var listLink = JSON.parse(response);
        if (listLink.length != 0) {
          console.log('Nombre d\'images à charger :', listLink.length);

          var imagePromises = [];

          for (let i = 0; i < listLink.length; i++) {
            if (listLink[i] != null) {
              var src_image =
                '../' + listLink[i].Chemin + '.' + listLink[i].Extension;
              var slideItem = document.createElement('li');
              slideItem.setAttribute('data-index', i);
              slideItem.setAttribute('data-idcomposants', listLink[i].ID_Composant);
              var idComposant = listLink[i].ID_Composant;
              var indexcomp = variableGlobaleStockageRequeteComposant.ID_Composant.indexOf(idComposant);
              var coordx = variableGlobaleStockageRequeteComposant.Coord_X_C[indexcomp];
              var coordy = variableGlobaleStockageRequeteComposant.Coord_Y_C[indexcomp];
              slideItem.setAttribute('data-x', coordx);
              slideItem.setAttribute('data-y', coordy);

              var thumbnailItem = document.createElement('li');
              thumbnailItem.setAttribute('data-index', i);
              thumbnailItem.setAttribute('data-idcomposants', idComposant);
              thumbnailItem.setAttribute('data-x', coordx);
              thumbnailItem.setAttribute('data-y', coordy);

              // Chargez l'image et ajoutez-la à la promesse
              var imagePromise = loadImage(src_image, slideItem, thumbnailItem, i, idComposant, coordx, coordy);
              imagePromises.push(imagePromise);

              slidesContainer.appendChild(slideItem);
              thumbnailsContainer.appendChild(thumbnailItem);
            }
          }

          // Attendre que toutes les images soient chargées avant de continuer
          Promise.all(imagePromises)
            .then(() => {
              console.log('Toutes les images sont chargées.');
              resolve(); // Résoudre la promesse une fois que tout est terminé
            })
            .catch((error) => {
              console.error('Erreur lors du chargement des images :', error);
              reject(error); // Rejeter la promesse en cas d'erreur
            });
        }
      });
    } catch (error) {
      console.error("Une erreur s'est produite lors du traitement de ListPhoto :", error);
      reject(error); // Rejeter la promesse en cas d'erreur
    }
  });
}



  


  function loadImage(src_image, i, slideItem, thumbnailItem, labelSlide, thumbnailImg) {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', src_image);
      xhr.onload = function (e) {
        try {
          var tiff = new Tiff({ buffer: xhr.response });
          var canvas_tiff = tiff.toCanvas();

          var slideImg = document.createElement('img');
          slideImg.alt = '';
          var label = document.createElement('label');
          label.setAttribute('for', 'slide-');
          var labelTif = document.createElement('label'); // Créez un label distinct
          labelTif.setAttribute('for', 'slide-');
        
          slideImg.src = canvas_tiff.toDataURL();
          slideImg.style.maxWidth = '100%';
          slideImg.style.maxHeight = '100%';
          labelTif.appendChild(slideImg); // Utilisez labelTif ici
          slideItem.appendChild(labelTif); // Utilisez labelTif ici

          thumbnailImg.src = slideImg.src;
          thumbnailImg.style.width = '100%';
          thumbnailImg.style.height = '100%';
          label.appendChild(thumbnailImg);
          thumbnailItem.appendChild(label);

          console.log('Image chargée avec succès pour i=', i);
          addThumbnailClickListener(thumbnailItem, i, idComposant, coordx, coordy);

          if (slidesContainer) {
            slidesContainer.appendChild(slideItem);
          }
          if (thumbnailsContainer) {
            thumbnailsContainer.appendChild(thumbnailItem);
          }

          resolve();
        } catch (error) {
          console.error("Erreur lors du chargement de l'image TIFF :", error);
          resolve();
        }
      };
      xhr.send();
    });
  }

  function addThumbnailClickListener(thumbnailItem, ) {
    thumbnailItem.addEventListener('click', function () {
      var slideIndex = this.getAttribute('data-index');
      var xPos = this.getAttribute('data-x');
      var yPos = this.getAttribute('data-y');
      var simuclick = 'composant' + xPos + yPos;
      const isChecked = checkbox.checked;
      if(isChecked){
        goToSlide(slideIndex, simuclick);
      }
      else{
     simuclickcomp(simuclick);
      
      goToSlide(slideIndex, simuclick);
      }
    });
  }



// Définissez la fonction handleSelectButton pour effectuer l'action souhaitée
function handleSelectButton(composantSelect) {
  dtcomp=composantSelect.id;
  console.log('bob',dtcomp);
  var dtX = dtcomp.slice(9, 10);

  var dtY;
if (dtcomp.length > 11) {
  dtY = dtcomp.slice(-2); // Si dtcomp a plus de 11 caractères, dtY est constitué des 2 derniers caractères.
} else {
  dtY = dtcomp.slice(-1); // Sinon, dtY est le dernier caractère.
}


 // Parcourir chaque élément "thumbnail"
 var thumbnailList = document.querySelector(".carousel__thumbnails");
  var thumbnails = thumbnailList.getElementsByTagName("li");
 for (var i = 0; i < thumbnails.length; i++) {
   var thumbnail = thumbnails[i];
   var dataX = thumbnail.getAttribute("data-x");
   var dataY = thumbnail.getAttribute("data-y");
console.log("dtyzoo",dataY,dtY);
console.log("dtxzoo",dataX,dtX);
console.log("Longueur de dtY:", dtY.length);
console.log("Longueur de dataY:", dataY.length);

   // Comparer les valeurs de dtX et dtY avec dataX et dataY
   if (dtX === dataX && dtY.toUpperCase() === dataY.toUpperCase()) {
    // Les valeurs sont identiques, afficher la valeur du thumbnail
    // ...
  
     // Les valeurs sont identiques, afficher la valeur du thumbnail
     var slideIndex = thumbnail.getAttribute("data-index");
     var simuclick =thumbnail.getAttribute("data-idcomposant");
     console.log("Thumbnail value:", slideIndex);
     break; // Sortir de la boucle après avoir trouvé la correspondance
   }
   
 }
 goToSlide(slideIndex,simuclick);
}
function handleSelectcomp(composantSelect) {
  dtcomp=composantSelect.id;
  console.log('bob',dtcomp);
  var dtX = dtcomp.slice(9, 10);
  var dtY;
if (dtcomp.length > 11) {
  dtY = dtcomp.slice(-2); // Si dtcomp a plus de 11 caractères, dtY est constitué des 2 derniers caractères.
} else {
  dtY = dtcomp.slice(-1); // Sinon, dtY est le dernier caractère.
}
 // Parcourir chaque élément "thumbnail"
 var thumbnailList = document.querySelector(".carousel__thumbnails");
  var thumbnails = thumbnailList.getElementsByTagName("li");
 for (var i = 0; i < thumbnails.length; i++) {
   var thumbnail = thumbnails[i];
   var dataX = thumbnail.getAttribute("data-x");
   var dataY = thumbnail.getAttribute("data-y");

   // Comparer les valeurs de dtX et dtY avec dataX et dataY
   if (dtX === dataX && dtY === dataY) {
     // Les valeurs sont identiques, afficher la valeur du thumbnail
     var slideIndex = thumbnail.getAttribute("data-index");
     var simuclick =thumbnail.getAttribute("data-idcomposant");
     console.log("Thumbnail value:", slideIndex);
     break; // Sortir de la boucle après avoir trouvé la correspondance
   }
   
 }
 goToSlide(slideIndex,simuclick);
}

function trierImagesCarousel() {
  // Récupérer tous les éléments <li> du carrousel
  var slidesContainer = document.querySelector("#carousel .container .carousel__slides");
  var liElements = slidesContainer.querySelectorAll("li");

  // Convertir la liste d'éléments <li> en tableau pour pouvoir utiliser la fonction sort()
  var liArray = Array.from(liElements);

  // Trier les éléments <li> en fonction de leur index
  liArray.sort(function(a, b) {
    var indexA = parseFloat(a.getAttribute("data-index"));
    var indexB = parseFloat(b.getAttribute("data-index"));
    return indexA - indexB;
  });

  // Supprimer tous les éléments <li> du carrousel
  slidesContainer.innerHTML = '';

  // Ajouter les éléments <li> triés dans le carrousel dans l'ordre correct
  liArray.forEach(function(li) {
    slidesContainer.appendChild(li);
  });
  var thumbnailsContainer = document.querySelector("#carousel .container .carousel__thumbnails");
  var thumbnailElements = thumbnailsContainer.querySelectorAll("li");

  // Convertir la liste d'éléments <li> en tableau pour pouvoir utiliser la fonction sort()
  var thumbnailArray = Array.from(thumbnailElements);

  // Trier les éléments <li> des miniatures en fonction de leur index
  thumbnailArray.sort(function(a, b) {
    var indexA = parseFloat(a.getAttribute("data-index"));
    var indexB = parseFloat(b.getAttribute("data-index"));
    return indexA - indexB;
  });

  // Supprimer tous les éléments <li> des miniatures du carrousel
  thumbnailsContainer.innerHTML = '';

  // Ajouter les éléments <li> des miniatures triés dans le carrousel dans l'ordre correct
  thumbnailArray.forEach(function(li) {
    thumbnailsContainer.appendChild(li);
  });
}









function goToSlide(slideIndex,simuclick) {
  //simuclickcomp(simuclick);
  
  var slides = document.querySelectorAll('.carousel__slides li');
  var thumbnails = document.querySelectorAll('.carousel__thumbnails li');
  // Masquer toutes les diapositives et miniatures
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    thumbnails[i].classList.remove('active');
  }

  // Afficher la diapositive correspondante et activer la miniature associée
  var selectedSlide = document.querySelector('li[data-index="' + slideIndex + '"]');
  if (selectedSlide) {
    selectedSlide.style.display = 'block';
    var selectedThumbnail = document.querySelector('.carousel__thumbnails li[data-index="' + slideIndex + '"]');
    console.log("slides",selectedSlide);
    if (selectedThumbnail) {
      selectedThumbnail.classList.add('active');
      
      
    }
  }
  const isChecked = checkbox.checked;
  if(isChecked){
    idcompslide=selectedSlide.getAttribute('data-idcomposants');
    cacherMiniaturesSauf(idcompslide);
  }
}


var carouselCreated = false;

function createCarousel() {

  if (carouselCreated) {
    return; // If the carousel has already been created, exit the function
  }

  carouselCreated = true; // Update the variable to indicate that the carousel has been created

  var container = document.querySelector('.container');

  if (!container) {
    console.error('Container element not found.');
    return;
  }

  // Create HTML elements for slides
  var slidesContainer = document.createElement('ul');
  slidesContainer.className = 'carousel__slides';



  container.appendChild(slidesContainer);

  // Create HTML elements for thumbnails
  var thumbnailsContainer = document.createElement('ul');
  thumbnailsContainer.className = 'carousel__thumbnails';

  container.appendChild(thumbnailsContainer);
  carouselCreated = false;

  var prevButton = document.getElementById('prev');
  var nextButton = document.getElementById('next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
  }
  slidesContainer.addEventListener('click', function (e) {
    // Vous pouvez déterminer si l'utilisateur a cliqué sur la gauche ou la droite
    // en fonction des coordonnées du clic par rapport à la largeur du conteneur.
    // Par exemple, si le clic est à gauche de la moitié de la largeur, naviguez vers la diapositive précédente,
    // sinon, naviguez vers la diapositive suivante.
    var clickX = e.clientX - slidesContainer.getBoundingClientRect().left;
    var containerWidth = slidesContainer.offsetWidth;

    if (clickX < containerWidth / 2) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
  });

 
}










function goToPrevSlide() {
  var currentSlide = document.querySelector('.carousel__slides li:not([style*="display: none"])');
  var prevSlide = currentSlide.previousElementSibling;
  var idcompact=currentSlide.getAttribute("data-idcomposants");
  const isChecked = checkbox.checked;
  if(isChecked){
    if (!prevSlide || prevSlide.getAttribute("data-idcomposants") !== idcompact) {
      var thumbnails = document.querySelectorAll('.carousel__thumbnails li');
      var lastVisibleThumbnail = null;

      thumbnails.forEach(function (thumbnail) {
        if (window.getComputedStyle(thumbnail).getPropertyValue('display') === 'block') {
          lastVisibleThumbnail = thumbnail;
        }
      });

      if (lastVisibleThumbnail) {
        var idComposant = lastVisibleThumbnail.getAttribute('data-idcomposants');
        var dataIndex = lastVisibleThumbnail.getAttribute('data-index');
        console.log('Dernière miniature en display: block avec data-idcomposants:', idComposant, 'et data-index:', dataIndex);
      }
    
      var lastSlideWithSameId = document.querySelector('.carousel__thumbnails li[data-idcomposants="' + idComposant + '"][data-index="' + dataIndex + '"]');
      console.log("slideflast",lastSlideWithSameId);
      if (lastSlideWithSameId) {
        var SlideIndex = lastSlideWithSameId.getAttribute('data-index');
        var XPos = lastSlideWithSameId.getAttribute('data-x');
        var YPos = lastSlideWithSameId.getAttribute('data-y');
        var SimuClick = "composant" + XPos + YPos;
        goToSlide(SlideIndex, SimuClick);
      }
    }

  if (currentSlide && prevSlide) {
    var slideIndex = prevSlide.getAttribute('data-index');
    var xPos = prevSlide.getAttribute('data-x');
    var yPos = prevSlide.getAttribute('data-y');
    var simuclick ="composant"+xPos+yPos;
    var idcompanprv=prevSlide.getAttribute("data-idcomposants");
   
    if (idcompact==idcompanprv){
      
    goToSlide(slideIndex, simuclick);
    }
    
    
  }
}
else{
  if (!prevSlide) {
  prevSlide = document.querySelector('.carousel__slides li:last-child');
}

if (currentSlide && prevSlide) {
  var slideIndex = prevSlide.getAttribute('data-index');
  var xPos = prevSlide.getAttribute('data-x');
  var yPos = prevSlide.getAttribute('data-y');
  var simuclick ="composant"+xPos+yPos;
  var idcompanprv=prevSlide.getAttribute("data-idcomposants");
  if (idcompact!=idcompanprv){
    simuclickcomp(simuclick);
  goToSlide(slideIndex, simuclick);
  }
  else{
    goToSlide(slideIndex, simuclick);
  }
  

}
}
}

function goToNextSlide() {
  var currentSlide = document.querySelector('.carousel__slides li:not([style*="display: none"])');
  var nextSlide = currentSlide.nextElementSibling;
  var idcompact=currentSlide.getAttribute("data-idcomposants");
console.log("slidesuivante",nextSlide);
const isChecked = checkbox.checked;
if(isChecked){
  
  if (!nextSlide || nextSlide.getAttribute("data-idcomposants") !== idcompact) {
    var thumbnails = document.querySelectorAll('.carousel__thumbnails li');
    var firstVisibleThumbnail = null;

    thumbnails.forEach(function (thumbnail) {
      if (window.getComputedStyle(thumbnail).getPropertyValue('display') === 'block' && !firstVisibleThumbnail) {
        // Si c'est la première miniature visible, assignez-la à firstVisibleThumbnail.
        firstVisibleThumbnail = thumbnail;
      }
    });
    

    if (firstVisibleThumbnail) {
      var idComposant = firstVisibleThumbnail.getAttribute('data-idcomposants');
      var dataIndex = firstVisibleThumbnail.getAttribute('data-index');
      console.log('Dernière miniature en display: block avec data-idcomposants:', idComposant, 'et data-index:', dataIndex);
      var firstSlideWithSameId = document.querySelector('.carousel__thumbnails li[data-idcomposants="' + idComposant + '"][data-index="' + dataIndex + '"]');
      console.log("slideflast", firstSlideWithSameId);
    }
      

      if (firstSlideWithSameId) {
        var SlideIndex = firstSlideWithSameId.getAttribute('data-index');
        var XPos = firstSlideWithSameId.getAttribute('data-x');
        var YPos = firstSlideWithSameId.getAttribute('data-y');
        var SimuClick = "composant" + XPos + YPos;
        goToSlide(SlideIndex, SimuClick);
      }
    }
  

  if (currentSlide && nextSlide) {
    var slideIndex = nextSlide.getAttribute('data-index');
    var xPos = nextSlide.getAttribute('data-x');
    var yPos = nextSlide.getAttribute('data-y');
    var simuclick = "composant" + xPos + yPos;
    var idcompanxt=nextSlide.getAttribute("data-idcomposants");
    var idcompact=currentSlide.getAttribute("data-idcomposants");
  
    if (idcompact==idcompanxt){
      console.log("slidefiff");
    goToSlide(slideIndex, simuclick);
    }
  }
}
  

else{
  if (!nextSlide) {
    nextSlide = document.querySelector('.carousel__slides li:first-child');
  }

  if (currentSlide && nextSlide) {
    var slideIndex = nextSlide.getAttribute('data-index');
    var xPos = nextSlide.getAttribute('data-x');
    var yPos = nextSlide.getAttribute('data-y');
    var simuclick = "composant" + xPos + yPos;
    var idcompanxt=nextSlide.getAttribute("data-idcomposants");
    var idcompact=currentSlide.getAttribute("data-idcomposants");
    if (idcompact!=idcompanxt){
      simuclickcomp(simuclick);
    goToSlide(slideIndex, simuclick);
    }
    else{
      goToSlide(slideIndex, simuclick);
    }
    }
  }
}


carourouCreated=false;
function remplissageCarou() {
  contain.innerHTML = "";
  createCarou();
  //Photo(idComposantMemory)
  carourouCreated=false;
  setTimeout(function () {
    slideIndex = 1;
    goToS(slideIndex);
  }, 3000);
}
function createCarou() {

  if (carourouCreated) {
    return; // If the carourou has already been created, exit the function
  }

  carourouCreated = true; // Update the variable to indicate that the carourou has been created

  var contain = document.querySelector('.contain');

  if (!contain) {
    console.error('contain element not found.');
    return;
  }

  // Create HTML elements for slides
  var slidescontain = document.createElement('ul');
  slidescontain.className = 'carourou__slides1';



  contain.appendChild(slidescontain);

  // Create HTML elements for thumbnails
  var thumbnailscontain = document.createElement('ul');
  thumbnailscontain.className = 'carourou__thumbnails1';

  contain.appendChild(thumbnailscontain);
  carourouCreated = false;

  var prev1Button = document.getElementById('prev1');
  var next1Button = document.getElementById('next1');

  if (prev1Button && next1Button) {
    prev1Button.addEventListener('click', goToprev1);
    next1Button.addEventListener('click', goTonext1);
  }
  

 
}

function goToprev1() {
  var current1Slide = document.querySelector('.carourou__slides1 li:not([style*="display: none"])');
  var prev1Slide = current1Slide.previousElementSibling;

  if (!prev1Slide) {
    prev1Slide = document.querySelector('.carourou__slides1 li:last-child');
  }

  if (current1Slide && prev1Slide) {
    var slideIndex = prev1Slide.getAttribute('data-index');

    goToS(slideIndex);
  }
}

function goTonext1() {
  var current1Slide = document.querySelector('.carourou__slides1 li:not([style*="display: none"])');
  var next1Slide = current1Slide.nextElementSibling;

  if (!next1Slide) {
    next1Slide = document.querySelector('.carourou__slides1 li:first-child');
  }

  if (current1Slide && next1Slide) {
    var slideIndex = next1Slide.getAttribute('data-index');
    goToS(slideIndex);
  }
}
function goToS(slideIndex) {
  var slides = document.querySelectorAll('.carourou__slides1 li');
  var thumbnails = document.querySelectorAll('.carourou__thumbnails1 li');
  // Masquer toutes les diapositives et miniatures
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
    thumbnails[i].classList.remove('active');
  }

  // Afficher la diapositive correspondante et activer la miniature associée
  var selectedSlide = document.querySelector('li[data-index="' + slideIndex + '"]');
  if (selectedSlide) {
    selectedSlide.style.display = 'block';
    var selectedThumbnail = document.querySelector('.carourou__thumbnails1 li[data-index="' + slideIndex + '"]');
    console.log("slides",selectedSlide);
    if (selectedThumbnail) {
      selectedThumbnail.classList.add('active');
      
      
    }
  }
}

function Photo(idComposant) {  
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component=' + idComposant;
  ajaxGet(url, function(reponseComment) {
    listComment = JSON.parse(reponseComment);

    if (listComment['results'][0] != null) {
     
      var slidescontain = document.querySelector('.carourou__slides1');
      var thumbnailscontain = document.querySelector('.carourou__thumbnails1');
      var count = 1; // Variable pour la différenciation de nomenclature

      listComment['results'][0]["Contenu"].forEach((commentaire, idCommentaire) => {
        if (listComment['results'][0]["ID_Image"][idCommentaire] != -1) {
          var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithID&ID_picture=' + listComment['results'][0]["ID_Image"][idCommentaire];

            ajaxGet(url, function(reponseLink) {
              listLink = JSON.parse(reponseLink);
              if (listLink['results'][0] != null) {
                var src_image = '../' + listLink['results'][0]['Chemin'] + "." + listLink['results'][0]['Extension'];
                console.log("testurl",src_image);
                var slideItem = document.createElement('li');
                slideItem.setAttribute('data-index', count); // Différenciation de nomenclature pour la slide
                slideItem.setAttribute('data-idcomposants', idComposant);
          
                var labelSlide = document.createElement('label');
                labelSlide.setAttribute('for', 'slide-' + (idCommentaire));
                var slideImg = document.createElement('img');
                slideImg.alt = '';
                var thumbnailItem = document.createElement('li');
                thumbnailItem.setAttribute('data-index', count); // Différenciation de nomenclature pour la miniature
                thumbnailItem.setAttribute('data-idcomposants', idComposant);
               
                var label = document.createElement('label');
                label.setAttribute('for', 'slide-' + (idCommentaire + 1));
                var thumbnailImg = document.createElement('img');
                thumbnailImg.alt = '';
                if (listLink['results'][0]['Extension'] == "tif") {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = 'arraybuffer';
                  xhr.open('GET', src_image);
                  xhr.onload = function(e) {
                    var tiff = new Tiff({ buffer: xhr.response });
                    var canvas_tiff = tiff.toCanvas();
                    slideImg.src = canvas_tiff.toDataURL();
                    slideImg.style.maxWidth = "100%";
                    slideImg.style.maxHeight = "100%";
                    console.log("testurl3",slideImg.src);
                    labelSlide.appendChild(slideImg);
                    slideItem.appendChild(labelSlide);
                    slideImg.addEventListener('click', function(event) {
                      var rect = this.getBoundingClientRect(); // Obtenez les coordonnées de l'image
                      var mouseX = event.clientX - rect.left; // Position horizontale du clic par rapport à l'image
                      var imageWidth =slideImg.width;
                      if (mouseX < imageWidth * 0.3) {
                        // Clic à gauche de l'image (30% de la largeur à gauche)
                        console.log('Clic à gauche de l\'image');
                        boutonprev.dispatchEvent(clicEvent);
                      } else if (mouseX > imageWidth * 0.7) {
                        // Clic à droite de l'image (30% de la largeur à droite)
                        console.log('Clic à droite de l\'image');
                        boutonnext.dispatchEvent(clicEvent);
                      } else {
                        // Clic au milieu de l'image
                        console.log('Clic au milieu de l\'image');
                        
                      }
                    });
                  
                    thumbnailImg.src = canvas_tiff.toDataURL();
                    thumbnailImg.style.width = "100%";
                    thumbnailImg.style.height = "100%";
                    label.appendChild(thumbnailImg);
                    thumbnailItem.appendChild(label);
               
                    thumbnailItem.addEventListener('click', function() {
                      var slideIndex = this.getAttribute('data-index'); // Récupérer l'index de la slide correspondante
                      var idComposant = thumbnailItem.getAttribute('data-idcomposants');
                    

                      console.log('idcomposant1', idComposant);
              
                      console.log('indexeu', slideIndex);


                 
                      var divId = this.closest('div').id; // Récupérer l'ID de la div parente de l'élément cliqué
                      console.log('je suis ton id:', divId)
                      goToS(slideIndex);
                    });
                    if (slidescontain) {
                      slidescontain.appendChild(slideItem);
                    }
                    if (thumbnailscontain) {
                      thumbnailscontain.appendChild(thumbnailItem);
                    }
                  };
                  xhr.send();
                } else {
                  slideImg.src = src_image;
                  slideImg.style.maxWidth = "100%";
                  slideImg.style.maxHeight = "100%";
                  labelSlide.appendChild(slideImg);
                  console.log("testurl2",slideImg.src);
                  slideItem.appendChild(labelSlide);
                 
                  // Code pour gérer le clic de la souris
                  slideImg.addEventListener('click', function(event) {
                    var rect = this.getBoundingClientRect(); // Obtenez les coordonnées de l'image
                    var mouseX = event.clientX - rect.left; // Position horizontale du clic par rapport à l'image
                    var imageWidth =slideImg.width;
                    if (mouseX < imageWidth * 0.3) {
                      // Clic à gauche de l'image (30% de la largeur à gauche)
                      console.log('Clic à gauche de l\'image');
                      boutonprev.dispatchEvent(clicEvent);
                    } else if (mouseX > imageWidth * 0.7) {
                      // Clic à droite de l'image (30% de la largeur à droite)
                      console.log('Clic à droite de l\'image');
                      boutonnext.dispatchEvent(clicEvent);
                    } else {
                      // Clic au milieu de l'image
                      console.log('Clic au milieu de l\'image');
                    }
                  });

                  thumbnailImg.src = src_image;
                  thumbnailImg.style.width = "100%";
                  thumbnailImg.style.height = "100%";
                  label.appendChild(thumbnailImg);
                  thumbnailItem.appendChild(label);
             
                  thumbnailItem.addEventListener('click', function() {
                    var slideIndex = this.getAttribute('data-index'); // Récupérer l'index de la slide correspondante
                    var idComposant = thumbnailItem.getAttribute('data-idcomposants');
                    console.log('idcomposant', idComposant);

     
   
                    
                    var divId = this.closest('div').id; // Récupérer l'ID de la div parente de l'élément cliqué
                    console.log('je suis ton id:', divId)
                    goToS(slideIndex);
                  });
                  if (slidescontain) {
                    slidescontain.appendChild(slideItem);
                  }
                  if (thumbnailscontain) {
                    thumbnailscontain.appendChild(thumbnailItem);
                  }
                }
                // Incrémenter l'index à chaque itération
                count++;
              }
            });
          

        
        }
      });
      
      } else {
      
    }
  });

}




selecteurPhoto.addEventListener('change', ()=>{
  if(selecteurPhoto.value == ""){
    selecteurFichier.disabled = false;
  }
  else{
    selecteurFichier.disabled = true;
  }
});

selecteurFichier.addEventListener('change', ()=>{
  if(selecteurFichier.value == ""){
    selecteurPhoto.disabled = false;
  }
  else{
    selecteurPhoto.disabled = true;
  }
});




/*valeurMesure.addEventListener('focus', ()=>{
  valeurMesure.addEventListener('keydown', (e)=>{
    if(e.keyCode == 13){
      affichageLastMesure(listMesure);
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
    }
  })
});
*/
var boutonprev = document.getElementById('prev1');
var boutonnext = document.getElementById('next1');
// Créez un nouvel événement de clic
var clicEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  view: window
});

function calculerMoyennesPourListeComposants(matchingInfos, NomTypeC) {
  // Créez un objet pour stocker les données de chaque NomTypeC
  var donneesParTypeC = {};

  // Fonction pour effectuer une requête AJAX
  function fetchJSON(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error("Erreur de requête :", error);
      });
  }

  // Fonction pour calculer la moyenne
  function calculerMoyenne(valeurs) {
    if (valeurs.length === 0) {
      return 0;
    }
    var somme = valeurs.reduce(function (a, b) {
      return a + b;
    });
    return somme / valeurs.length;
  }

  // Fonction pour traiter un composant
  function traiterComposant(index) {
    if (index >= matchingInfos.length) {
      // Tous les composants ont été traités, calculer les moyennes et afficher les résultats
      for (var NomTypeC in donneesParTypeC) {
        console.log(`NomTypeC: ${NomTypeC}`);
        for (var parametre in donneesParTypeC[NomTypeC]) {
          var moyenne = calculerMoyenne(donneesParTypeC[NomTypeC][parametre]);
          console.log(`Paramètre: ${parametre}, Moyenne: ${moyenne}`);
        }
      }
    } else {
      // Traiter le composant actuel
      var ID_component = matchingInfos[index];
      var NomTypeCActuel = NomTypeC[index];

      var urlTypicalMesure =
        "https://vmicro.fr/database/BDD_1.0/API/api.php?action=getTypicalMesure&ID_Composant=" +
        ID_component;

      fetchJSON(urlTypicalMesure)
        .then(typicalMesure => {
          var donneesComposant = {};

          return Promise.all(
            typicalMesure.results[0]["Nom_Parametre"].map(nomTypicalParametre => {
              var urlLastMesure =
                "https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLastMesure&ID_Composant=" +
                ID_component +
                "&ID_Caracteristique=" +
                typicalMesure.results[0]["ID_Caracteristique"][nomTypicalParametre];

              return fetchJSON(urlLastMesure).then(lastMesure => {
                if (lastMesure.results[0] !== null) {
                  var valeur = parseFloat(lastMesure.results[0]["Valeur"][0]);

                  if (!donneesParTypeC[NomTypeCActuel]) {
                    donneesParTypeC[NomTypeCActuel] = {};
                  }

                  if (!donneesParTypeC[NomTypeCActuel][nomTypicalParametre]) {
                    donneesParTypeC[NomTypeCActuel][nomTypicalParametre] = [];
                  }

                  if (valeur !== 0) {
                    donneesParTypeC[NomTypeCActuel][nomTypicalParametre].push(valeur);
                  }
                }
              });
            })
          ).then(() => {
            // Passer au composant suivant
            traiterComposant(index + 1);
          });
        });
    }
  }

  // Commencez le traitement avec le premier composant (index 0)
  traiterComposant(0);
}







  





// Exemple d'utilisation de la fonction mesureret avec votre conteneur


/*document.addEventListener('DOMContentLoaded', function() {
  // Appel initial avec deux arguments
  var reticule14 = document.getElementById('reticule14');
  var reticuleSurvol = document.getElementById('reticule14');
  var fakeEvent = {
    target: reticule14
  };
  clickReticule(fakeEvent, reticuleSurvol);

  // Autres actions à effectuer après le chargement initial de la page
});*/



pagePredefini();
lancementPagePrincipale();
