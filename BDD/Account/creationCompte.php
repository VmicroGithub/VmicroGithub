<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

/* Center the image and position the close button */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 10% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 60%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
  position: absolute;
  right: 25px;
  top: 0;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

/* Add Zoom Animation */
.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

#pswError{
  display: none;
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)}
  to {-webkit-transform: scale(1)}
}

@keyframes animatezoom {
  from {transform: scale(0)}
  to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>
</head>
<body>
<?php

  include("connexionGlobale.php"); // On se connecte à la base de données
  $valide=False;
  if(isset($_POST["Envoye"]))
  {
    if(isset($_POST["firstname"]))
    {
      $prenom = $_POST["firstname"];
      if(isset($_POST["lastname"]))
      {
        $nom = $_POST["lastname"];
        if(isset($_POST["uname"]))
        {
          $pseudo = $_POST["uname"];
          if(isset($_POST["psw"]))
          {
            if(isset($_POST["psw2"]))
            {
              $password = md5($_POST["psw2"]);
              if(isset($_POST["admin_Code"]))
              {
                $dateActuelle = date_create();
                date_timestamp_get($dateActuelle);
                //Requete Uniquement si admin_Code est bon
                $reponse = $bdd->query('SELECT code, dateout from admin_Code');
                while($donnees = $reponse->fetch())
                {
                    echo $donnees["code"];
                    echo "<br>";
                    echo $donnees["dateout"];
                    echo "<br>";
                    if($_POST["admin_Code"] == $donnees["code"])
                    {
                      echo $_POST["admin_Code"];
                      echo "<br>";
                      echo date_format($dateActuelle, 'Y-m-d H:i:s');
                      if(date_format($dateActuelle, 'Y-m-d H:i:s') < $donnees["dateout"])
                      {
                        echo "valide";
                        $valide = True;
                      }
                      echo "non valide";
                    }
                }
                if($valide == True)
                {
                  echo "valide !!!";
                  $requete = $bdd->prepare('INSERT INTO utilisateur (pseudo, prenom, nom, mdp, droit) VALUES (:pseudo, :prenom, :nom, :mdp,"777")');
                  $requete->execute(array(
                    'pseudo' => $pseudo,
                    'prenom' => $prenom,
                    'nom' => $nom,
                    'mdp' => $password
                  ));
                  ?>
                  <script> // La commande si dessous doit s'éxécuter en Javascript
                  window.location.href = "pageIdentification.php";
                  </script>
                  <?php
                }
                //Plus faire la photo
              }
              else {
                echo "Problème admin_Code";
              }
            }
            else {
              echo "Problème psw2";
            }
          }
          else {
            echo "Problème psw";
          }
        }
        else {
          echo "Problème uname";
        }
      }
      else {
        echo "Problème lastname";
      }
    }
    else {
      echo "Problème firstname";
    }
  }
  else {
  ?>
  <div id="id01" class="modal">

    <form class="modal-content animate" action="creationCompte.php" method="post" id="demoForm" enctype="multipart/form-data">
      <div class="imgcontainer">
        <img src="image/user/img_avatar2.png" alt="Avatar" class="avatar">
      </div>

      <div class="container">
        <label for="prenom"><b>First Name</b></label>
        <input type="text" placeholder="Enter your first name " name="firstname" required>

        <label for="nom"><b>Last Name</b></label>
        <input type="text" placeholder="Enter your last name" name="lastname" required>

        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

        <label for="psw"><b>Confirmation Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw2" id="psw2" required>
        <span id="pswError" style="color:red">Your password and confirmation password do not match.</span>
        <br>
        <br>

        <label for="psw"><b>Admin Code</b></label>
        <input type="password" placeholder="Enter Admin Code" name="admin_Code" required>

        <label for="image"><b>Picture</b></label>
        <br>
        <input type="file" name="fileToUpload" id="fileToUpload" required>

        <input type="hidden" name="Envoye" value=True>

        <button type="submit">Create account</button>
        </div>
    </form>
  </div>

  <script>
      var form = document.getElementById('demoForm');
      var messageErreurPSW = document.getElementById("pswError");
      form.addEventListener('submit', validation,true);
      function validation(e)
      {
        if(this.elements['psw'].value != this.elements['psw2'].value)
        {
          messageErreurPSW.style.display = "block";
          e.preventDefault();
        }
      }
  </script>
  <?php
}
?>

</body>
