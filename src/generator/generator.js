import { javascriptGenerator } from "blockly/javascript";

javascriptGenerator.forBlock["test_react_field"] = function (block) {
  return "console.log('custom block');\n";
};

javascriptGenerator.forBlock["move_forward"] = function (block) {
  return "moveForward();\n";
};

javascriptGenerator.forBlock["turn"] = function (block) {
  const direction = block.getFieldValue("DIRECTION");
  return `turn('${direction.toLowerCase()}');\n`;
};

javascriptGenerator.forBlock["repeat"] = function (block) {
  const times =
    javascriptGenerator.valueToCode(
      block,
      "TIMES",
      javascriptGenerator.ORDER_ATOMIC
    ) || "0";
  const statements = javascriptGenerator.statementToCode(block, "DO");

  return `for (let i = 0; i < ${times}; i++) {\n${statements}}\n`;
};
