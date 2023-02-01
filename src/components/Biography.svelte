<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
</script>

<template lang="pug">
  ScrollingContainer
    DocInput(label="gender" attr="system.gender" placeholder="gender")
    DocInput(label="hair" attr="system.hair" placeholder="hair")
    DocInput(label="eyes" attr="system.eyes" placeholder="eyes")
    DocInput(label="skin" attr="system.skin" placeholder="skin")
    DocTextArea(label="ideals" attr="system.ideals" placeholder="ideals")
    DocTextArea(label="flaws" attr="system.flaws" placeholder="flaws")
    DocTextArea(label="bonds" attr="system.bonds" placeholder="bonds")
    DocTextArea(label="Appearance" attr="system.appearance" placeholder="Appearance")
    DocTextArea(label="Backstory" attr="system.lore" placeholder="Lore")
    DocTextArea(label="Personality" attr="system.personality" placeholder="Personality")
    DocTextArea(label="Contacts" attr="system.contacts" placeholder="Contacts")
    DocTextArea(label="Factions" attr="system.factions" placeholder="Factions")
    DocTextArea(label="Family" attr="system.family" placeholder="Family")
    DocTextArea(label="Zodiac" attr="system.zodiac" placeholder="Zodiac")
</template>
