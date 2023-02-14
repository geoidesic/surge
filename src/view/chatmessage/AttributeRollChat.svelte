<!-- Super simple Svelte component that takes in a prop and outputs it. -->
<script>
  // this can be modified to include different templates based on the received data
  export let Actor = void 0;
  export let roll = void 0;
  // console.log("AttributeRollChat");
  // console.log(Actor);
  // console.log(Roll);
  // console.log(Roll.result);
</script>

This is a Svelte component chat message and it is from {Actor.name}! The Actor rolled the dice and got: {roll}
