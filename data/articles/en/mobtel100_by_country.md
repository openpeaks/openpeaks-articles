---
title: "<%= countryName %>: mobile-cellular subscriptions (per 100 people)"
slug: "<%= country.cca2 %>: Mobile-cellular subscriptions per 100 inhabitants"
headline: "The evolution of mobile-cellular subscriptions per 100 inhabitants in the <%= country.name.official %>."
target: country
type: value
categories: [development, tech]
imageId: 2015/going-mobile.jpg
---

In <%= values[0].range %> in [<%= country.name.official %>](/country/<%= country.cca2.toLowerCase() %>) there were **<%= values[0].value.toLocaleString(lang, {maximumFractionDigits:2}) %>** mobile-cellular subscriptions per 100 inhabitants, while in <%= values[values.length-1].range %> there where only **<%= (values[values.length-1].value*10).toLocaleString(lang, {maximumFractionDigits:1}) %>** subscriptions per **1000** people.

The evolution of mobile-cellular subscriptions per 100 inhabitants in the <%= country.name.official %>.

### Graph

<div id="mobdel100-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

In <%= boomYear %> it held the largest increase in subscriptions. The increase was **<%= boomPercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% compared to <%= boomYear-1 %>.

<% if(decreaseYear) { %>
In <%= decreaseYear %> the number of subscriptions decreased by **<%= decreasePercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% compared to <%= decreaseYear-1 %>.
<% } %>

### Table

<table class="article-table cell-no">
<thead>
  <tr><th>Year</th><th>Subscriptions (per 100)</th></tr>
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
