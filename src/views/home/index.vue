<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="@img/img/logo.png"
    >
    <hello-word :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import { HelloWord } from '@comp'

export default {
  name: 'Home',
  data () {
    return {
      msg: process.env.VUE_APP_API_HOST
    }
  },
  components: {
    HelloWord
  }
}
</script>
