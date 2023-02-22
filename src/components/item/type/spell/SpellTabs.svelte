<script>
  import Description from "~/components/item/type/spell/DescriptionTab.svelte";
  import Details from "~/components/item/type/spell/Details.svelte";
  import Effects from "~/components/item/Effects.svelte";
  import Tabs from "~/helpers/svelte-components/Tabs.svelte";

  let activeTab = "description";
  // Tabs
  const tabs = [
    { label: "Description", id: "description", component: Description },
    { label: "Details", id: "details", component: Details },
    { label: "Effects", id: "effects", component: Effects },
  ];
</script>

<template lang="pug">
Tabs( {tabs} bind:activeTab="{activeTab}")
</template>

<style lang="scss" scoped>
</style>
