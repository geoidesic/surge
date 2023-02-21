<script>
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import { getContext } from "svelte";

  const doc = getContext("#doc");
  console.log($doc);
  const ae = new ActiveEffect();
  console.log(ae);
</script>

<template lang="pug">

</template>

<style lang="scss" scoped>
</style>
