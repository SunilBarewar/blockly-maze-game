// src/components/BlocklyWorkspace/BlocklyWorkspace.jsx
import React, { useEffect, useRef } from "react";
import "./BlocklyWorkspace.css";
import * as Blockly from "blockly/core";
import { useBlockly } from "../../contexts/BlocklyContext";
import * as locale from "blockly/msg/en";
import "blockly/blocks";

Blockly.setLocale(locale);
const BlocklyWorkspace = ({ initialXml, children, ...rest }) => {
  const { workspaceRef } = useBlockly();
  console.log("BlocklyWorkspace", workspaceRef);
  const blocklyDiv = useRef();
  const toolbox = useRef();

  useEffect(() => {
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        workspaceRef.current
      );
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
      }
    };
  }, [initialXml, rest, workspaceRef]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center bg-blue-500 text-white p-2">
        <h1 className="w-[20%] text-center font-bold">Toolbox</h1>
        <h1 className="w-[80%]">WorkSpace</h1>
      </div>
      <div className="w-[200px]" ref={toolbox}>
        {children}
      </div>

      <div ref={blocklyDiv} className="blockly-div" id="blockly-div" />
    </div>
  );
};

export default BlocklyWorkspace;
