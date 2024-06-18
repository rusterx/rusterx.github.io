---
layout: page
title: 搜索
icon: search
---

<!-- 引入搜索 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
    <div class="container">
        <div class="row">
            <input type="text form-control" v-model="qw" @keyup.enter="search" placeholder='搜索'>
        </div>
    </div>
</div>

<script>
  const { createApp, ref } = Vue
  createApp({
    setup() {
      const qw = ref('')

      function search(){
        console.log(`The query research is : ${qw}`);
      }

      return {
        qw
      }
    }
  }).mount('#app')
</script>