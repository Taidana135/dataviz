
<body>
<!-- <img src="/Images/logo_dataviz.webp" id="logo"> -->
    <div class="container">
        <h2>Pacific Dataviz Challenge 2024</h2>
        <p>
        Ce jeu de données regroupe des données 
        relatives aux personnes en recherche d'emploi inscrites 
        auprès d'un service de placement en Nouvelle-Calédonie.
        </p><br/>
        <p>
        ATTENTION : les données utilisés dans les graphiques 
        ne filtre pas sur les années, 
        de plus si certaines données ne sont pas visible, 
        comme "autres" dans le premier graphique, 
        cela est simplement que le nombre est trop petit pour être affiché, 
        mais reste pertinent à connaître.
        </p>

    </div><br/>
    <div class="container">
        <div class="chart">
            <h2 class="chart-title">Graphique Homme ou Femme</h2>
            <p class="chart-description">
            Voici ci-dessous, un graphique représentant le taux d'hommes
            et de femmes en NC recherchant un emploi, avec autres pour ceux qui sont pas défini.
            </p>
            <div id="pie" style="width: 49%; display: inline-block;"></div>
        </div>

        <div class="chart">
            <h2 class="chart-title">Graphique Année de Naissance Homme</h2>
            <p class="chart-description">
            Voici ci-dessous, un graphique qui démontre les 
            années de naissance des demandeurs d'emplois
            (regroupé en paquet de 10 pour plus de visibilité),
            filtré par genre, des hommes dans ce cas-ci.
            </p>
            <div id="pie2" style="width: 49%; display: inline-block;"></div>
        </div>

        <div class="chart">
            <h2 class="chart-title">Graphique Année de Naissance Femme</h2>
            <p class="chart-description">
            Voici ci-dessous, un graphique qui démontre les 
            années de naissance des demandeurs d'emplois
            (regroupé en paquet de 10 pour plus de visibilité),
            filtré par genre, des femmes dans ce cas-ci.
            </p>
            <div id="pie3" style="width: 49%; display: inline-block;"></div>
        </div>

        <div class="chart">
            <h2 class="chart-title">Graphique des Nationalité</h2>
            <p class="chart-description">
            Voici ci-dessous, un graphique en colonne, permettant de savoir
            les nationalités des demandeurs d'emplois en NC.
            </p>
            <div id="pie4" style="width: 49%; display: inline-block;"></div>
        </div>

        <div class="chart">
            <h2 class="chart-title">Graphique des Statut Familial</h2>
            <p class="chart-description">
            Voici ci-dessous, un graphique en barre, montrant les différents
            statut familial des demandeurs d'emplois en NC.
            </p>
            <div id="pie5" style="width: 49%; display: inline-block;"></div>
        </div>

        <div class="chart">
            <h2 class="chart-title">Graphique Permis de Conduire</h2>
            <p class="chart-description">
            Enfin, voici ci-dessous, un graphique qui informe si
            un demandeur d'emploi possède le permis de conduire.
            </p>
            <div id="pie6" style="width: 49%; display: inline-block;"></div>
        </div>

        <!-- plus de graphiques si besoin -->
    </div>

    <!-- premier partie -->
    <!-- les genres note : homme / femme / autre-->
    <!-- suite avec annee naissance note : regroupe en 10 -->
    <!-- suite avec lieu naissance note : bcp trop-->

    <!-- deuxieme partie-->
    <!-- les nationalite note : graphique plus petit sans raison-->
    <!-- suite avec statut familial note : en donut-->
    <!-- suite avec nombre d'enfant note : inutile sans contexte-->

    <!-- troisieme partie-->
    <!-- si une personne a le permis / code note : en true ou false -->
    <!-- suite avec niveau d'etude note :  pas le temps-->
    <!-- suite avec ? -->


<?php 
// premier graphique demande 1
    $genres = array_map(function($elem) {
        return $elem['Genre'];
    }, $main['demande1']);

    $nbs = array_map(function($elem) {
        return $elem['nb'];
    }, $main['demande1']);
// fin premier graphique demande 1

// deuxieme graphique demande 2_1
    $annees1 = array_map(function($elem) {
        return $elem['CEILING(Annee_naissance/10)*10'];
    }, $main['demande2']);

    $annees_nb1 = array_map(function($elem) {
        return $elem['nb'];
    }, $main['demande2']);
// fin deuxieme graphique demande 2_1
// troisieme graphique demande 2_2
    $annees2 = array_map(function($elem) {
        return $elem['CEILING(Annee_naissance/10)*10'];
    }, $main['demande3']);

    $annees_nb2 = array_map(function($elem) {
        return $elem['nb'];
    }, $main['demande3']);
// fin troisieme graphique demande 2_2
// quatrieme graphique demande 3
    $nationalite = array_map(function($elem) {
        return $elem['Nationalite'];
    }, $main['demande4']);

    $nation_nb = array_map(function($elem) {
        return $elem['nb'];
    }, $main['demande4']);
// fin quatrieme graphique demande 3
// cinquieme graphique demande 4
$statut = array_map(function($elem) {
    return $elem['Statut_familial'];
}, $main['demande5']);

$statut_nb = array_map(function($elem) {
    return $elem['nb'];
}, $main['demande5']);
// fin cinquieme graphique demande 4
// sixieme graphique demande 5
$permis = array_map(function($elem) {
    return $elem['permis_possede_code'];
}, $main['demande6']);

$permis_nb = array_map(function($elem) {
    return $elem['nb'];
}, $main['demande6']);
// fin sixieme graphique demande 5
?>
    
    <script src="/Graphique/dist/apexcharts.min.js"></script>
    <script src="/JS/donnees2.js"></script>
    <script src="/JS/reduces.js"></script>
    <script src="/JS/filtres.js"></script>

    <script><?= "let cles1=[\"".implode('","',$genres)."\"];" ?></script>
    <script><?= "let valeurs1=[".implode(',',$nbs)."];" ?></script>

    <script><?= "let cles2=[\"".implode('","',$annees1)."\"];" ?></script>
    <script><?= "let valeurs2=[".implode(',',$annees_nb1)."];" ?></script>

    <script><?= "let cles3=[\"".implode('","',$annees2)."\"];" ?></script>
    <script><?= "let valeurs3=[".implode(',',$annees_nb2)."];" ?></script>

    
    <script><?= "let cles4=[\"".implode('","',$nationalite)."\"];" ?></script>
    <script><?= "let valeurs4=[".implode(',',$nation_nb)."];" ?></script>

    <script><?= "let cles5=[\"".implode('","',$statut)."\"];" ?></script>
    <script><?= "let valeurs5=[".implode(',',$statut_nb)."];" ?></script>

    <script><?= "let cles6=[\"".implode('","',$permis)."\"];" ?></script>
    <script><?= "let valeurs6=[".implode(',',$permis_nb)."];" ?></script>

    <script src="/JS/graphique.js"></script>

</body>