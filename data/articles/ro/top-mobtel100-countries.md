---
model: top_mobtel_per_100
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
slug: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
---

<h2>Țările cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor</h2>

<p>Țara cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor este <strong><%= topCountries[0].topic.name.ro %></strong> cu <%= topCountries[0].data.range/100 %> pe cap de locuitor.</p>

<p class="details"><span>Date:</span> <span>azi</span></p>

<table class="">
<thead><tr><th>Nr.</th><th>Tara</th><th>Value</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td><%= item.topic.name.ro %></td>
<td><%= item.data.range %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

<h3>Țările cu cele mai puține abonamente de telefonie mobilă pe cap de locuitor sunt:</h3>

<table class="">
<thead><tr><th>Tara</th><th>Value</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item){ %>
<tr><td><%= item.topic.name.ro %></td><td><%= item.data.range %></td></tr>
<% }); %>
</tbody>
</table>
