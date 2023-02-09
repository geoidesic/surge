<script>
  import { getContext } from "svelte";
  const doc = getContext("#doc");
  const items = [...$doc.items]; //- make the items iterable
</script>

<template lang="pug">
  ol
    +each("items as item")
      li {item.name}
</template>

<style lang="scss" scoped>
</style>
