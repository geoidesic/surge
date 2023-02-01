<script>
  import ProseMirror from "~/components/ProseMirror.svelte";
</script>

<template lang="pug">
  article
    h1 Personality Traits
    ProseMirror(content="la dee pockedie" attr="system.personality")
</template>
