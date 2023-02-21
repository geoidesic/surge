<script>
  export let chatTemplate = "";
  import * as ChatComponents from "~/view/chatmessage/rollchat";
  console.log("SurgeRoll template: " + chatTemplate);
  let Template;
</script>

<svelte:component this={ChatComponents[chatTemplate]} {...$$props} />
