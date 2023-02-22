import SvelteDocumentSheet from "~/documents/DocumentSheet";
import ItemSheetShell from "./ItemSheetShell.svelte";

export default class SurgeItemSheet extends SvelteDocumentSheet {

  //- We can override the default sheet methods

  async close(options = {}) {
    // unregister the 'renderApplication' hook
    // Hooks.off('renderApplication', this._onRenderApplication);

    console.log('>>>>>>>>>> close Item Sheet >>>>>>>>>>')
    console.log(arguments);
    console.log(this);
    return super.close(options);
  }

  _onRender() {
    // register the 'renderApplication' hook
    this._onRenderApplication = (message, html) => {
      // do something
      console.log('>>>>>> Render Item Sheet >>>>>>>')
    };
    // Hooks.on('renderApplication', this._onRenderApplication);
  }

  /**
   * Default Application options
   *
   * @returns {object} options - Application options.
   * @see https://foundryvtt.com/api/Application.html#options
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 500,
      height: 500,
      minWidth: 400,
      svelte: {
        class: ItemSheetShell,
        target: document.body,
      },
    });
  }
}

