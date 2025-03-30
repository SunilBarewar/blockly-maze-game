// src/contexts/BlocklyContext.js
import { javascriptGenerator } from "blockly/javascript";
import React, { createContext, useContext, useRef } from "react";

const BlocklyContext = createContext();

export const BlocklyProvider = ({ children }) => {
  const workspaceRef = useRef(null);

  const generateCode = () => {
    if (!workspaceRef.current) return "";
    return javascriptGenerator.workspaceToCode(workspaceRef.current);
  };

  return (
    <BlocklyContext.Provider value={{ workspaceRef, generateCode }}>
      {children}
    </BlocklyContext.Provider>
  );
};

export const useBlockly = () => {
  const context = useContext(BlocklyContext);
  if (!context) {
    throw new Error("useBlockly must be used within a BlocklyProvider");
  }
  return context;
};
