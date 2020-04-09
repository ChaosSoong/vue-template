<template>
  <div
    id="main"
    class="app-main"
  >
    <transition
      name="fadesd"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<style lang="stylus">
@import "~@/stylus/main"

#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
