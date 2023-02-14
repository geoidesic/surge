<script>
  import { getContext } from "svelte";
  import DocInput from "~/components/actor/ActorInput.svelte";
  import DocTextArea from "~/components/DocTextArea.svelte";
  import Attribute from "~/components/actor/Attribute.svelte";
  import AttributeBlock from "~/components/actor/AttributeBlock.svelte";
  import ScrollingContainer from "~/helpers/svelte-components/ScrollingContainer.svelte";
  import RollCalc from "./RollCalc";

  let cats = ["one", "two", "three"];
  let str = ["siz", "hid", "mus", "ton", "den"];
  let dex = ["spd", "flx", "agl", "bal", "coo"];
  let cha = ["com", "pre", "gab", "chr", "sta"];
  let int = ["mem", "dsc", "ins", "wil", "cog"];
  let per = ["sig", "hea", "sml", "tst", "tch"];
  let hlt = ["end", "imm", "ftg", "wnd", "dis"];

  const doc = getContext("#doc");

  $: STR =
    (parseInt($doc.system.siz.level) +
      parseInt($doc.system.hid.level) +
      parseInt($doc.system.mus.level) +
      parseInt($doc.system.ton.level) +
      parseInt($doc.system.den.level)) /
    5;

  $: DEX =
    (parseInt($doc.system.spd.level) +
      parseInt($doc.system.flx.level) +
      parseInt($doc.system.agl.level) +
      parseInt($doc.system.bal.level) +
      parseInt($doc.system.coo.level)) /
    5;

  $: CHA =
    (parseInt($doc.system.com.level) +
      parseInt($doc.system.pre.level) +
      parseInt($doc.system.gab.level) +
      parseInt($doc.system.chr.level) +
      parseInt($doc.system.sta.level)) /
    5;

  $: INT =
    (parseInt($doc.system.mem.level) +
      parseInt($doc.system.dsc.level) +
      parseInt($doc.system.ins.level) +
      parseInt($doc.system.wil.level) +
      parseInt($doc.system.cog.level)) /
    5;

  $: PER =
    (parseInt($doc.system.sig.level) +
      parseInt($doc.system.hea.level) +
      parseInt($doc.system.sml.level) +
      parseInt($doc.system.tst.level) +
      parseInt($doc.system.tch.level)) /
    5;

  $: HLT =
    (parseInt($doc.system.end.level) +
      parseInt($doc.system.imm.level) +
      parseInt($doc.system.ftg.level) +
      parseInt($doc.system.wnd.level) +
      parseInt($doc.system.dis.level)) /
    5;
  // console.log("siz int", parseInt($doc.system.siz.level));
</script>

<template lang="pug">
  ScrollingContainer

    .flexrow
      .flexcol.str
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'STR', rollType: 'attribute'})}")
          span.code STR 
          span.flex0.pr-sm.caption Strength
          span.val {STR}
        AttributeBlock( codes="{str}")
      .flexcol.dex
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'DEX', rollType: 'attribute'})}")
          span.code DEX 
          span.flex0.pr-sm.caption Dexterity
          span.val {DEX}
        AttributeBlock( codes="{dex}")

    .flexrow
      .flexcol.cha
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'CHA', rollType: 'attribute'})}")
          span.code CHA 
          span.flex0.pr-sm.caption Charisma
          span.val {CHA}
        AttributeBlock( codes="{cha}")
      .flexcol.int
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'INT', rollType: 'attribute'})}")
          span.code INT 
          span.flex0.pr-sm.caption Intellect
          span.val {INT}
        AttributeBlock( codes="{int}")

    .flexrow
      .flexcol.per
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'PER', rollType: 'attribute'})}")
          span.code PER 
          span.flex0.pr-sm.caption Perception
          span.val {PER}
        AttributeBlock( codes="{per}")
      .flexcol.hlt
        .flexrow.title
          i.fas.fa-dice.flex0(on:click!="{new RollCalc({doc: $doc, code: 'HLT', rollType: 'attribute'})}")
          span.code HLT 
          span.flex0.pr-sm.caption Health
          span.val {HLT}
        AttributeBlock( codes="{hlt}")


</template>

<style lang="scss" scoped>
  .title {
    font-size: 1.2rem;
    line-height: 2rem;
    padding: 2px 0 0 0;
    margin: 0;
  }
  i {
    padding: 0.2rem 0 0 0.4rem;
    margin: 0;
    cursor: pointer;
  }
  .caption {
    font-size: 0.8rem;
    vertical-align: bottom;
  }
  .str {
    background-color: var(--str-color-lighter);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--str-color-lightest);
    }
  }
  .dex {
    background-color: var(--dex-color);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--dex-color-lightest);
    }
  }
  .cha {
    background-color: var(--cha-color);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--cha-color-lightest);
    }
  }
  .int {
    background-color: var(--int-color);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--int-color-lightest);
    }
  }
  .hlt {
    background-color: var(--hlt-color);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--hlt-color-lightest);
    }
  }
  .per {
    background-color: var(--per-color);
    .code {
      font-size: 1.5rem;
    }
    .val {
      font-size: 2rem;
      background: var(--per-color-lightest);
    }
  }
</style>
