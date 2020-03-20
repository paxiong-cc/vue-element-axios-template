<template>
  <section class="login-container">
    <header class="head">
      头
    </header>

    <section class="body">
      123
    </section>

    <footer class="foot">123</footer>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .login-container {
    @include flex($dr: column);
    height: 100%;
  }

  .head {
    height: 60px;
    background: black
  }

  .body {
    flex: 1
  }

  .foot {
    height: 120px;
    background: #F1EFF1;
  }
</style>
