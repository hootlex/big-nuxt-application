<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        big-application
      </h1>
      <h2 class="subtitle">
        Application with thousands of components
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
      <v-btn color="success">Success</v-btn>
      <v-btn color="error">Error</v-btn>
      <v-btn color="warning">Warning</v-btn>
      <v-btn color="info">Info</v-btn>
    </div>
    <ResidentUserCreateForm/>
    <TemplateButton>CLICICCICI</TemplateButton>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ResidentUserCreateForm from '~/components/ResidentUserCreateForm.vue'
import TemplateButton from '~/components/TemplateButton.vue'

export default {
  components: {
    Logo,
    ResidentUserCreateForm,
    TemplateButton
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
