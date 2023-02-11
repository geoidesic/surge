<script>
  import Description from "~/components/item/type/armour/Description.svelte";
  import Details from "~/components/item/type/armour/Details.svelte";
  import Effects from "~/components/item/Effects.svelte";
  import Tabs from "~/helpers/svelte-components/Tabs.svelte";

  let activeTab = "description";
  // Tabs
  const tabs = [
    { label: "description", id: "description", component: Description },
    { label: "details", id: "details", component: Details },
    { label: "effects", id: "effects", component: Effects },
  ];
</script>

<template lang="pug">
Tabs( {tabs} bind:activeTab="{activeTab}")
</template>

<style lang="scss" scoped>
</style>
