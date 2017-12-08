var instance="base";
var etape = 0;
var sousetape = 0;
var finish = 0;
var Spawn=0;

var nbrPersonneSAM;
var personne1;
var personne2;                  /* variable pour SAM*/
var personne3;
var personne4;
var personne5;
var choixsam;
var transition;


var chaineKonami="";
var TailleChaine=0;



var reponse;                /* variable quizz */
var score;
var insererscore;

var fond=0;




function SpawnClavier () {

    console.log(Spawn);
  console.log("SpawnClavier");
  
  if(Spawn == 0)
  {
    console.log("visible");
    Spawn = 1;
    document.getElementById("Clavier").setAttribute("class","Cvisible");
    /*  rendre visible  */
  }
  else
  {
    console.log("hidden");
    Spawn = 0;
    document.getElementById("Clavier").setAttribute("class","Chidden");
    /*  rendre invisible  */
  }
    
    console.log(Spawn);
}


function Konami(letter)
{
    
    if(letter == 'a')
        {
         chaineKonami = chaineKonami + "a";   
        }
    else if(letter == 'z')
        {
          chaineKonami = chaineKonami + "z";   
        }
    else if(letter == 'q')
        {
          chaineKonami = chaineKonami + "q";   
        }
    else if(letter == 's')
        {
           chaineKonami = chaineKonami + "s";  
        }
    else if(letter == 'd')
        {
            chaineKonami = chaineKonami + "d"; 
        }
    else if(letter == 'r')
        {
          chaineKonami = chaineKonami + "r";   
        }
    else if(letter == 'l')
        {
         chaineKonami = chaineKonami + "l";    
        }
    else if(letter == 'b')
        {
           chaineKonami = chaineKonami + "b";  
        }
    else if(letter == 'x')
        {
          chaineKonami = chaineKonami + "x";   
        }
    else if(letter == 'y')
        {
          chaineKonami = chaineKonami + "y";   
        }
    
    TailleChaine = TailleChaine + 1;
    console.log(chaineKonami);

    
    
    switch (TailleChaine)
    {
      case 1 :

          if(chaineKonami != "z")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 2 :
        if(chaineKonami != "zz")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 3 :
        if(chaineKonami != "zzs")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 4 :
      if(chaineKonami != "zzss")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 5 :

        if(chaineKonami != "zzssq")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 6 :
      if(chaineKonami != "zzssqd")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 7 :
      if(chaineKonami != "zzssqdq")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 8 :
      if(chaineKonami != "zzssqdqd")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 9 :
       if(chaineKonami != "zzssqdqdb")
          {
            TailleChaine = 0;
            chaineKonami = '';
          }

      break;

      case 10 :
      if(chaineKonami == "zzssqdqdba")
      {
          TailleChaine = 0;
        chaineKonami = '';
          console.log("DEAD");
          DEAD();  
      }

      else
      {
        TailleChaine = 0;
        chaineKonami = '';
      }

      break;
    }
}



function DEAD()
{

   document.getElementById("StylChatBot").setAttribute("href","style2.css"); 

}




function Random(min,max) {
    
    return (Math.floor((max-min)*Math.random())+min); 
}

function ChatBot() {

    console.log("ChatBot");
    
    
    if (finish == 0)
    {


      if(instance == "base")
      {
          console.log("requete1");
          var requete = document.getElementById("chatwrite").value;
          switch (requete)
          {
              case "conseils produit": 
                  instance="conseils_produit";
                  document.getElementById("chatwrite").value = ''; 
              break;
              
              case "you're not in control": 
                  instance="kanamicode";
                  document.getElementById("chatwrite").value = ''; 
              break;

              case "quiz": 
                  instance="quiz";
                  document.getElementById("chatwrite").value = '';
                  score = 0; 
              break;
        
              
              case "numero":
                  instance="numero";
                  document.getElementById("chatwrite").value = ''; 
              break;
             
    
              case "SAM": 
                  console.log("SAM");
                  instance="SAM";
                  console.log(instance); 
                  document.getElementById("chatwrite").value = '';
              break;
          }
           etape = 0;
      }

      if(instance != "base")  
      {
          console.log(instance);
          switch(instance)
          {

              case "SAM" :                /* debut algo SAM */
                  console.log("entrer case sam");
                  if (etape == 3)
                  {   
                      console.log("entrer etape 3");
                      choixsam = Random(1,nbrPersonneSAM);

                      console.log(choixsam);
                      switch (choixsam)
                      {
                          case 1 :

                              document.getElementById("box").innerHTML = personne1 + " </br> ok pour recommencer";

                          break;

                          case 2 :

                               document.getElementById("box").innerHTML = personne2 + " </br> ok pour recommencer";

                          break;

                          case 3 :

                               document.getElementById("box").innerHTML = personne3 + " </br> ok pour recommencer";

                          break;

                          case 4 :

                               document.getElementById("box").innerHTML = personne4 + " </br> ok pour recommencer";

                          break;


                          case 5 :

                               document.getElementById("box").innerHTML = personne5 + " </br> ok pour recommencer";

                          break;


                      }


                      etape = 0;
                      sousetape = 0;
                      finish = 1;
                  }

                  

                  else if(etape == 2)
                  {
                      console.log("entrer etape 2");
                      
                      console.log(nbrPersonneSAM);


                      switch (nbrPersonneSAM)
                      {
                          
                          case '2' :
                              console.log("case2");
                              if(sousetape == 1)
                              {
                                  console.log("case2 sousetape1");
                                personne2 = document.getElementById("chatwrite").value;
                                document.getElementById("chatwrite").value = '';
                                sousetape = 2;  
                              }

                              else if(sousetape == 0)
                              {
                                  console.log("case2 sousetape0");
                                personne1 = document.getElementById("chatwrite").value;
                                sousetape = 1;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 2";
                                document.getElementById("chatwrite").value = '';  

                              }

                          break;

                          case '3' :

                              if(sousetape == 2)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                document.getElementById("chatwrite").value = '';
                                sousetape = 3;  
                              }

                              if(sousetape == 1)
                              {
                                personne2 = document.getElementById("chatwrite").value;
                                sousetape = 2;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 3";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 0)
                              {
                                personne1 = document.getElementById("chatwrite").value;
                                sousetape = 1;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 2";
                                document.getElementById("chatwrite").value = '';  
                              }

                          break;

                          case '4' :

                              if(sousetape == 3)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                document.getElementById("chatwrite").value = '';
                                sousetape = 4;  
                              }

                              if(sousetape == 2)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                sousetape = 3;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 4";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 1)
                              {
                                personne2 = document.getElementById("chatwrite").value;
                                sousetape = 2;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 3";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 0)
                              {
                                personne1 = document.getElementById("chatwrite").value;
                                sousetape = 1;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 2";
                                document.getElementById("chatwrite").value = '';  
                              }

                          break;

                          case '5' :

                              if(sousetape == 4)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                document.getElementById("chatwrite").value = '';
                                sousetape = 5;  
                              }

                              if(sousetape == 3)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                sousetape = 4;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 5";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 2)
                              {
                                personne3 = document.getElementById("chatwrite").value;
                                sousetape = 3;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 4";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 1)
                              {
                                personne2 = document.getElementById("chatwrite").value;
                                sousetape = 2;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 3";
                                document.getElementById("chatwrite").value = '';  
                              }

                              if(sousetape == 0)
                              {
                                personne1 = document.getElementById("chatwrite").value;
                                sousetape = 1;
                                document.getElementById("box").innerHTML = "Entrer le nom de la personne 2";
                                document.getElementById("chatwrite").value = '';  
                              }

                          break;


                      }

                      /*
                      transition = sousetape;
                          transition = transition + 1;

                          console.log("transition :");
                          console.log(transition);
                       */   
                          if(nbrPersonneSAM == sousetape + 1 )
                          {
                              console.log("fin entrer les nom");
                              etape = 3;
                          }
                      console.log("fin switch");
                      
                  }


                  else if(etape == 1)             /* Rentrer un nombre */
                  {

                      console.log("entrer etape 1");
                      nbrPersonneSAM = document.getElementById("chatwrite").value;

                      console.log(nbrPersonneSAM);
                      if(nbrPersonneSAM < 6 && nbrPersonneSAM > 1)
                      { 
                          etape = 2;
                          sousetape = 0;
                          document.getElementById("box").innerHTML = "Entrer le nom de la personne 1";
                          document.getElementById("chatwrite").value = '';

                          console.log(etape);
                      }
                      else
                       {
                          document.getElementById("box").innerHTML = "Vous n'avez pas tapé un nombre  entre 1 et 9 !!!!";
                          document.getElementById("chatwrite").value = '';
                       }

                          
                  }

                  else if(etape == 0)      /* cmb de personne ? */
                  {
                      console.log("entrer etape 0");
                      document.getElementById("box").innerHTML = "Combien de personne voulez vous tirer au sort (5 personnes max) ?";
                      document.getElementById("chatwrite").value = '';
                      etape = 1;
                  }


               break;          /* fin algo SAM */


              case "quiz" :   /* debut quiz*/

                  console.log("case quiz")



                  if(etape == 3)
                  {
                      reponse = document.getElementById("chatwrite").value;

                      if(reponse == 'a' || reponse == 'b' || reponse == 'c' || reponse == 'd' )
                      {
                        if(reponse == 'a')
                        {
                          score = score + 1;
                        }

                        etape = 4;
                     
                      }
                      else
                      {
                        document.getElementById("box").innerHTML = "Q3)Lors d'un long trajet avec un véhicule chargé que faut-il vérifier avant le départ ?  </br> a) la pression des pneu     b) le paralélisme </br> c) la propreté des vitres    d) les airbags "; 
                        document.getElementById("chatwrite").value = '';
                      }
                  }

                  if(etape == 2)
                  {
                      reponse = document.getElementById("chatwrite").value;

                      if(reponse == 'a' || reponse == 'b' || reponse == 'c' || reponse == 'd' )
                      {
                        if(reponse == 'c')
                        {
                          score = score + 1;
                        }

                        etape = 3;
                        document.getElementById("box").innerHTML = "Q3)Lors d'un long trajet avec un véhicule chargé que faut-il vérifier avant le départ ?  </br> a) la pression des pneu     b) le paralélisme </br> c) la propreté des vitres    d) les airbags "; 
                        document.getElementById("chatwrite").value = '';
                      }
                      else
                      {
                        document.getElementById("box").innerHTML = "Vous n'avez pas rentré a,b,c ou d !!!! </br>Q2) Quel est le momment de la journée le plus propice à un état de sommenolance ?  </br> a)midi     b) aprés midi </br> c) entre midi et deux     d) la nuit "; 
                        document.getElementById("chatwrite").value = '';
                      }
                  }

                  if(etape == 1)
                  {
                      reponse = document.getElementById("chatwrite").value;

                      if(reponse == 'a' || reponse == 'b' || reponse == 'c' || reponse == 'd' )
                      {
                        if(reponse == 'b')
                        {
                          score = score + 1;
                        }

                        etape = 2;
                        document.getElementById("box").innerHTML = "Q2) Quel est le momment de la journée le plus propice à un état de sommenolance ?  </br> a)midi     b) aprés midi </br> c) entre midi et deux     d) la nuit "; 
                        document.getElementById("chatwrite").value = '';
                      }
                      else
                      {
                        document.getElementById("box").innerHTML = "Vous n'avez pas rentré a,b,c ou d !!!! </br>Q1) A cause du mélange Alcool/Médicament/Drogue </br> - Le risque est : </br> a)Additioné     b)Multiplié </br> c) Divisé    d) Inchangé"; 
                        document.getElementById("chatwrite").value = '';
                      }
                  }


                  if(etape == 0)
                  {
                    document.getElementById("box").innerHTML = "Q1) A cause du mélange Alcool/Médicament/Drogue </br> - Le risque est : </br> a)Additioné     b)Multiplié </br> c) Divisé    d) Inchangé"; 
                    document.getElementById("chatwrite").value = '';
                    etape = 1;
                  }

                  if(etape == 4)
                  {

                    insererscore = "Votre score est de " + score + "/3";
                    
                    document.getElementById("chatwrite").value = '';
                    if(score != 3)
                    {
                      insererscore = insererscore + "</br> Tu n'as pas eu 3/3 !!!!!!! Va lire les rubriques de notre site et reviens faire le quiz"
                     
                    }
                     insererscore = insererscore + " </br> ok pour recommencer";
                     document.getElementById("box").innerHTML = insererscore; 
                    finish = 1;
                  }




              break; /* fin quiz*/



              case "numero" :

                document.getElementById("box").innerHTML = "Voici une liste de numéro à contacter en cas d'urgence : </br> Pompier : 18 </br> SAMU : 15 </br> Police : 17 </br> appel d'urgence : 112</br> </br> ok pour recommencer"; 
                finish = 1;
              break;

              case "kanamicode" :

                    
                    instance = "base";
                    SpawnClavier();
              break;


          }                   /* fin switch instance */
      }
  }
    else if(finish == 1)
    {
      restart = document.getElementById("chatwrite").value;

      if(restart == 'ok')
      {
        instance = "base";
        finish = 0;
        document.getElementById("box").innerHTML = "Entrez une requête";
        document.getElementById("chatwrite").value = '';

      }
    }
}