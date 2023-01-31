<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext } from "svelte";
  import DocInput from "~/components/DocInput.svelte";
  import Shield from "~/components/Shield.svelte";
  import Blobby from "~/components/Blobby.svelte";
  import DocumentTextInput from "~/helpers/svelte-components/input/TextInput.svelte";

  export let elementRoot;
  export let documentStore;
  export let document;

  setContext("#doc", documentStore);

  console.log(game);
  console.log(documentStore);
  console.log(document);
</script>

<template lang="pug">
  ApplicationShell(bind:elementRoot)
    header.surge-defaultSheet-header
      section.profile-wrap
        .profile.round
        .profile-buttons
        .portrait
          img.inline.flex2(src="systems/surge/assets/logo.webp" height="159" width="150" style="max-width: 150px; text-align: center;")
              
      section.character-details
        section.general-info.flexrow
          input.flex3(name="name" bind:value="{$documentStore.name}" placeholder="Character Name" maxlength="40")
          div.flex1.level-information 
            i.fas.fa-dice
        section.bonus-info
        ul.origin-summary
        section.movement
        section.character-stats
          .header-attributes
            Shield

    nav.surge-defaultSheet-navigation.tabs
    section.sheet-body
      div.attributes
      div.inventory
      div.traits
      div.body
        Blobby
      div.effects
      div.biography
      div.journal

</template>

<style lang="scss" scoped>
  // @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap");
  .level-information {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
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
    width: 150px;
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

  .col-px-md {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  .col-py-md {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .col-pa-md {
    padding: 1rem;
  }
  .col-px-sm {
    padding-right: 0.4rem;
    padding-left: 0.4rem;
  }
  .col-py-sm {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
  .col-pa-sm {
    padding: 0.4rem;
  }
  .col-mx-sm {
    margin-right: 0.4rem;
    margin-left: 0.4rem;
  }
  .col-mt-sm {
    margin-top: 0.4rem;
  }
  .col-my-sm {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }
  .col-ma-sm {
    margin: 0.4rem;
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
