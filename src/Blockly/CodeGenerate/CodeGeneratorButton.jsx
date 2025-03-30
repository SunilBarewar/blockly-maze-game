// src/components/CodeGeneratorButton/CodeGeneratorButton.jsx
import React from "react";
import { useBlockly } from "../../contexts/BlocklyContext";

const CodeGeneratorButton = ({ onGenerate, children, ...props }) => {
  const { generateCode } = useBlockly();

  const handleClick = () => {
    const code = generateCode();
    if (onGenerate) {
      onGenerate(code);
    } else {
      console.log(code);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children || "Generate Code"}
    </button>
  );
};

export default CodeGeneratorButton;
