function doublonType1(arrayNom, arrayActivate){
  var tableauNomRetour = new Array();
  var tableauActivateRetour = new Array();
  var tableauSortie = [];

  arrayNom.filter((item, index) =>{
    //console.log(item, index, array.indexOf(item), array.indexOf(item) === index);
    if(arrayNom.indexOf(item)=== index){
      tableauNomRetour.push(item);
      tableauActivateRetour.push(arrayActivate[index]);
    }
    //console.log(tableauRetour);
  });
  tableauSortie.push(tableauNomRetour);
  tableauSortie.push(tableauActivateRetour);
  return tableauSortie;
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


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
