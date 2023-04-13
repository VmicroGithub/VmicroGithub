var fisrtNameUser = document.getElementById("firstNameUser");
var lastNameUser = document.getElementById("lastNameUser");
var idUser = document.getElementById("idUser");

var boutonValideMesure = document.getElementById("boutonMesure");
var boutonValideExperience = document.getElementById("boutonExperience");
var boutonValideCommentaire = document.getElementById("boutonCommentaire");

var selecteurParametre = document.getElementById("selecteurParametre");
var uniteeParamMesure = document.getElementById("uniteeParamMesure");
var selecteurAuteurExperience = document.getElementById("selecteurAuteurExperience");
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
var selecteurPhoto = document.getElementById("selecteurPhoto");
var eraseExp = document.getElementById("EraseExp");
var eraseCommentaire = document.getElementById("EraseCommentaire");


var conteneurMenu = document.getElementById("conteneurMenu");
var historique = document.getElementById("historique");

var selectedComponent = document.getElementById("selectedComponent");

var parametreSelect;

//---------------------------------------------//
/////// Fonction pour la page principale ////////
//---------------------------------------------//

function remplissageSelecteurParametre(conteneur, idComposant){

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
function remplissageCommentaire(idComposant){
  var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getComment2WithIDcomponent&ID_Component='+idComposant; // On indique le lien pour la requête
  console.log(url); // On affiche le lien (Optionnel)
  ajaxGet(url, function(reponseComment){ // On fait une requête get
    listComment = JSON.parse(reponseComment); // On parse la réponse
    console.log(listComment); // (Optionnel)
    console.log(listComment['results'][0]); //(Optionnel)
    corpsEditionCommentaire.innerHTML=""; // On vide le contenu de corpsEditionCommentaire
    corpsEditionAuteurCommentaire.innerHTML=""; // On vide le contenu de corpsEditionAuteurCommentaire
    corpsEditionDateCommentaire.innerHTML=""; // On vide le contenu de corpsEditionDateCommentaire
    if(listComment['results'][0]!= null){ // S'il y a des commentaires alors on effectue les lignes en dessous
      listComment['results'][0]["Contenu"].forEach((commentaire, idCommentaire) => { // Pour chaque colonne contenu du résultat de la requête

        if(listComment['results'][0]["ID_Image"][idCommentaire] != -1){ // S'il y a une image
          //On affiche la photo
          // var img = document.createElement("img"); // On crée un élément image
          var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkPictureWithID&ID_picture='+listComment['results'][0]["ID_Image"][idCommentaire]; // On défini le lien pour la requête chargé de trouver l'ID_Imag
          //console.log(url); // On affiche le lien (Optionnel)
          ajaxGet(url, function(reponseLink){ // On fait une requête GET
            listLink = JSON.parse(reponseLink); // On parse la réponse
            if(listLink['results'][0]!=null){
              //console.log(listLink);
              //console.log('../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']);
              var src_image = '../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']; // On défini le lien vers la source de l'image

              

              console.log("le tif :" + listLink['results'][0]['Extension']);
              if (listLink['results'][0]['Extension']=="tif")
              {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'arraybuffer';
                xhr.open('GET', src_image);
                xhr.onload = function (e) {
                  var tiff = new Tiff({buffer: xhr.response});
                  var canvas_tiff= tiff.toCanvas();
                  // canvas_tiff.height = "400px"; // On défini la hauteur de l'image
                  // canvas_tiff.width = "400px"; // On défini la largeur de l'image
                  canvas_tiff.style.margin = "auto"; // On centre l'image
                  newDivCommentaire.appendChild(canvas_tiff); 
                  newDivAuteurCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div auteur soit de la même hauteur que la div commentaire
                  newDivDateCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div date soit de la même hauteur que le div commentaire
                };
                xhr.send();
                
                
              }
              else{
                var img = document.createElement("img"); // On crée un élément image
                img.src = '../'+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension']; // On défini le lien vers la source de l'image

                //img.src = '../image/component/5005/071020114450.jpg';
                img.style.height = "400px"; // On défini la hauteur de l'image
                img.style.width = "400px"; // On défini la largeur de l'image
                img.style.margin = "auto"; // On centre l'image
                newDivCommentaire.appendChild(img); // On associe l'image avec le div du commentaire
                //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
                newDivAuteurCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div auteur soit de la même hauteur que la div commentaire
                newDivDateCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div date soit de la même hauteur que le div commentaire
              }
              
            }
          })
        }
        if(listComment['results'][0]["ID_Fichier"][idCommentaire] != -1){ // S'il y a un fichier
          var lienFichier = document.createElement("a"); // On crée un élément qui contient le lien du fichier
          lienFichier.innerHTML = "Lien vers fichier"; // On écrit "Lien vers fichier" sur le lien du fichier
          var url = 'https://vmicro.fr/database/BDD_1.0/API/api.php?action=getLinkFileWithID&ID_file='+listComment['results'][0]["ID_Fichier"][idCommentaire]; // On défini le lien pour la requête chargé de trouver le ou les fichier(s)
          //console.log(url);
          ajaxGet(url, function(reponseLink){
            listLink = JSON.parse(reponseLink);
            if(listLink['results'][0]!=null){
              console.log(listLink['results'][0]);
              lienFichier.href = "../"+listLink['results'][0]['Chemin']+"."+listLink['results'][0]['Extension'];
              lienFichier.target = "_blank";
              newDivCommentaire.appendChild(lienFichier);
              //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
              newDivAuteurCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div auteur soit de la même hauteur que la div commentaire
              newDivDateCommentaire.style.height = newDivCommentaire.offsetHeight+"px"; // On fait en sorte que la hauteur de la div date soit de la même hauteur que le div commentaire

            }
          });
        }

        var newDivCommentaire = document.createElement("div"); // On crée une div nommée newDivCommentaire
        //var newContentCommentaire = document.createTextNode(commentaire);
        //newDivCommentaire.appendChild(newContentCommentaire);

        var newHiddenInput = document.createElement("input");
        newHiddenInput.type = "hidden";
        newHiddenInput.value = listComment['results'][0]["ID_Commentaire"][idCommentaire];
        newHiddenInput.id = "ID_COMM"+idCommentaire;
        newDivCommentaire.appendChild(newHiddenInput);

        var newLabelCommentaire = document.createElement("label");
        newLabelCommentaire.style.fontWeight = "100";
        newLabelCommentaire.style.marginBottom = "0 px";
        newLabelCommentaire.innerHTML = commentaire;
        newLabelCommentaire.id= "label"
        newDivCommentaire.appendChild(newLabelCommentaire);

        //newDivCommentaire.innerHTML = commentaire; // On affecte la valeur du commentaire dans le contenu de la div newDivCommentaire
        newDivCommentaire.id = "COM"+idCommentaire; // On détermine l'id sur commentaire avec ID +  l'index du commentaire
        newDivCommentaire.style.display = "grid"; // On affiche la div sous forme d'une grille
        newDivCommentaire.style.border="1px solid white"; // On défini la couleur, l'épaisseur, le style des bordure

        newDivCommentaire.addEventListener("dblclick", (e)=>{
          modifCommentaire(e);
        })

        

        var newDivAuteurCommentaire = document.createElement("div");
        var newContentAuteurCommentaire = document.createTextNode(listComment['results'][0]["prenom"][idCommentaire]+" "+listComment['results'][0]["nom"][idCommentaire]);
        newDivAuteurCommentaire.appendChild(newContentAuteurCommentaire);
        newDivAuteurCommentaire.id = "COM"+idCommentaire;
        newDivAuteurCommentaire.style.border="1px solid white";
        newDivAuteurCommentaire.style.display = "block";
        newDivAuteurCommentaire.style.height=newDivCommentaire.style.height;
        newDivAuteurCommentaire.style.width=newDivCommentaire.style.width;
        //newDivAuteurCommentaire.style.height = "100%";
        //console.log("newDivCommentaire = " + newDivCommentaire.offsetHeight+"px");
        corpsEditionAuteurCommentaire.appendChild(newDivAuteurCommentaire);

        var newDivDateCommentaire = document.createElement("div");
        var newContentDateCommentaire = document.createTextNode(listComment['results'][0]["DateCom"][idCommentaire]);
        newDivDateCommentaire.appendChild(newContentDateCommentaire);
        newDivDateCommentaire.id = "COM"+idCommentaire;
        newDivDateCommentaire.style.border="1px solid white";
        newDivDateCommentaire.style.display = "block";
        newDivDateCommentaire.style.height=newDivCommentaire.style.height;
        newDivDateCommentaire.style.width=newDivCommentaire.style.width;
        // console.log()
        // newDivDateCommentaire.style.height=newDivCommentaire.height;
        //newDivDateCommentaire.style.height = "100%";

        corpsEditionCommentaire.appendChild(newDivCommentaire); // On associe newDivCommentaire avec corpsEditionCommentaire
        corpsEditionDateCommentaire.appendChild(newDivDateCommentaire);

        // newDivAuteurCommentaire.style.height="100%";
        // newDivDateCommentaire.style.height="100%";
        
      });
    }
  });
}
function pagePredefini(){
  if(selectedComponent.value!=""){
    idComposantMemory = selectedComponent.value;
    console.log(idComposantMemory);
  }
  else{
    if(lastComponent.value!=""){
      idComposantMemory = lastComponent.value;
      console.log(idComposantMemory);
    }
  }
}

function lancementPagePrincipale(){

  historique.style.marginTop = conteneurMenu.offsetHeight;
  remplissageEtatDuComposant(idComposantMemory);
  remplissageSelecteurParametre(selecteurParametre, idComposantMemory);
  remplissageSelecteurAuteurExperience(selecteurAuteurExperience);
  remplissageSelecteurAuteurExperience(selecteurAuteurCommentaire); // Même si cela n'est pas utilisé pour expérience
  remplissageHistoriqueMesExp(idComposantMemory);
  remplissageCommentaire(idComposantMemory);

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
eraseExp.addEventListener('click', ()=>{
  descriptionExperience.value="";
});
eraseCommentaire.addEventListener('click', ()=>{
  descriptionCommentaire.value="";
  selecteurPhoto.value="";
  selecteurFichier.value="";
  selecteurPhoto.disabled = false;
  selecteurFichier.disabled = false;
});

boutonValideMesure.addEventListener('click', ()=>{
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
  if(file_data_file==undefined){
    data.append('id_fichier',-1);
  }
  else{
    data.append('id_fichier',0);
    data.append('file_fichier', file_data_file);
  }

  data.append('id_composant', idComposantMemory);
  data.append('contenu_Commentaire',descriptionCommentaire.value);

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

})

selecteurParametre.addEventListener('change', ()=>{
  parametreSelect = selecteurParametre.value;
  //--> Afficher l'unité correspondant au parametre
  console.log(parametreSelect);
  console.log(document.getElementById("unite"+parametreSelect));
  uniteeParamMesure.innerHTML = document.getElementById("unite"+parametreSelect).value;
})

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

valeurMesure.addEventListener('focus', ()=>{
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

pagePredefini();
lancementPagePrincipale();
