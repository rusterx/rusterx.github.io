---
---
{% assign counter = 0 %}
var posts = [
    {%- for page in site.posts -%}
        {
          "id": {{ counter }},
          "url": "{{ site.url }}{{ page.url }}",
          "title": "{{ page.title }}",
          "body": "{{ page.date | date: "%Y/%m/%d" }} - {{ page.content | markdownify | replace: '.', '. ' | replace: '\', '' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
        }
        {%- if forloop.last -%}
        {%- else -%}, 
        {%- endif -%}
    {%- endfor -%}];

export {posts}