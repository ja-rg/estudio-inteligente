<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top z-2">
    <div class="container">
      <!-- Brand Logo -->
      <NuxtLink to="/" class="navbar-brand">
        <NuxtImg width="150" src="/img/LogoHeader.png" />
      </NuxtLink>
    </div>
  </nav>

  <main class="container p-5">
    <slot :focused="true" />
  </main>
  <div class="background-container"></div>
</template>
