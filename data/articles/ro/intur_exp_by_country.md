---
title: "<%= countryName %>: Venituri obținute din turism"
slug: "<%= country.cca2 %>: Venituri din turism"
headline: "Evoluția veniturilor obținute din turism și % din PIB în <%= countryName %>."
target: country
type: value
categories: [economy]
imageId: 2015/money-coins.jpg
---

<% function measureName(measureValue) {
  return measureValue===1?'milioane':'miliarde';
} %>

În anul <%= values[0].range %> turiștii străini care au vizitat [<%= country.name[lang].official %>](/<%= lang %>/country/<%= country.cca2.toLowerCase() %>) au cheltuit în țară **<%= (values[0].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> de dolari, iar în <%= values[values.length-1].range %> turiștii au adus **<%= (values[values.length-1].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> $.

Sumele de bani cheltuite în <%= countryName %> de turiștii străini conform Organizație Mondiale a Turismului.

### Grafic

<div id="intur_exp-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

În anul <%= boomYear %> a avut loc cea mai mare creștere a veniturilor din turism. Creșterea a fost de **<%= boomPercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= boomYear-1 %>.

<% if(decreaseYear) { %>
În anul <%= decreaseYear %> au scăzut veniturilor obținute din turism cu **<%= decreasePercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% față de anul <%= decreaseYear-1 %>.
<% } %>

### Tabel

<table class="article-table cell-no">
<thead>
  <tr><th>Anul</th><th>Venituri (<%= measureName(measureValue) %> USD)</th><th>% din PIB</th></tr>
</thead>
<tbody>
  <% values.forEach(function(item, index){ %>
  <tr>
  <th><%= item.range %></th>
  <td><%= (item.value/measureValue).toLocaleString(lang, {maximumFractionDigits:3}) %></td>
  <td><% if(item.GDP){ %> <%= ((item.value*1000000/item.GDP)*100).toLocaleString(lang, {maximumFractionDigits:4}) %><% } %></td>
  </tr>
  <% }); %>
</tbody>
</table>

<script>(function(){window.articleCharts=<%= JSON.stringify(charts) %>;})();</script>
