---
title: Countries with the most cell phone subscriptions per 100 inhabitants
slug: Countries with the most cell phone subscriptions per 100 inhabitants
type: top
categories: [development, tech]
headline: Top countries by the number of mobile phone subscriptions per 100 inhabitants.
imageId: 2015/phones-flower.jpg
---

The most cell phone saturated country is [**<%= util.topicName(topCountry.name, lang) %>**](/country/<%= topCountry.cca2.toLowerCase() %>) with <%= topCountries[0].data.range.toLocaleString(lang,{maximumFractionDigits:2}) %> subscriptions per 100 inhabitants.

Top countries by the number of mobile phone subscriptions per 100 inhabitants:

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Country</th><th>Subscriptions</th><th>Year</th></tr></thead>
<tbody>
<% topCountries.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>

On the other hand, countries with the fewest mobile phone subscriptions per 100 inhabitants are:

<table class="article-table cell-no">
<thead><tr><th>#</th><th class="cell-txt">Country</th><th>Subscriptions</th><th>Year</th></tr></thead>
<tbody>
<% topCountries2.forEach(function(item, index){ %>
<tr>
<th><%= index+1 %></th>
<td class="cell-txt">[<%= util.topicName(item.topic.name, lang) %>](/country/<%= item.topic.cca2.toLowerCase() %>)</td>
<td><%= item.data.range.toLocaleString(lang,{maximumFractionDigits:2}) %></td>
<td><%= item.data.label %></td>
</tr>
<% }); %>
</tbody>
</table>
