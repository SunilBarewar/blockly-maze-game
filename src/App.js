// src/App.js
import React from "react";
import "./App.css";
import { BlocklyProvider } from "./contexts/BlocklyContext";
import BlocklyWorkspace from "./Blockly/BlocklyWorkspace/BlocklyWorkspace";
import CodeGeneratorButton from "./Blockly/CodeGenerate/CodeGeneratorButton";
import { Block, Value, Field, Shadow } from "./Blockly/BlocklyComponents";

import "./blocks/customblocks";
import "./generator/generator";
import BoatMaze from "./Blockly/MazeGame/MazeGame";

function App() {
  const [generatedCode, setGeneratedCode] = React.useState("");

  const handleCodeGenerated = (code) => {
    console.log(code);
    setGeneratedCode(code);
    // You can do more with the generated code here
  };

  return (
    <BlocklyProvider>
      <div className="flex flex-row">
        <div className="header w-[30%]">
          <h1 className="text-2xl">My Blockly App</h1>
          <CodeGeneratorButton
            onGenerate={handleCodeGenerated}
            className="generate-btn px-4 py-2 bg-blue-500 text-white rounded mt-4 "
          />
          <BoatMaze />
          <pre className="w-full bg-gray-50 p-4 rounded mt-4 overflow-x-auto">
            {generatedCode}
          </pre>
        </div>

        <div className="workspace-container w-[70%]">
          <BlocklyWorkspace
            readOnly={false}
            trashcan={true}
            media={"media/"}
            move={{
              scrollbars: false,
              drag: true,
              wheel: true,
            }}
            initialXml={`
              <xml xmlns="http://www.w3.org/1999/xhtml">
                
              </xml>
            `}
          >
            <Block type="move_forward" />
            <Block type="turn" />

            <Block type="controls_repeat" />
          </BlocklyWorkspace>
        </div>
      </div>
    </BlocklyProvider>
  );
}

export default App;
