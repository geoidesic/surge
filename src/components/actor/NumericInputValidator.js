export default class NumericInputValidator {

  #handlers = [];

  #defaultHandlers = {
    arrowHandler: function (event, principal) {
      const value = parseInt(event.target.value);

      if (event.key.includes("Arrow")) {
        if (event.key.includes("Down")) {
          if (value > 0) return "down";
          return { reason: "Down target value < 0" };
        } else if (event.key.includes("Up")) {
          if (value >= 0 && principal > 0) return "up";
          return { reason: "Up target value < 0 or principal <= 0" };
        } else if (event.key.includes("Left") || event.key.includes("Right")) {
          return false; //<-- don't stop left or right keys from propagating, else we lose cursor control
        }
      }
    },
    digitHandler: function (event, principal) {
      const value = parseInt(event.target.value);

      if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(parseInt(event.key))) {
        if (value == 0 && event.key != 0) {
          return event.key;
        } else {
          if (value > 0) return event.key;
        }
        return { reason: "key pressed is zero and value is already zero" };
      }
    },
    deleteHandler: function (event, principal) {
      const value = parseInt(event.target.value);

      if (event.key == "Backspace" || event.key == "Del" || event.key == "Delete") {
        if (!isNaN(value)) {
          const testVal = typeof value != "number" ? value : value.toString();
          if (testVal.length > 1) {
            return "delete";
          }
          if (testVal.charAt(0) == 0) {
            return { reason: "value is zero, cannot delete 0" };
          } else {
            return "delete";
          }
        } else {
          return { reason: "value is not a number" };
        }
      }
    },
    tabHandler: function (event, principal) {
      if (event.key == "Tab") {
        return false;
      }
    },
  }

  /**
   * 
   * @param {object} handlers key: string, value: function. Each handler should return one of 3 types:
   * - {boolean} false: means that the validator matched, so processing of handlers can continue.
   * - {string}: means that the result 
   */
  constructor(handlers) {
    console.log(typeof handlers);
    console.log(typeof handlers === 'undefined');
    if (typeof handlers === 'undefined') {
      handlers = { ...this.#defaultHandlers };
    }
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
    for (const [key, handler] of Object.entries(this.#handlers)) {
      const result = handler(event, params);

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