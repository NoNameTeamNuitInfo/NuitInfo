#!/usr/bin/python
# -*- coding: utf-8 -*

import cgi, cgitb, mysql.connector, os
from http import cookies

cgitb.enable()

form = cgi.FieldStorage()


passwd_inscription = "motdepasse"
connexion = False
c = cookies.SimpleCookie()

###########################################################################
## Fonction qui génère le code html en fonction de l'état de la connexion
###########################################################################


		


####################################################
## Création de la table si nécessaire             
####################################################
connexion_MYSQL = mysql.connector.connect(host="localhost",user="site_mdl",password="mdl2017", database="site_mdl")
curseur = connexion_MYSQL.cursor()

curseur.execute("""
CREATE TABLE IF NOT EXISTS comptes (
    id int(5) NOT NULL AUTO_INCREMENT,
    email varchar(50) DEFAULT NULL,
    passwd varchar(50) DEFAULT NULL,
    nom varchar(50) DEFAULT NULL,
    prenom varchar(50) DEFAULT NULL,
    login varchar(50) DEFAULT NULL,
    statut varchar(50) DEFAULT NULL,
    PRIMARY KEY(id)
);
""")

curseur.execute("""
CREATE TABLE IF NOT EXISTS inscription (
    passwd varchar(50) DEFAULT NULL
);
""")

### Affichage par défaut

html = """
	<html>
	<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../style.css" />
	<title>Accueil </title>
	</head>

	<body>
		<h1>Bienvenue</h1>
	
	<div id="bas"><a href='index.py?inscription'>Vous inscrire</a> ou 
	 <a href='index.py?connexion'>Vous connecter</a></div>
	</body>
	</html>
	"""




################################################################
## Demande de déconnexion
################################################################

if (os.getenv("QUERY_STRING","") == 'deconnexion'): # On test la présence d'une variable POST
	c.load(os.getenv("HTTP_COOKIE"))
	c["connexion"]["expires"] = 0
	print(c)
	connexion = False

################################################################
## Demande d'inscription
################################################################

if (os.getenv("QUERY_STRING","") == 'inscription'):
	html = """<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../style.css" />
			<title>Inscription</title>
			</head>
			<body>
			<form method="post" action="index.py">
					<h1>Inscription</h1>
					<p>
					<input type="text" name="nom" id="nom" placeholder="NOM" size="30" maxlength="30"/></p>
					<p>
					<input type="text" name="prenom" id="prenom" placeholder="Prénom" size="30" maxlength="30"/></p>
					<p>
					<input type="email" name="email" id="email" placeholder="e-mail" size="30" maxlength="30"/></p>
					<p>
					<input type="text" name="login" id="login" placeholder="login" size="30" maxlength="30"/></p>
					<p>
					<input type="password" name="password" id="password" placeholder="Mot de passe" size="30" maxlength="30"/></p>
					<p>
					Vérification (Saisir à nouveau le mot de passe)</p>
					<p>
					
					<input type="password" name="password2" id="password2" placeholder="Mot de passe" size="30" maxlength="30"/></p>
					<p>
					Mot de passe d'autorisation d'inscription</p>
					<p>
					
					<input type="password" name="passwordi" id="passwordi" placeholder="Mot de passe" size="30" maxlength="30"/></p>
					<INPUT TYPE="submit" NAME="creer" VALUE="Créer">
			<p>Déjà inscrit(e) ? <a href='index.py?connexion'>Connectez-vous</a></p>
			</body>
			</html>
	"""

################################################################
## Validation d'inscription
################################################################
elif (form.getvalue('creer')=="Créer"):  # On appelé le fichier par un formulaire
	try:
		curseur.execute("""SELECT id FROM comptes WHERE login=%s""", (form.getvalue("login"),)) # On interroge la base de donnée pour vérifier que le login n'existe pas 
		rows = curseur.fetchall()
		retour = "<div id='bas'><a href='index.py?inscription'>Retour à la page d'inscription</a></div>"
	except:
		retour = "<h1 class='red'>Une erreur s'est produite</h1>"
		retour += "<div id='bas'><a href='index.py?inscription'>Retour à la page d'inscription</a></div>"

	if form.getvalue('passwordi') != passwd_inscription:
		texte_inscription = "Le mot de passe de contrôle est faux."
		texte_inscription += retour
	elif form.getvalue("password") != form.getvalue("password2"):
		texte_inscription = "<h1 class='red'>Les deux mots de passe ne coïncident pas !!!</h1>"
		texte_inscription += retour
	elif rows != []:
		texte_inscription = "<h1 class='red'>Ce <em>login</em> à déjà été choisit</h1>"
		texte_inscription += retour
	else:  # Tout va bien on peut ajouter ce nouvel utilisateur
		user = (form.getvalue("email"), form.getvalue("password"), form.getvalue("nom"), form.getvalue("prenom"), form.getvalue("login"))
		curseur.execute("""INSERT INTO comptes VALUES (NULL, %s, PASSWORD(%s), %s, %s, %s, "default")""", user)
		connexion_MYSQL.commit()
		## On récupère le mot de passe crypté pour l'enregistrer dans le Cookie avec le login 
		curseur.execute("""SELECT passwd FROM `comptes` WHERE login='{:s}'""".format(form.getvalue("login")))
		rows = curseur.fetchall()
		# On génère le Cookie
		connexion = True
		c["connexion"] = form.getvalue("login") + ' ' + rows[0][0]
		print(c)
		print('Location: index.py')
		texte_inscription = ""
		
	html = """<head><meta charset="utf-8" />
	<link rel="stylesheet" href="../style.css" />
			<title>Inscription</title>
			</head>
			<body>
			{:s}
			</body>
			</html>
	""".format(texte_inscription)
## Demande de connexion
elif (os.getenv("QUERY_STRING","") == 'connexion'):
	html = """<head><meta charset="utf-8" />
	<link rel="stylesheet" href="../style.css" />
			<title>Connexion</title>
			</head>
			<body>
			<form method="post" action="index.py">
					<h1>Connexion</h1>
					<p>
					<input type="text" name="login" id="login" placeholder="login" size="30" maxlength="30"/></p>
					<p>
					<input type="password" name="password" id="password" placeholder="Mot de passe" size="30" maxlength="30"/></p>
					<p>
					<INPUT TYPE="submit" NAME="connexion" VALUE="Connexion">
			</body>
			</html>
	"""

## Validation de connexion
elif (form.getvalue('connexion') == "Connexion"):
	try:
		curseur.execute("""SELECT passwd, nom, prenom FROM `comptes` WHERE login='{:s}'""".format(form.getvalue("login")))
		rows = curseur.fetchall()
		retour = "<div id='bas'><a href='index.py?connexion'>Retour à la page de connexion</a></div>"
		if rows == []:
			texte = "<h1 class='red'>Identifiant incorrect. Veuillez réessayer.</h1>"
			texte += retour
		else:
			passwd = rows[0][0]
			nom = rows[0][1]
			prenom = rows[0][2]
			curseur.execute("""SELECT * FROM comptes WHERE login = '{:s}' AND passwd=PASSWORD('{:s}')""".format(form.getvalue("login"), form.getvalue("password")))
			rows = curseur.fetchall()
			if rows == []:
				texte = "<h1 class='red'>Mot de passe incorrect. Veuillez réessayer.</h1>"
				texte += retour
			else:
				c["connexion"] = form.getvalue("login") + ' ' + passwd
				connexion = True
				print(c)
				print('Location: index.py')
				texte = ""
	except:
		texte = "<h1 class='red'>Une erreur s'est produite</h1>"
		texte += "<div id='bas'><a href='index.py?connexion'>Retour à la page de connexion</a></div>"

	
	html = """<head><meta charset="utf-8" />
	<link rel="stylesheet" href="../style.css" />
			<title>Connexion</title>
			</head>
			<body>
			{:s}
			</body>
			</html>
	""".format(texte)

################################################################
## Test de la présence d'un Cookie et récupération des données
################################################################
elif not connexion:
	try:
		c.load(os.getenv("HTTP_COOKIE"))
		if c["connexion"]["expires"] != 0:
			try:
				value = c["connexion"].value
				(login, passwd) = value.split(' ')
		
				curseur.execute("""SELECT `passwd`, `nom`, `prenom` FROM `comptes` WHERE login='{:s}'""".format(login))
				rows = curseur.fetchall()
				if rows != []:
					if rows[0][0] == passwd:
						connexion = True
						html = """
					<html>
					<head>
						<meta charset="utf-8" />
						<link rel="stylesheet" href="../style.css" />

					<title>Accueil </title>
					</head>

					<body>
						<p class="blue">Et voilà, {:s} {:s} vous êtes bien connecté.</p>
						<p><a href="scripts/index.py">Vers l'accueil</a></p>
						<div id="bas"><a href='index.py?deconnexion'>Vous déconnecter {:s}</a></div>
					</body>
					</html>
					""".format(rows[0][1],rows[0][2],login)
			except:
				connexion = False
	except:
		connexion = False	
	
	



	

	
	

print("Content-type: text/html; charset=utf-8\n")
print(html)
connexion_MYSQL.close()






