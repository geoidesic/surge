<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext, getContext } from "svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import Description from "~/components/item/Description.svelte";
  import Details from "~/components/item/Details.svelte";
  import Effects from "~/components/item/Effects.svelte";
  import Tabs from "~/helpers/svelte-components/Tabs.svelte";
  import DocumentRaritySelect from "~/components/elements/DocumentRaritySelect.svelte";

  export let elementRoot; //- passed in by SvelteApplication
  export let documentStore; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body
  export let document; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body

  $: item = $documentStore;

  let _filePickerInstance = {};

  function _launchStandardProfileEditor(event) {
    const current = $documentStore.img;
    if (_filePickerInstance instanceof FilePicker && !_filePickerInstance?.rendered) {
      _filePickerInstance.render(true);
      return;
    }
    _filePickerInstance = new FilePicker({
      type: "image",
      current: current,
      callback: (path) => {
        $documentStore.update({ img: path });
      },

      top: application.position.top + 40,
      left: application.position.left + 10,
    });
    return _filePickerInstance.browse();
  }

  const application = getContext("external").application;
  console.log(application);

  let activeTab = "description";

  //- provide Tokenizer support
  function _editToken(event) {
    _launchStandardProfileEditor(event);
  }

  setContext("#doc", documentStore);

  console.log("game", game);
  console.log("documentStore", documentStore);
  console.log("document", document);

  // Tabs
  const tabs = [
    { label: "description", id: "description", component: Description },
    { label: "details", id: "details", component: Details },
    { label: "effects", id: "effects", component: Effects },
  ];
</script>

<template lang="pug">
  ApplicationShell(bind:elementRoot)
    header.surge-defaultSheet-header
      section.profile-wrap
        .profile.round
        .profile-buttons
        .portrait
          img.profile(src="{$documentStore.img}" data-tooltip="{$documentStore.name}" on:click="{_launchStandardProfileEditor}")
          //- img.inline.flex2(src="systems/surge/assets/logo.webp" height="100" width="100" style="max-width: 100px; text-align: center;")

              
      section.item.details
        section.general-info.flexrow
          .flexcol.flex3
            DocInput(className="lg transparent" attr="name" placeholder="Item Name" maxlength="40")
          div.flex1.level-information
            table(style="text-align: center")
              tr
                td
                  div {item.type}

        section.extra-info.flexrow
          DocInput(className="md transparent" attr="system.size" placeholder="Size" maxlength="40")
          .stat
            // Label
            //- .label rarity

            // Input
            .input
              DocumentRaritySelect(bind:value='{$documentStore.system.rarity}')

          DocInput(className="md transparent" attr="system.AP" placeholder="0" maxlength="40" inputType="number")

          DocInput(className="md transparent" attr="system.AF" placeholder="0" maxlength="40" inputType="number")
        section.extra-info.flexrow
          div Size
          div Rarity
          div Action Points
          div Action Factor


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
    // border: 1px solid var(--border-color);
    // border-radius: var(--border-radius);
    // margin-left: 1rem;
    // padding: 1rem;
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
  .details {
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