<script>
  import DocInput from "~/components/DocInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
</script>

<template lang="pug">
  DocTextArea(label="Physical Description" attr="system.description" placeholder="Physical Description")
  DocTextArea(label="Backstory" attr="system.lore" placeholder="Lore")
</template>
