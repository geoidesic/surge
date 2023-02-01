<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import { getContext } from "svelte";
</script>

<template lang="pug">
  ScrollingContainer
    h1 Appearance
    .flexrow
      DocInput(label="gender" attr="system.gender" placeholder="?")
      DocInput(label="hair" attr="system.hair" placeholder="?")
      DocInput(label="eyes" attr="system.eyes" placeholder="?")
      DocInput(label="skin" attr="system.skin" placeholder="?")
    article
      h2 physical description
      ProseMirror( attr="system.appearance" )
    h1 Personality
    article
      h2 Gemeral
      ProseMirror( attr="system.personality" )
    article
      h2 Ideals
      ProseMirror( attr="system.ideals")
    article
      h2 flaws
      ProseMirror( attr="system.flaws" )
    article
      h2 bonds
      ProseMirror( attr="system.bonds" )
    h1 Backstory
    article
      h2 lore
      ProseMirror( attr="system.lore" )
    article
      h2 contacts
      ProseMirror( attr="system.contacts" )
    article
      h2 factions
      ProseMirror( attr="system.factions" )
    article
      h2 family
      ProseMirror( attr="system.family" )
    article
      h2 zodiac
      ProseMirror( attr="system.zodiac" )
</template>

<style lang="scss" scoped>
</style>
