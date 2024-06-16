---
layout: page
title: 论文
icon: paperclip
---

<!-- This page provides the sidebar links for mobile, where the sidebar is hidden -->
<!-- after group_by or group_by_exp, item.name indicates the key and item.items indicates the group content -->
{%- assign pub_by_year = site.data.publications | group_by_exp: "item", "item.issued.date-parts[0][0]" | sort: "name" | reverse -%}
{%- assign selfs = "Tingyang, Xing" | split: ";" -%}

<!-- print bibliography -->
{%- for py in pub_by_year -%}
  <h4>{{py.name}}</h4>
  <ul>
  {%- for paper in py.items -%}
      <li>
      <!-- print authors -->
      {%- for author in paper.author -%}
        <!-- join author -->
        {%- assign author_raw = author.given | append: ', ' | append: author.family -%}
        {%- if selfs contains author_raw -%}
          <span class="author">{{ author_raw }}</span>
        {%- else -%}
          <span class="others">{{ author_raw }}</span>
        {%- endif -%}
        <!-- check if the last author -->
        {%- if forloop.last -%}
        .&nbsp;
        {%- else -%}
        ;&nbsp;
        {%- endif -%}
      {%- endfor -%}
      <!-- print title -->
      {%- if paper.DOI =="" -%}
        <i>{{paper.title}}</i>
      {%- else -%}
        <a href="https://doi.org/{{ paper.DOI }}" target="_blank"><i>{{paper.title}}</i></a>
      {%- endif -%}.&nbsp;
      <!-- title -->
      {{ paper.container-title}}.&nbsp;
      <!-- date -->
      {{ paper.issued.date-parts[0][0] }},&nbsp;
      <!-- volum and issue -->
      {%- if paper.volume and paper.volume != "n/a" -%}
        {%- if paper.issue and paper.issue != "n/a" -%}
          {{paper.volume}}({{paper.issue}}),&nbsp;
        {%- else -%}
          {{paper.volume}},&nbsp;
        {%- endif -%}
      {%- endif-%}
      <!-- pages -->
      {%- if paper.page -%}
        {{paper.page}}
      {%- endif -%}
    </li>
  {%- endfor -%}
  </ul>
{%- endfor %}