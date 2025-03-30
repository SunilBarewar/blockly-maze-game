// More on defining blocks:
// https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks

import * as Blockly from "blockly/core";

// Since we're using json to initialize the field, we'll need to import it.
import "../fields/BlocklyReactField";

const testReactField = {
  type: "test_react_field",
  message0: "custom field %1",
  args0: [
    {
      type: "field_react_component",
      name: "FIELD",
      text: "Click me",
    },
  ],
  previousStatement: null,
  nextStatement: null,
};

Blockly.Blocks["test_react_field"] = {
  init: function () {
    this.jsonInit(testReactField);
    this.setStyle("loop_blocks");
  },
};

// Define all blocks in a single JSON array
Blockly.defineBlocksWithJsonArray([
  // Move Forward block
  {
    type: "move_forward",
    message0: "move forward",
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "Move forward one space",
    helpUrl: "",
  },

  // Turn block with dropdown
  {
    type: "turn",
    message0: "turn %1",
    args0: [
      {
        type: "field_dropdown",
        name: "DIRECTION",
        options: [
          ["left", "LEFT"],
          ["right", "RIGHT"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
    tooltip: "Turn left or right",
    helpUrl: "",
  },
]);
