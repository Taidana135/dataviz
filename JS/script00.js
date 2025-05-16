am5.ready(function() {

    // Root element
    var root = am5.Root.new("chartdiv00");
  
    // Themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
  
    // Pie Chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );
  
    // Series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      })
    );
  
    series.data.setAll([
      {
        category: "Femmes",
        value: 3932647000,
        fill: am5.color(0xff69b4)
        // couleur ne marche pas ici
      },
      {
        category: "Hommes",
        value: 3976648000,
        fill: am5.color(0x1f77b4)
        // couleur ne marche pas ici
      }
    // chiffre population mondiale 2021
    ]);
  
    // Appliquer les couleurs personnalisées
    series.slices.template.adapters.add("fill", function(fill, target) {
      return target.dataItem.dataContext.fill;
    });
  
    // Tooltip
    series.slices.template.setAll({
      tooltipText: "{category}: [bold]{value.formatNumber('#,###,###')}[/]"
    });
  
    // Apparition
    series.appear(1000, 100);
  
  });
  