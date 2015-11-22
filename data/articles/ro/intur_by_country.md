---
title: "Evoluția numărului de turiști pentru <%= countryName %>"
slug: "<%= country.cca2 %> evoluția numărului de turiști"
headline: "În <%= values[0].range %> <%= country.name[lang].official %> a fost vizitată de <%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %> turiști străini."
target: country
type: value
categories: [society]
imageId: 2015/bali-like-chart.jpg
---

<% function measureName(measureValue) {
  return measureValue===1?'mii':'milioane';
} %>

Evoluția numărului de turiști străini care viziteată <%= countryName %> conform Organizație Mondiale a Turismului.

În anul <%= values[0].range %> [<%= country.name[lang].official %>](/<%= lang %>/country/<%= country.cca2.toLowerCase() %>) a fost vizitată de **<%= (values[0].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> de turiști străini, iar în <%= values[values.length-1].range %> au vizitat țara **<%= (values[values.length-1].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> turiști.

### Grafic

<div id="intur-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

În anul <%= boomYear %> a avut loc cea mai mare creștere a numărului de turiști. Creșterea a fost de **<%= boomPercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= boomYear-1 %>.

<% if(decreaseYear) { %>
În anul <%= decreaseYear %> a scăzut numărul de turiști cu **<%= decreasePercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= decreaseYear-1 %>.
<% } %>

### Tabel

<table class="article-table cell-no">
<thead>
  <tr><th>Anul</th><th>Turiști (<%= measureName(measureValue) %>)</th></tr>
</thead>
<tbody>
  <% values.forEach(function(item, index){ %>
  <tr>
  <th><%= item.range %></th>
  <td><%= (item.value/measureValue).toLocaleString(lang, {maximumFractionDigits:3}) %></td>
  </tr>
  <% }); %>
</tbody>
</table>

<script>(function(){window.articleCharts=<%= JSON.stringify(charts) %>;})();</script>
