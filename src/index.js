import "./styles/Fonts.scss";
import "./styles/Variables.scss";
import "./styles/Mixins.scss";
import "./styles/Animations.scss";
import "./styles/Global.scss";

import SurgeActorSheet from "./sheets/actor/ActorSheet";
import SurgeItemSheet from "./sheets/item/ItemSheet";
import MyChatMessage from './view/chatmessage/MyChatMessage.svelte';


//- set to true to see which hooks get called
CONFIG.debug.hooks = false;

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
 * Used by chat message demo to manually attach a Svelte component, MyChatMessage, to a chat message.
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
    message._svelteComponent = new MyChatMessage({ target: html[0], props: flagData });
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