import "./styles/Fonts.scss";
import "./styles/Variables.scss";
import "./styles/Mixins.scss";
import "./styles/Animations.scss";
import "./styles/Global.scss";

import SurgeActorSheet from "./sheets/actor/ActorSheet";
import SurgeItemSheet from "./sheets/item/ItemSheet";
import SurgeRoll from './view/chatmessage/SurgeRoll.svelte';
import { intents } from "./helpers/Constants.js"
import CombatTracker from './extensions/combat-tracker.js'


//- set to true to see which hooks get called
CONFIG.debug.hooks = true;
CONFIG.Combat.entityClass = CombatTracker;

Hooks.once("init", async () => {
  console.log("SURGE | Starting Surge VTTRPG System");

  Actors.registerSheet("surge", SurgeActorSheet, {
    makeDefault: true,
  });
  Items.registerSheet("surge", SurgeItemSheet, {
    makeDefault: true,
  });

  return;
});


/**
 * Used by chat message demo to manually attach a Svelte component, SurgeRoll, to a chat message.
 *
 * Note: You must manually destroy this Svelte component in an associated `preDeleteChatMessage` like the one provided
 * below. The reason being is that you are manually / conditionally creating a Svelte component that is not monitored /
 * controlled by TRL itself, so you must also manually destroy this component when the chat message is deleted.
 */
Hooks.on('renderChatMessage', (message, html) => {
  // Find associated flag data scoped to your module ID. This is the easiest way to determine that this message is
  // associated with your module and has a Svelte component attached to the message content.
  const flagData = message.getFlag('surge', 'data');

  if (typeof flagData === 'object') {
    // Add the svelte component to the message instance loaded in client side memory.
    message._svelteComponent = new SurgeRoll({ target: html[0], props: flagData });
  }
});

/**
 * Used by chat message demo to clean up / destroy the mounted Svelte component to the message instance when the chat
 * message is deleted.
*/
Hooks.on('preDeleteChatMessage', (message) => {
  // Find associated flag data scoped to your module ID. This is the easiest way to determine that this message is
  // associated with your module and has a Svelte component attached to the message content.
  const flagData = message.getFlag('surge', 'data');

  // Also ensure that the Svelte component exists
  if (typeof flagData === 'object' && typeof message?._svelteComponent?.$destroy === 'function') {
    // Manually destroy Svelte component when the chat message document is being deleted.
    message._svelteComponent.$destroy();
  }
});

Hooks.on('preUpdateActiveEffect', (effect) => {
  console.log("preUpdateActiveEffect")
  console.log(effect)
});

Hooks.on('closeActiveEffectConfig', (effect) => {
  console.log("preUpdateActiveEffect")
  console.log(effect)
})
Hooks.on('renderCombatTracker', (app, html, options) => {
  const $lis = $('li.combatant');

  $lis.each((i, li) => {
    // create a new child element
    const combatantId = $(li).attr('data-combatant-id');
    const combatant = game.combat.combatants.get(combatantId)
    const Actor = game.actors.get(combatant._source.actorId)

    const $select = $(`<select style="color: white; max-height: 2rem; margin-top: 0.5rem" >`);
    intents.forEach((option) => {
      const $option = $(`<option value="${option.value}">`);
      $option.text(option.label);
      $select.append($option);
    });
    $select.val(Actor.system.intent);
    $select.on('change', function (event) {
      const value = $(this).val();
      Actor.update({ ['system.intent']: value })
    })
    // get the children of the li element
    const $children = $(li).children();

    // insert the new element as the penultimate child element
    if ($children.length > 1) {
      $select.insertBefore($children[$children.length - 1]);
    } else {
      $(li).append($select);
    }
  });
})