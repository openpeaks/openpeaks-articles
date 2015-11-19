---
title: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
slug: Țările cu cele mai multe abonamente de telefonie mobilă la 100 locuitori
type: top
categories: [development, tech]
headline: Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor.
imageId: 2015/phones-flower.jpg
---

Top țări cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor.

Țara cu cele mai multe abonamente de telefonie mobilă pe cap de locuitor este [**<%= util.topicName(topCountry.name, lang) %>**](/<%= lang %>/country/<%= topCountry.cca2.toLowerCase() %>) cu <%= (topCountries[0].data.range/100).toLocaleString(lang,{maximumFractionDigits:2}) %> abonamente pe cap de locuitor.

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Abonamete</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/<%= lang %>/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

Pe de altă parte, țările cu cele mai puține abonamente de telefonie mobilă la 100 locuitor sunt:

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Abonamete</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/<%= lang %>/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>
