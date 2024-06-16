---
layout: page
title: 论文
icon: paperclip
---

<!-- This page provides the sidebar links for mobile, where the sidebar is hidden -->
{%- assign pub_by_year = site.data.publications | group_by_exp: "item", "item.issued.date-parts[0][0] | to_i" | reverse -%}
{%- for py in pub_by_year -%}
  {{py.name}}<br/>
{%- endfor -%}

<!-- liquid 不能创建array -->
{%- assign selfs = "Xing, Ting-yang;Xing, Tingyang;Xing, Ting-Yang;Xing, Tingyang" | split: ";" -%}
{%- for kp in site.data.papers -%}
  <h4>{{kp[0]}}</h4>
  {%- for paper in kp[1] -%}
    <li style="margin-bottom: 10px;line-height: 1.5em;">
      {%- assign authors = paper.author | split: " and " -%}
      {%- for author in authors -%}
        {%- if selfs contains author -%}
          <span class="author">{{ author }}</span>;&nbsp;
        {%- else -%}
          <span class="others">{{ author }}</span>;&nbsp;
        {%- endif -%}
      {%- endfor -%}
        <!-- {{paper.author}}, -->
      {%- if paper.doi =="" -%}
        <i>{{paper.title}}</i>
      {%- else -%}
        <a href="https://doi.org/{{ paper.doi }}" target="_blank"><i>{{paper.title}}</i></a>
      {%- endif -%}. 
      {{paper.journaltitle}}
      {{paper.booktitle}}, 
      {{ paper.date }}.
      <b>{{paper.volume}}</b>
      {%- if paper.number != "" -%}
        ({{paper.number}})
      {%- endif -%}: p{{paper.pages}}
    </li>
  {%- endfor -%}
{%- endfor -%}