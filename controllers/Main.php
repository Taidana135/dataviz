<?php

namespace controllers;
class Main extends \app\Controller{
    /**
    * Cette méthode affiche la liste des articles
    *
    * @return void
    */
    public function index(){
        // On instancie le modèle "Articles"
        $this->loadModel('demandeurs_emploi2');

        // On stocke la liste des articles dans $articles
        $demandeur_emploi2_demande1 = $this->demandeurs_emploi2->get_genres();
        $demandeur_emploi2_demande2_1 = $this->demandeurs_emploi2->get_annees_homme();
        $demandeur_emploi2_demande2_2 = $this->demandeurs_emploi2->get_annees_femme();
        $demandeur_emploi2_demande3 = $this->demandeurs_emploi2->get_nationalite();
        $demandeur_emploi2_demande4 = $this->demandeurs_emploi2->get_statut_familial();
        $demandeur_emploi2_demande5 = $this->demandeurs_emploi2->get_permis();
        // On garde la structure avec une variable $main pour anticiper un éventuel besoin
        $main = array();
        $main["demande1"] = $demandeur_emploi2_demande1;
        $main["demande2"] = $demandeur_emploi2_demande2_1;
        $main["demande3"] = $demandeur_emploi2_demande2_2;
        $main["demande4"] = $demandeur_emploi2_demande3;
        $main["demande5"] = $demandeur_emploi2_demande4;
        $main["demande6"] = $demandeur_emploi2_demande5;
        // On envoie les données à la vue index
        $this->render('index', compact('main'));
        
        // On affiche les données
        // var_dump($articles);
    }
    public function lire(string $slug){

        // On instancie le modèle "Article"
        $this->loadModel('demandeurs_emploi2');
    
        // On stocke l'article dans $article
        $demandeur_emploi2 = $this->demandeurs_emploi2->findBySlug($slug);
    
        // On envoie les données à la vue index
        $this->render('index', compact('main'));
    }
    
}


?>
