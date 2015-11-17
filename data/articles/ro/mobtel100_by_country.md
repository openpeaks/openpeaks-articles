---
title: "<%= country.name.ro.common || country.name.ro.official %>: abonamente de telefonie mobilă la 100 locuitori"
slug: "<%= country.cca2 %> abonamente de telefonie mobilă la 100 locuitori"
headline: "În <%= country.name.ro.official %> sunt <%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %> abonamente de telefonie mobilă la 100 locuitori."
target: country
type: value
categories: [development, tech]
imageId: 2015/going-mobile.jpg
---

<%
  var rValues = values.slice().reverse();
  var boomYear = rValues[0].range;
  var boomDiff = 0;
  var boomValue = 0;
  var prevValue = rValues[0].value;
  rValues.forEach(function(item, index){
    var diff = item.value - prevValue;
    if(diff > boomDiff) {
      boomYear = item.range;
      boomDiff = diff;
      boomValue = item.value;
    }
    prevValue = item.value;
}); %>

<%
  var decreaseYear = rValues[0].range;
  var decreaseDiff = 0;
  var decreaseValue = 0;
  var prevValue = rValues[0].value;
  rValues.forEach(function(item, index){
    var diff = item.value - prevValue;
    if(diff < decreaseDiff) {
      decreaseYear = item.range;
      decreaseDiff = diff;
      decreaseValue = item.value;
    }
    prevValue = item.value;
}); %>

<% function getName(name){
return name.ro.common || name.ro.official;
} %>

Evoluția numărului de abonamente de telefonie mobile și celulare la 100 locuitori în <%= getName(country.name) %>.

În anul <%= values[0].range %> în [<%= country.name.ro.official %>](/<%= lang %>/country/<%= country.cca2.toLowerCase() %>) erau **<%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %>** abonamente de telefonie mobilă la 100 locuitori, iar în <%= values[values.length-1].range %> erau doar **<%= (values[values.length-1].value*10).toLocaleString(lang, {maximumFractionDigits:1}) %>** abonamente la **1,000** de oameni.

### Grafic

<div id="mobdel100-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

În anul <%= boomYear %> a avut loc cea mai mare creștere a numărului de abonamente. Creșterea a fost de **<%= ((boomDiff/boomValue)*100).toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= boomYear-1 %>.

<% if(decreaseDiff<0) { %>
În anul <%= decreaseYear %> a scăzut numărul de abonamente cu **<%= ((decreaseDiff/decreaseValue)*100).toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= decreaseYear-1 %>.
<% } %>
### Table

<table class="article-table cell-no">
<thead>
  <tr><th>Anul</th><th>Abonamente</th></tr>
</thead>
<tbody>
  <% values.forEach(function(item, index){ %>
  <tr>
  <th><%= item.range %></th>
  <td><%= item.value.toLocaleString(lang, {maximumFractionDigits:3}) %></td>
  </tr>
  <% }); %>
</tbody>
</table>

<script>
(function(){
  var charts = window.articleCharts = [];
  charts.push({
    selector: '#mobdel100-chart-<%= country.cca2 %>',
    type: 'line',
    data: {
      labels: <%= JSON.stringify(util._.pluck(rValues, 'range')) %>,
      series: [<%= JSON.stringify(util._.pluck(rValues, 'value').map(function(value){return Number(value.toFixed(2));})) %>]
    }
  });
})();
</script>
