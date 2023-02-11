<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext, getContext } from "svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import DocInput from "~/components/actor/ActorInput.svelte";
  import Shield from "~/components/Shield.svelte";
  import Blobby from "~/components/Blobby.svelte";
  import Attributes from "~/components/actor/Attributes.svelte";
  import Biography from "~/components/actor/Biography.svelte";
  import Inventory from "~/components/actor/Inventory.svelte";
  import Journal from "~/components/actor/Journal.svelte";
  import Traits from "~/components/actor/Traits.svelte";
  import Tabs from "~/helpers/svelte-components/Tabs.svelte";

  export let elementRoot; //- passed in by SvelteApplication
  export let documentStore; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body
  export let document; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body

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

  let activeTab = "attributes";

  //- provide Tokenizer support
  function _editToken(event) {
    if (game.modules.has("vtta-tokenizer")) {
      _launchTokenizer();
    } else {
      _launchStandardProfileEditor(event);
    }
  }

  function _launchTokenizer() {
    Tokenizer.tokenizeActor($documentStore);
  }

  console.log("game", game);
  console.log("documentStore", documentStore);
  console.log("document", document);

  // Tabs
  const tabs = [
    { label: "attributes", id: "attributes", component: Attributes },
    { label: "inventory", id: "inventory", component: Inventory },
    { label: "traits", id: "traits", component: Traits },
    { label: "effects", id: "effects", component: Shield },
    { label: "biography", id: "biography", component: Biography },
    { label: "journal", id: "journal", component: Journal },
  ];

  $documentStore.system.STR =
    (parseInt($documentStore.system.siz.currentValue) +
      parseInt($documentStore.system.hid.currentValue) +
      parseInt($documentStore.system.mus.currentValue) +
      parseInt($documentStore.system.ton.currentValue) +
      parseInt($documentStore.system.den.currentValue)) /
    5;

  $documentStore.system.DEX =
    (parseInt($documentStore.system.spd.currentValue) +
      parseInt($documentStore.system.flx.currentValue) +
      parseInt($documentStore.system.agl.currentValue) +
      parseInt($documentStore.system.bal.currentValue) +
      parseInt($documentStore.system.coo.currentValue)) /
    5;

  $documentStore.system.CHA =
    (parseInt($documentStore.system.com.currentValue) +
      parseInt($documentStore.system.pre.currentValue) +
      parseInt($documentStore.system.gab.currentValue) +
      parseInt($documentStore.system.chr.currentValue) +
      parseInt($documentStore.system.sta.currentValue)) /
    5;

  $documentStore.system.INT =
    (parseInt($documentStore.system.mem.currentValue) +
      parseInt($documentStore.system.dsc.currentValue) +
      parseInt($documentStore.system.ins.currentValue) +
      parseInt($documentStore.system.wil.currentValue) +
      parseInt($documentStore.system.cog.currentValue)) /
    5;

  $documentStore.system.PER =
    (parseInt($documentStore.system.sig.currentValue) +
      parseInt($documentStore.system.hea.currentValue) +
      parseInt($documentStore.system.sml.currentValue) +
      parseInt($documentStore.system.tst.currentValue) +
      parseInt($documentStore.system.tch.currentValue)) /
    5;

  $documentStore.system.HLT =
    (parseInt($documentStore.system.end.currentValue) +
      parseInt($documentStore.system.imm.currentValue) +
      parseInt($documentStore.system.ftg.currentValue) +
      parseInt($documentStore.system.wnd.currentValue) +
      parseInt($documentStore.system.dis.currentValue)) /
    5;

  $documentStore.system.SIZ = parseFloat($documentStore.system.siz.currentValue);

  $documentStore.system.AP = Math.max(
    0,
    Math.round(parseFloat($documentStore.system.spd.currentValue) - $documentStore.system.ENC)
  );

  $: encumbrance = $documentStore.system.encumbrance;

  setContext("#doc", documentStore);
</script>

<template lang="pug">
  ApplicationShell(bind:elementRoot)
    header.surge-defaultSheet-header
      section.profile-wrap
        .profile.round
        .profile-buttons
        .portrait
          img.profile(src="{$documentStore.img}" data-tooltip="{$documentStore.name}" on:click="{_editToken}")
          //- img.inline.flex2(src="systems/surge/assets/logo.webp" height="100" width="100" style="max-width: 100px; text-align: center;")

              
      section.character-details
        section.general-info.flexrow
          .flexcol.flex3
            DocInput(className="lg transparent" attr="name" placeholder="Character Name" maxlength="40")
            DocInput(className="md transparent" attr="system.race" placeholder="Character Race" maxlength="40")
          div.flex1.level-information
            table(style="text-align: right")
              tr
                th(width="50%")
                  label.flex2 XP
                td
                  DocInput(className="md right transparent" attr="system.unspentXp" maxlength="6")
              tr
                th(width="50%")
                  label Lvl
                td
                  DocInput(className="md right transparent" attr="system.spentXp" maxlength="6" disabled)  
        section.bonus-info
          .flexrow.ml-sm 
            div AP 
            div.right {$documentStore.system.AP}
            div ENC 
            div.right(class="{encumbrance}") {encumbrance}


        ul.origin-summary
        section.movement
        section.character-stats
          .header-attributes

    section.sheet-body
      Tabs( {tabs} bind:activeTab="{activeTab}")
      

</template>

<style lang="scss" scoped>
  .flexrow {
    gap: 10px;
  }
  .flexcol {
    gap: 10px;
  }
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

  .light {
    color: var(--enc-light);
  }
  .medium {
    color: var(--enc-medium);
  }
  .heavy {
    color: var(--enc-heavy);
  }
  .immobile {
    color: var(--enc-immobile);
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
