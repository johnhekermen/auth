<template>
  <div class="home text-center">
    <div class="jumbotron">
      <h1 class="display-3">Authentication testing</h1>
      <!-- eslint-disable-next-line max-len -->
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <!-- eslint-disable-next-line max-len -->
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <!-- eslint-disable-next-line max-len -->
        <router-link class="btn btn-primary btn-lg" :to="{name: 'signup'}" role="button">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
