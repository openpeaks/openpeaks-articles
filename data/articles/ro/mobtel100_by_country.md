---
title: "<%= countryName %>: abonamente de telefonie mobilă la 100 locuitori"
slug: "<%= country.cca2 %> abonamente de telefonie mobilă la 100 locuitori"
headline: "În <%= country.name[lang].official %> sunt <%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %> abonamente de telefonie mobilă la 100 locuitori."
target: country
type: value
categories: [development, tech]
imageId: 2015/going-mobile.jpg
---

Evoluția numărului de abonamente de telefonie mobile și celulare la 100 locuitori în <%= countryName %>.

În anul <%= values[0].range %> în [<%= country.name[lang].official %>](/<%= lang %>/country/<%= country.cca2.toLowerCase() %>) erau **<%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %>** abonamente de telefonie mobilă la 100 locuitori, iar în <%= values[values.length-1].range %> erau doar **<%= (values[values.length-1].value*10).toLocaleString(lang, {maximumFractionDigits:1}) %>** abonamente la **1,000** de oameni.

### Grafic

<div id="mobdel100-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

În anul <%= boomYear %> a avut loc cea mai mare creștere a numărului de abonamente. Creșterea a fost de **<%= boomPercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= boomYear-1 %>.

<% if(decreaseYear) { %>
În anul <%= decreaseYear %> a scăzut numărul de abonamente cu **<%= decreasePercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= decreaseYear-1 %>.
<% } %>

### Tabel

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

<script>(function(){window.articleCharts = <%= JSON.stringify(charts) %>;})();</script>
