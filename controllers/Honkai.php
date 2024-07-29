<?php

namespace controllers;
class Honkai extends \app\Controller{
/**
* Méthode permettant d'afficher un article à partir de son slug
*
* @param string $slug
* @return void
*/
public function index(){
    
     // On instancie le modèle "Articles"
    $this->loadModel('Honkai');

    // On stocke la liste des articles dans $articles
    $honkai = $this->Honkai->getAll();

    // On affiche les données
    // var_dump($articles);

    // On envoie les données à la vue index
    $this->render('index', compact('honkai'));
    }

public function lire(string $slug){

    // On instancie le modèle "Article"
    $this->loadModel('Honkai');

    // On stocke l'article dans $article
    $honkai = $this->Honkai->findBySlug($slug);

    // On envoie les données à la vue index
    $this->render('index', compact('honkai'));
    }

}
?>