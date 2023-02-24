<svelte:options accessors={true} />

<script>
  import { ApplicationShell } from "@typhonjs-fvtt/runtime/svelte/component/core";
  import { setContext, getContext } from "svelte";
  import DocInput from "~/components/item/ItemInput.svelte";
  import WeaponHeader from "~/components/item/type/weapon/WeaponHeader.svelte";
  import WeaponTabs from "~/components/item/type/weapon/WeaponTabs.svelte";
  import AmmunitionHeader from "~/components/item/type/ammunition/AmmunitionHeader.svelte";
  import AmmunitionTabs from "~/components/item/type/ammunition/AmmunitionTabs.svelte";
  import ArmourHeader from "~/components/item/type/armour/ArmourHeader.svelte";
  import ArmourTabs from "~/components/item/type/armour/ArmourTabs.svelte";
  import ClothingHeader from "~/components/item/type/clothing/ClothingHeader.svelte";
  import ClothingTabs from "~/components/item/type/clothing/ClothingTabs.svelte";
  import ContainerHeader from "~/components/item/type/container/ContainerHeader.svelte";
  import ContainerTabs from "~/components/item/type/container/ContainerTabs.svelte";
  import EffectHeader from "~/components/item/type/effect/EffectHeader.svelte";
  import EffectTabs from "~/components/item/type/effect/EffectTabs.svelte";
  import ShieldHeader from "~/components/item/type/shield/ShieldHeader.svelte";
  import ShieldTabs from "~/components/item/type/shield/ShieldTabs.svelte";
  import SpellHeader from "~/components/item/type/spell/SpellHeader.svelte";
  import SpellTabs from "~/components/item/type/spell/SpellTabs.svelte";
  import SkillHeader from "~/components/item/type/skill/SkillHeader.svelte";
  import SkillTabs from "~/components/item/type/skill/SkillTabs.svelte";
  import TraitHeader from "~/components/item/type/trait/TraitHeader.svelte";
  import TraitTabs from "~/components/item/type/trait/TraitTabs.svelte";

  export let elementRoot; //- passed in by SvelteApplication
  export let documentStore; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body
  export let document; //- passed in by DocumentSheet.js where it attaches DocumentShell to the DOM body

  const headerMap = {
    armour: ArmourHeader,
    ammunition: AmmunitionHeader,
    clothing: ClothingHeader,
    container: ContainerHeader,
    effect: EffectHeader,
    shield: ShieldHeader,
    spell: SpellHeader,
    skill: SkillHeader,
    trait: TraitHeader,
    weapon: WeaponHeader,
  };
  const tabMap = {
    ammunition: AmmunitionTabs,
    armour: ArmourTabs,
    clothing: ClothingTabs,
    container: ContainerTabs,
    effect: EffectTabs,
    shield: ShieldTabs,
    spell: SpellTabs,
    skill: SkillTabs,
    trait: TraitTabs,
    weapon: WeaponTabs,
  };
  // console.log("game", game);
  // console.log("documentStore", documentStore);
  // console.log("document", document);

  const application = getContext("external").application;
  let activeTab = "description";

  setContext("#doc", documentStore);

  $: item = $documentStore;

  //- Profile Editor
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

  //- provide Tokenizer support
  function _editToken(event) {
    _launchStandardProfileEditor(event);
  }

  async function handleDrop(event) {
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));

    let droppedItem;
    let split = data.uuid.split(".");
    let type = split[0];

    if (type === "Item") {
      droppedItem = await game.items.get(split[1]);
    } else if (type === "Compendium") {
      const compendiumName = `${split[1]}.${split[2]}`;
      const pack = game.packs.get(compendiumName);
      droppedItem = await pack.getDocument(split[3]);
    }

    if (droppedItem.type == "effect") {
      //- get the effects from the item
      //- add the effect from the item to this item
      await $documentStore.createEmbeddedDocuments("ActiveEffect", Array.from(droppedItem.effects));
    }
  }
</script>

<template lang="pug">
  ApplicationShell(bind:elementRoot)
    header.surge-defaultSheet-header(on:drop="{handleDrop}")

      //- profile pic
      section.profile-wrap
        .profile.round
        .profile-buttons
        .portrait
          img.profile(src="{$documentStore.img}" data-tooltip="{$documentStore.name}" on:click="{_launchStandardProfileEditor}")
          //- img.inline.flex2(src="systems/surge/assets/logo.webp" height="100" width="100" style="max-width: 100px; text-align: center;")

      section.item.details
        //- shared details 
        section.general-info.flexrow
          .flexcol.flex3
            DocInput(className="lg transparent" attr="name" placeholder="Item Name" maxlength="40")
          div.flex1.level-information
            table(style="text-align: center")
              tr
                td
                  div {item.type} 

        //- type details
        svelte:component(this="{headerMap[item.type]}")
        


    section.sheet-body(on:drop="{handleDrop}")
      svelte:component(this="{tabMap[item.type]}")
      

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
