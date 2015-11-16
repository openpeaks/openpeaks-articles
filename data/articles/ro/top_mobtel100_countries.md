---
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
slug: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
type: top
categories: [development, tech]
headline: Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor
---

<% function getName(name){
return name.ro.common || name.ro.official;
} %>

Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor.

Țara cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor este <a href="/country/<%= topCountries[0].topic.cca2.toLowerCase() %>"><strong><%= getName(topCountries[0].topic.name) %></strong></a> cu <%= util.numberToString((topCountries[0].data.range/100), 2, lang) %> pe cap de locuitor.

<table class="article-table cell-no">
<thead><tr><th>Nr.</th><th class="cell-txt">Tara</th><th>Value</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt"><a href="/country/<%= item.topic.cca2.toLowerCase() %>"><%= getName(item.topic.name) %></a></td>
<td><%= util.numberToString(item.data.range,2,lang) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

<h3>Țările cu cele mai puține abonamente de telefonie mobilă pe cap de locuitor sunt:</h3>

<table class="article-table cell-no">
<thead><tr><th>Nr.</th><th class="cell-txt">Tara</th><th>Value</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt"><%= getName(item.topic.name) %></td>
<td><%= util.numberToString(item.data.range,2,lang) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>
