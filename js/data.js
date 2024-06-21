posts = [
    {%- for page in site.posts -%}
    {
      "id": {{ counter }},
      "url": "{{ site.url }}{{ page.url }}",
      "title": "{{ page.title }}",
      "body": "{{ page.date | date: '%Y/%m/%d' }} - {{ page.content | markdownify | strip_html | replace: '\', '\\' }}"
      {%- assign counter = counter | plus: 1 -%}
    }
    {%- if forloop.last -%}
    {%- else -%}, 
    {%- endif -%}
    {%- endfor -%}
]

export {posts}