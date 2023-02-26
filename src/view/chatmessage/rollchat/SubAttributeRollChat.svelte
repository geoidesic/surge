<script>
  // this can be modified to include different templates based on the received data
  export let doc = void 0;
  export let result = void 0;
  export let code = void 0;
  export let noOfDice = void 0;
  export let die = void 0;

  import { attributes } from "~/helpers/Constants.js";
  import RollChat from "./RollChat.svelte";

  console.log("SubAttributeRollChat");
  console.log(doc);
  // console.log(Roll);
  // console.log(Roll.result);
  $: ATT = doc.system[code];

  function attributeGroup(code) {
    for (const attribute in attributes) {
      if (attributes[attribute].includes(code)) {
        return attribute;
      }
    }
    return null; // Element not found in any property
  }
  $: group = attributeGroup(code).toUpperCase();
</script>

<template lang="pug">
  RollChat(name="{doc.name}" img="{doc.img}" result="{result}" code="{code}" noOfDice="{noOfDice}" die="{die}" className="{group}" superScript="{group}" level="{ATT.level}")

</template>

<style lang="scss" scoped>
</style>
