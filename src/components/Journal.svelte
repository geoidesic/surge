<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
</script>

<template lang="pug">
  ScrollingContainer
    DocTextArea(label="journal" attr="system.journal" placeholder="journal")
    DocTextArea(label="contacts" attr="system.contacts" placeholder="contacts")
    DocTextArea(label="places" attr="system.places" placeholder="places")
    DocTextArea(label="quests" attr="system.quests" placeholder="quests")
</template>
