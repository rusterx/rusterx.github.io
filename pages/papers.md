---
layout: page
title: 论文
icon: paperclip
---

<!-- This page provides the sidebar links for mobile, where the sidebar is hidden -->



{%- for kp in site.data.papers -%}
  <h4>{{kp[0]}}</h4>
  {%- for paper in kp[1] -%}
    <li style="margin-bottom: 10px;line-height: 1.5em;">
      {%- assign authors = paper.author | split: " and " -%}
      {%- for author in authors -%}
        {%- if author == "Xing, Ting-yang" -%}
          <u>{{ author|strip }}</u>;&nbsp;
        {%- else -%}
          {{ author|strip }}; 
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