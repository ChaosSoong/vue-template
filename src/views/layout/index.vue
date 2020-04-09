<template>
  <div class="content">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <transition
      name="fadesd"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>
