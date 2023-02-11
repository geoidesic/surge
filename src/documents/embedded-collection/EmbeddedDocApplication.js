import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import EmbeddedDocAppShell    from './EmbeddedDocAppShell.svelte';

export default class EmbeddedDocApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: 'trl-reactive-embedded-collection',
         resizable: false,
         minimizable: true,
         width: 'auto',
         height: 'auto',
         title: 'Reactive Embedded Collections',

         svelte: {
            class: EmbeddedDocAppShell,
            target: document.body
         }
      });
   }
}