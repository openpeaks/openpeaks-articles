---
model: mobtel_per_100
title: "<%= country.name.ro %>: abonamente de telefonie mobilă la 100 locuitori"
slug: "<%= country.cca2 %> abonamente de telefonie mobilă la 100 locuitori"
target: country
---

Evoluția numărului de abonamente de telefonie mobile și celulare la 100 locuitori în <%= country.name.ro %>.

<table class="">
<thead><tr><th>Anul</th><th>Valoare</th></tr></thead>
<tbody>
<% values.forEach(function(item, index){ %>
<tr>
<td><%= item.range %></td>
<td><%= item.value %></td>
</tr>
<% }); %>
</tbody>
</table>
