---
layout: page
title: 搜索
icon: search
---

<!-- 引入搜索 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
  const { createApp, ref } = Vue
  createApp({
    setup() {
      const qw = ref('');

      function search(){
        console.log(`The query research is : ${qw}`);
      }

      return {
        qw
      }
    }
  }).mount('#app')
</script>


<div id="app">
  <input type="text" class="form-control" placeholder="搜索" >
</div>