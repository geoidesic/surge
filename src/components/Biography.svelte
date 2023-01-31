<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
</script>

<template lang="pug">
  div
    DocTextArea(label="Physical Description" attr="system.description" placeholder="Physical Description")
    DocTextArea(label="Backstory" attr="system.lore" placeholder="Lore")
</template>
