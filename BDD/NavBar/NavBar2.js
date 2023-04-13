
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', ()=> {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = '';
      }
      else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index/5 +0.5}s`;
      }
    });
    burger.classList.toggle('toggle');
  });

}
function slideConnection(){
  const account = document.querySelector('.avatar');
  const barConnexion = document.querySelector('.connectElement');
  account.addEventListener('click',()=>{
    console.log("click");
    /*
    console.log(barConnexion.style.animation);
    if(barConnexion.style.animation){
      barConnexion.style.animation = '';
    }
    else {
        barConnexion.style.animation = `connectElementFade 0.4s ease forwards 0.4s`;
    }
    */
    barConnexion.classList.toggle("connectElement-active");
  });
}
function start(){
    var urlBase = "https://vmicro.fr/database/BDD_1.0/API/api.php";
    var url;
    var id_user = document.getElementById('user_id').value;
    url = urlBase + "?action=UserLAW&UserID="+id_user;
    var resultReq;
    console.log(url);
    ajaxGet(url, function(reponse){
    resultReq = JSON.parse(reponse);
    //console.log(droit.results);
    if(resultReq.results == 777)
    {

      document.querySelector('.creaModel').style.display = "block";
      document.querySelector(".creaWafer").style.display = "block";
      document.querySelector(".admin").style.display = "block";

    }
    });
    url = urlBase + "?action=UserPICTURE&UserID="+id_user;
    ajaxGet(url, function(reponse){
      resultReq = JSON.parse(reponse);
      console.log(resultReq.results);
      if(resultReq.results != null)
      {
        document.querySelector('.avatar').style.backgroundImage = 'url('+resultReq.results+')';
      }
    });
}

navSlide();
start();
slideConnection();
