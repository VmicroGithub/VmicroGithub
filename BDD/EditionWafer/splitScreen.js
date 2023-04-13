var selecteurWaferType = document.getElementById("selecteurWaferType");
var circle = document.getElementById("circle");

fillSelectorWithRequeteTypeWafer('http://vmicro.fr/database/BDD_1.0/API/api.php?action=WaferTypeLIST', selecteurWaferType);
drawCircle();

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

function drawCircle(){
  var tailleX = window.innerWidth*0.75;
  var tailleY = window.innerHeight - 90;

  console.log(tailleX);
  console.log(tailleY);


  if(tailleX>tailleY){
    rayon = tailleY - 50;
  }
  else {
    rayon = tailleX - 50;
  }

  circle.style.width = rayon;
  circle.style.height = rayon;
}
function createMapReticule(RenX, RenY, StepX, StepY){
  /*
  for(var y=RenY; y>0; y--){
    for(var x=1; x=RenX; x++){
      var divTravail = createDiv();
    }
  }
  */

}


//Evenement:

window.addEventListener('resize', drawCircle);
