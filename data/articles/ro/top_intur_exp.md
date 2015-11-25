---
title: Țările cu cele mai mari venituri din turism
slug: Top tari dupa veniturile din turism
headline: Top 10 țări cu cele mai mari venituri obținute din turism.
type: top
categories: [economy]
imageId: 2015/100dollar-money.jpg
---

Conform Organizație Mondiale a Turismului, [<%= util.topicName(topCountry.name, lang) %>](/<%= lang %>/country/<%= topCountry.cca2.toLowerCase() %>) este țara cu cele mai mari câștiguri obținute din turism.

<%= util.topicName(topCountry.name, lang) %> a câștigat **<%= (topCountries[0].data.range/1000).toLocaleString(lang, {maximumFractionDigits:2}) %>** miliarde dolari în <%= topCountries[0].data.label %>. A doua țară în top este <%= util.topicName(secondCountry.name, lang) %>, cu o diferență de **<%= top2Diff.toLocaleString(lang,{maximumFractionDigits:2}) %>** miliarde față de prima.

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Venituri (miliarde USD)</th><th>Anul</th></tr></thead>
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

Pe de altă parte, top 10 țări de la coada clasamentului adună împreună doar <%= sumLast10.toLocaleString(lang,{maximumFractionDigits:2}) %> milioane USD anual.

Țările cu cele mai mici câștiguri din turism:

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Țara</th><th>Câștig (milioane USD)</th><th>Anul</th></tr></thead>
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
