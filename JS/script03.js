const tableau01 = [];
// mise en place des filtre pour obtenir les données
data.forEach(item => {
  if (
    item["Niveau d'éducation"] === "Tous les niveaux d'enseignement" &&
    item["Urbanisation"] === "National" &&
    item["Profession"] === "Toutes les professions" &&
    item["Ventilation composite"] === "N'est pas applicable" &&
    item["Indicateur"] === "Proportion de femmes occupant des postes de direction" &&
    item.OBS_VALUE !== undefined &&
    item.TIME_PERIOD >= 2013 &&
    item.TIME_PERIOD <= 2021
  ) {
    // mets dans le tableau
    tableau01.push({
      pays: item["Pays et territoires insulaires du Pacifique"],
      valeur: item.OBS_VALUE,
      annee: item.TIME_PERIOD
    });
  }
});


// console.log("Données filtrées :", tableau01);

am5.ready(function() {
  
    // --- Regroupe les données par pays et années ---
    const groupedData = {};
    tableau01.forEach(item => {
      if (!groupedData[item.annee]) {
        groupedData[item.annee] = [];
      }
      groupedData[item.annee].push({
        category: item.pays,
        value: item.valeur
      });
    });
  
    // === Création du radar chart ===
    // graphique AmChart
    var root = am5.Root.new("chartdiv03");
  
    root.setThemes([am5themes_Animated.new(root)]);
  
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        innerRadius: am5.percent(40),
        layout: root.verticalLayout
      })
    );
  
    var xRenderer = am5radar.AxisRendererCircular.new(root, {});
    xRenderer.labels.template.setAll({
      textType: "adjusted"
    });
  
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );
  
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5radar.AxisRendererRadial.new(root, {})
      })
    );
  
    // --- Créer une série pour chaque année ---
    const annees = Object.keys(groupedData).sort();
  
    annees.forEach((annee, index) => {
      const series = chart.series.push(
        am5radar.RadarColumnSeries.new(root, {
          name: annee,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
          stacked: false
        })
      );
  
      series.columns.template.setAll({
        tooltipText: "{name} ({categoryX}) : {valueY}%",
        width: am5.percent(100)
      });
  
      series.data.setAll(groupedData[annee]);
      series.appear(1000);
  
      // Ajout dans la légende si nécessaire
      // legend.data.push(series);
    });
  
    // Définir les catégories (pays)
    const allCategories = [...new Set(tableau01.map(d => d.pays))];
    xAxis.data.setAll(allCategories.map(c => ({ category: c })));
  
    // Slider pour modifier l'angle de vue
    var slider = chart.children.push(
      am5.Slider.new(root, {
        orientation: "horizontal",
        start: 0.5,
        width: am5.percent(60),
        centerY: am5.p50,
        centerX: am5.p50,
        x: am5.p50
      })
    );
  
    slider.events.on("rangechanged", function () {
      var start = slider.get("start");
      var startAngle = 270 - start * 179 - 1;
      var endAngle = 270 + start * 179 + 1;
  
      chart.setAll({ startAngle: startAngle, endAngle: endAngle });
      yAxis.get("renderer").set("axisAngle", startAngle);
    });
  
    chart.appear(1000, 100);
  });