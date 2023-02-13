export default class NumericInputValidator {

  #handlers = [];

  /**
   * 
   * @param {object} handlers key: string, value: function. Each handler should return one of 3 types:
   * - {boolean} false: means that the validator matched, so processing of handlers can continue.
   * - {string}: means that the result 
   */
  constructor(handlers) {
    const expectedKeys = ['arrowHandler', 'digitHandler', 'deleteHandler', 'tabHandler'];
    const hasExpectedKeys = expectedKeys.every(key => handlers.hasOwnProperty(key));
    if (!hasExpectedKeys) {
      throw Error("Validator expects to receive an object with the following keys: " + expectedKeys.join(', '));
    }
    expectedKeys.map((key) => {
      if (typeof handlers[key] !== 'function') {
        throw Error("Validator expects " + key + " to be a function")
      }
    })
    this.#handlers = handlers;
  }

  /**
   * Provides a framework for validation behaviour. 
   * @param {*} event keydown event
   * @param {*} params whatever the validator functions need to have passed in
   */
  validate(event, params) {
    console.log(this.#handlers);
    for (const [key, handler] of Object.entries(this.#handlers)) {
      const result = handler(event, params);
      console.log(result);
      return;

      if (result === false || typeof result === 'string') {
        return result;
      }

      if (typeof result !== 'undefined') {
        console.log("validateAttributeXpInput:- validation failed for reason: " + result.reason);

        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }

}