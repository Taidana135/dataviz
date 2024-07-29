
<link rel="stylesheet" href="/css/Page_Catalogue.css">
<a href="/">retour</a>

<section id="section_general">
<!-- Page Catalogue, Faire plusieurs page pour le background -->
<div>
    <span id="page"> Page 1 Sur 6</span>
    <button id="bouton" class="bouton_page">Page Suivante </button>
</div><br/>

<script>
    document.getElementById("bouton").addEventListener("click", function() {
        window.location.href = "http://mvcsae301/Honkai2"; // l'URL de la page suivante
    });
</script>

<?php
$ids_a_afficher = [1, 2, 3, 4, 5, 6, 7, 8]; // Remplacez par les ids a afficher
 foreach($honkai as $honkai): 
    if (in_array($honkai['id'], $ids_a_afficher)) :
 ?>

	<section id="section01" style='background-image:url("<?= $honkai['lien_img'] ?>");'>
        <div id="orientation01">        
            <h2><?= $honkai['nom'] ?> </h2>

            <p id="desc1">
            <?= $honkai['desc1'] ?>
            </p><br/>

        </div>
        <div id="orientation02">
            <p id="desc2">
            <?= $honkai['desc2'] ?>
            </p>
        </div>
    </section>

<?php 
endif;
endforeach;
?>

</section>

