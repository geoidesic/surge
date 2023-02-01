<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
</script>

<template lang="pug">
  ScrollingContainer
    article
      h2 journal
      ProseMirror( attr="system.journal")
    article
      h2 contacts
      ProseMirror( attr="system.contacts")
    article
      h2 places
      ProseMirror( attr="system.places")
    article
      h2 quests
      ProseMirror( attr="system.quests")
</template>

<style lang="scss" scoped>
</style>
