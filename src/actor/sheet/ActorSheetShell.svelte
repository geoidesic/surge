<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext } from "svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import DocInput from "~/components/DocInput.svelte";
  import Shield from "~/components/Shield.svelte";
  import Blobby from "~/components/Blobby.svelte";
  import Attributes from "~/components/Attributes.svelte";
  import Biography from "~/components/Biography.svelte";
  import Journal from "~/components/Journal.svelte";
  import Traits from "~/components/Traits.svelte";
  import Tabs from "~/helpers/svelte-components/Tabs.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";

  export let elementRoot;
  export let documentStore;
  export let document;

  let activeTab = "attributes";

  function onEditImage(event) {
    const current = $documentStore.img;
    console.log(FilePicker);
    const fp = new FilePicker({
      type: "image",
      current: current,
      callback: (path) => {
        $documentStore.update({ img: path });
      },

      top: application.position.top + 40,
      left: application.position.left + 10,
    });
    return fp.browse();
  }

  setContext("#doc", documentStore);

  console.log("game", game);
  console.log("documentStore", documentStore);
  console.log("document", document);

  // Tabs
  const tabs = [
    { label: "attributes", id: "attributes", component: Attributes },
    { label: "inventory", id: "inventory", component: Blobby },
    { label: "traits", id: "traits", component: Traits },
    { label: "effects", id: "effects", component: Shield },
    { label: "biography", id: "biography", component: Biography },
    { label: "journal", id: "journal", component: Journal },
  ];
</script>

<template lang="pug">
  ApplicationShell(bind:elementRoot)
    header.surge-defaultSheet-header
      section.profile-wrap
        .profile.round
        .profile-buttons
        .portrait
          img.profile(src="{$documentStore.img}" data-tooltip="{$documentStore.name}" on:click="{onEditImage}")
          //- img.inline.flex2(src="systems/surge/assets/logo.webp" height="100" width="100" style="max-width: 100px; text-align: center;")

              
      section.character-details
        section.general-info.flexrow
          .flexcol.flex3
            DocInput(attr="name" placeholder="Character Name" maxlength="40")
            DocInput(attr="system.race" placeholder="Character Race" maxlength="40")
          div.flex1.level-information
            .flexcol
              .flexrow
                label.flex2 XP
                DocInput(attr="system.unspentXp" maxlength="6")
              .flexrow
                label Skill
                DocInput(attr="system.spentXp" maxlength="6" disabled)  
        section.bonus-info

        ul.origin-summary
        section.movement
        section.character-stats
          .header-attributes

    section.sheet-body
      Tabs( {tabs} bind:activeTab="{activeTab}")
      

</template>

<style lang="scss" scoped>
  // @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap");
  .level-information {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin-left: 1rem;
    padding: 1rem;
  }

  input {
    display: block;
    padding: 0;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 2rem;
    font-weight: 700;
    font-family: "Modesto Condensed", "Palatino Lynotype", serif;
    max-height: 2rem;
    background: none;
    -webkit-transition: background 0.3s ease, border-color 0.3s ease;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .surge-defaultSheet-header {
    display: flex;
    justify-content: center;
    flex: 0;
  }
  .sheet-body {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    background: url("ui/parchment.jpg");
    background-repeat: repeat;
  }
  .surge-defaultSheet {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .profile-wrap {
    width: 100px;
    /* position: relative; */
  }
  .character-details {
    margin-left: 1rem;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .header-attributes {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-flex: 0;
    -ms-flex: 0;
    flex: 0;
  }
  .portrait img {
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: top;
    object-position: top;
  }
  img {
    border: none;
  }
  .bd-green {
    padding: 1rem;
    border: 1px solid green;
  }
  .bd-red {
    padding: 1rem;
    border: 1px solid red;
  }
  .bd-blue {
    padding: 1rem;
    border: 1px solid blue;
  }
  svg path {
    fill: #ff8899;
    width: 20px;
    height: 20px;
  }
  .align-center {
    text-align: center;
  }

  .inline-block {
    display: inline-block;
  }
  .inline {
    display: inline;
  }

  .sheet .window-content h1 {
    padding: 0;
    margin: 0;
  }
</style>
