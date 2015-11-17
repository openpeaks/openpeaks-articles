---
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
slug: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
type: top
categories: [development, tech]
headline: Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor
imageId: 2015/a5520551e361a65a8ee0fc1b470015f.jpg
---

<% function getName(name){
return name.ro.common || name.ro.official;
} %>

Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor.

Țara cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor este <a href="/country/<%= topCountries[0].topic.cca2.toLowerCase() %>"><strong><%= getName(topCountries[0].topic.name) %></strong></a> cu <%= (topCountries[0].data.range/100).toLocaleString(lang,{maximumFractionDigits:2}) %> pe cap de locuitor.

<table class="article-table cell-no">
<thead><tr><th>Nr.</th><th class="cell-txt">Tara</th><th>Value</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt"><a href="/country/<%= item.topic.cca2.toLowerCase() %>"><%= getName(item.topic.name) %></a></td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

### Țările cu cele mai puține abonamente de telefonie mobilă pe cap de locuitor sunt:

<table class="article-table cell-no">
<thead><tr><th>Nr.</th><th class="cell-txt">Tara</th><th>Value</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt"><%= getName(item.topic.name) %></td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>
