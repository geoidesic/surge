<script>
  import Description from "~/components/item/type/clothing/DescriptionTab.svelte";
  import Details from "~/components/item/type/clothing/DetailsTab.svelte";
  import Effects from "~/components/shared/EffectsTab.svelte";
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
