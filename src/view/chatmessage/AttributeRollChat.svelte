<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let doc = void 0;
  export let roll = void 0;
  export let code = void 0;
  export let noOfDice = void 0;
  export let die = void 0;

  import RollChat from "./RollChat.svelte";
</script>

<template lang="pug">
    RollChat(name="{doc.name}" img="{doc.img}" roll="{roll}" code="{code}" noOfDice="{noOfDice}" die="{die}" className="{code}" superScript="" level="{doc.system[code]}")
</template>

<style lang="scss" scoped>
</style>
