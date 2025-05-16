import { data } from './Donnees/graphique01.js';

// graphique AmChart
am5.ready(function() {

    // Créer un élément racine
    var root = am5.Root.new("chartdiv01");

    var myTheme = am5.Theme.new(root);

    // Règles de style pour les polygones
    myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth0"]).setAll({
      strokeOpacity: 0,
      fillOpacity: 0
    });

    myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth1"]).setAll({
      strokeWidth: 5,
      fillOpacity: 1,
      stroke: am5.color(0x000000)
    });

    myTheme.rule("Polygon", ["hierarchy", "node", "shape", "depth2"]).setAll({
      fillOpacity: 0,
      strokeWidth: 1,
      stroke: am5.color(0x000000)
    });

    myTheme.rule("HierarchyNode", ["last"]).setAll({
      cursorOverStyle: "pointer"
    });

    myTheme.rule("Label", ["node"]).setAll({
      fontSize: 11,
      minScale: 0.7
    });

    myTheme.rule("Label", ["node", "depth0"]).setAll({
      forceHidden: true
    });

    myTheme.rule("Label", ["node", "depth1"]).setAll({
      forceHidden: true
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);

    var zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true
      })
    );

    var zoomTools = zoomableContainer.children.push(am5.ZoomTools.new(root, {
      target: zoomableContainer
    }));

    // Créer la série
    var series = zoomableContainer.contents.children.push(am5hierarchy.VoronoiTreemap.new(root, {
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5,
      singleBranchOnly: false,
      downDepth: 2,
      upDepth: 0,
      initialDepth: 3,
      valueField: "population",
      categoryField: "name",
      childDataField: "children",
      idField: "name",
      type: "polygon",
      cornerCount: 120
    }));

    // Application des couleurs de chaque pays
    series.nodes.template.adapters.add("fill", function (fill, target) {
      var dataContext = target.dataItem.dataContext;
      if (dataContext && dataContext.color) {
        return am5.color(dataContext.color); // Applique la couleur spécifiée dans les données
      }
      else {
        return fill; // Si pas de couleur définie, la couleur par défaut est utilisée
      }
    });

    // Adapter le texte en fonction de la taille du polygone
    series.labels.template.adapters.add("x", function (x, target) {
      var dataItem = target.dataItem;
      if (dataItem) {
        var polygon = dataItem.get("polygon");
        if (polygon) {
          var minX = polygon.getPrivate("minX", 0);
          var maxX = polygon.getPrivate("maxX", 0);
          var dataContext = dataItem.dataContext;

          if (dataContext) {
            if (maxX - minX < 50) {
              target.set("text", dataContext.id);
            }
            else {
              target.set("text", dataContext.name);
            }
          }
        }
      }
      return x;
    });

    // Sélectionner un pays lorsqu'il est cliqué
    series.nodes.template.events.on("click", function (e) {
      var dataItem = e.target.dataItem;
      if (dataItem) {
        if (!dataItem.get("children")) {
          series.selectDataItem(dataItem.get("parent"));
        }
      }
    });

    // Définir les données
    series.data.setAll([data]);

    // Sélectionner le noeud racine
    series.set("selectedDataItem", series.dataItems[0]);

    // Animation du graphique
    series.appear(1000, 100);

}); // end am5.ready()
