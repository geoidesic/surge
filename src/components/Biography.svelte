<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import ProseMirror from "~/components/ProseMirror.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
</script>

<template lang="pug">
  ScrollingContainer
    DocInput(label="gender" attr="system.gender" placeholder="gender")
    DocInput(label="hair" attr="system.hair" placeholder="hair")
    DocInput(label="eyes" attr="system.eyes" placeholder="eyes")
    DocInput(label="skin" attr="system.skin" placeholder="skin")
    article
      h1 Personality Traits
      ProseMirror( attr="system.personality" )
    article
      h1 Ideals
      ProseMirror( attr="system.ideals")
    article
      h1 flaws
      ProseMirror( attr="system.flaws" )
    article
      h2 bonds
      ProseMirror( attr="system.bonds" )
    article
      h2 appearance
      ProseMirror( attr="system.appearance" )
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
  article {
    // border: 2px solid grey;
    // border-radius: var(--border-radius);
    padding: 0.2rem;
    margin: 0.5rem 0.5rem 4rem 1rem;
    min-height: 200px;
    text-align: left;
  }
  h2 {
    text-transform: capitalize;
  }
</style>
