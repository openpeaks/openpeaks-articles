---
title: Cele mai vizitate țări din lume
slug: Cele mai vizitate țări din lume
type: top
categories: [society]
headline: Top cele mai vizitate țări din lume după numărul de turiști.
imageId: 2015/tourists-in-paris.jpg
---

Top cele mai vizitate țări din lume după numărul de turiști conform Organizație Mondiale a Turismului.

În fruntea clasamentului se situează [<%= util.topicName(topCountry.name, lang) %>](/<%=lang%>/country/<%= topCountry.cca2.toLowerCase() %>) cu **<%= (topCountries[0].data.range/1000).toLocaleString(lang, {maximumFractionDigits:2}) %>** milioane de turiști primiți în <%= topCountries[0].data.label %>. A doua cea mai vizitată țară din lume este <%= util.topicName(secondCountry.name, lang) %>, cu o diferență de **<%= top2Diff.toLocaleString(lang,{maximumFractionDigits:2}) %>** mil. turiști față de prima.

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Turiști (milioane)</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/<%= lang %>/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= (item.data.range/1000).toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

Pe de altă parte, top 10 țări de la coada clasamentului adună împreună doar <%= sumLast10.toLocaleString(lang,{maximumFractionDigits:2}) %> mii de turiști anual.

Țările cel mai puțin atractive pentru turiști sunt:

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Turiști (**mii**)</th><th>Anul</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/<%= lang %>/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= (item.data.range).toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

