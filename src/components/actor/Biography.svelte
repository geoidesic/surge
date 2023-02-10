<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
</script>

<template lang="pug">
  ScrollingContainer
    .flexcol.pa-sm
      h1 Appearance
      .flexrow.split
        DocInput( className="right transparent sm border" label="gender" attr="system.gender" placeholder="?")
        DocInput( className="right transparent sm border" label="hair" attr="system.hair" placeholder="?")
        DocInput( className="right transparent sm border" label="eyes" attr="system.eyes" placeholder="?")
        DocInput( className="right transparent sm border" label="skin" attr="system.skin" placeholder="?")
      .flexcol
        article
          h2 physical description
          ProseMirror( attr="system.appearance" )
      .flexrow
        .flexcol
          h1.flex0 Personality
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
        .flexcol
          h1.flex0 Backstory
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
  .flexrow {
    gap: 10px;
  }
  .flexcol {
    gap: 10px;
  }
</style>
