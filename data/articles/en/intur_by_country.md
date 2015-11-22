---
title: "Evolution of the number of tourists for <%= countryName %>"
slug: "<%= country.cca2 %>: Evolution of the number of tourists"
headline: "Evolution of the annual number of foreign tourists visiting <%= countryName %> according to the World Tourism Organization."
target: country
type: value
categories: [society]
imageId: 2015/bali-like-chart.jpg
---

<% function measureName(measureValue) {
  return measureValue===1?'th':'millions';
} %>

In <%= values[0].range %> [<%= countryName %>](/country/<%= country.cca2.toLowerCase() %>) was visited by **<%= (values[0].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> foreign tourists, and in <%= values[values.length-1].range %>, **<%= (values[values.length-1].value/measureValue).toLocaleString(lang, {maximumFractionDigits:2}) %>** <%= measureName(measureValue) %> visited the country.

Evolution of the annual number of foreign tourists visiting <%= countryName %> according to the World Tourism Organization.

### Graph

<div id="intur-chart-<%= country.cca2 %>" class="article-chart chart-line"></div>

In <%= boomYear %> the largest increase occurred in the number of tourists. The increase was **<%= boomPercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% compared to <%= boomYear-1 %>.

<% if(decreaseYear) { %>
In <%= decreaseYear %> the number of tourists dropped by **<%= decreasePercent.toLocaleString(lang, {maximumFractionDigits:2}) %>**% compared to <%= decreaseYear-1 %>.
<% } %>

### Table

<table class="article-table cell-no">
<thead>
  <tr><th>Year</th><th>Tourists (<%= measureName(measureValue) %>)</th></tr>
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
