<?php

// On définit le chemin absolu vers la racine du site
// pour garantir l'inclusion des fichiers nécessaires
// require_once des Contrôleurs, Modèles, Vues, ...

define('ROOT', str_replace('index.php','',$_SERVER['SCRIPT_FILENAME']));

// Inclusion des classes de base nécessaires aux modèles et aux contrôleurs
require_once(ROOT.'app/Model.php');
require_once(ROOT.'app/Controller.php');


// On sépare les paramètres et on les met dans le tableau $params
$params = explode('/', $_GET['p']);


// Si au moins 1 paramètre existe
if($params[0] != ""){

    // On sauvegarde le 1er paramètre dans $controller en mettant sa 1ère lettre en majuscule
    $controller = "\\controllers\\".ucfirst($params[0]);

    // On sauvegarde le 2ème paramètre dans $action si il existe, sinon index
    $action = isset($params[1]) ? $params[1] : 'index';

    if(file_exists(ROOT.str_replace('\\', DIRECTORY_SEPARATOR, $controller).'.php')) {
        // On appelle le contrôleur
        require_once(ROOT.str_replace('\\', DIRECTORY_SEPARATOR, $controller).'.php');

        // On instancie le contrôleur
        $controller = new $controller();
        // On appelle la méthode fournie dans l’URL
        //$controller->$action();

        if(method_exists($controller, $action)){
            // On supprime les 2 premiers paramètres
            unset($params[0]);
            unset($params[1]);

            // On appelle la méthode $action du contrôleur $controller
            call_user_func_array([$controller,$action], $params);
            
        } else {

            // On envoie le code réponse 404
            http_response_code(404);
            echo "La page recherchée n'existe pas";
        }

    } else {

        // On envoie le code réponse 404
        http_response_code(404);
        echo "La page recherchée n'existe pas";
        }
}
else {
    // Ici aucun paramètre n'est défini

    // On appelle le contrôleur par défaut
    require_once(ROOT.'controllers/Main.php');

    // On instancie le contrôleur
    $controller = new \controllers\Main();

    // On appelle la méthode index
    $controller->index();
}

// PAGES A REVOIR : PAGE 16, PAGE17, PAGE19, PAGE30, PAGE35, PAGE36, PAGE42, PAGE45-46,
// PAGE49-50, PAGE51, PAGE52-53, PAGE61-62, 
?>

