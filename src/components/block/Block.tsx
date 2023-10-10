import React, { useState } from "react";
import { FaPlus, FaCheck, FaTrash, FaPen } from "react-icons/fa";
import "../schema/Schema.css";

interface Block {
  id: number;
  name: string;
  subBlocks: Block[];
  parentId?: number; // Додайте поле parentId
}

interface BlockProps {
  block: Block;
  onAddSubBlock: (blockId: number | undefined) => void;
  onConfirmName: (blockId: number, newName: string) => void;
  onDeleteBlock: (blockId: number) => void;
}

function Block({
  block,
  onAddSubBlock,
  onConfirmName,
  onDeleteBlock,
}: BlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(block.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onConfirmName(block.id, editedName);

    setEditedName(editedName);
    console.log(editedName);
    console.log(block.id);
  };

  const handleDeleteClick = () => {
    onDeleteBlock(block.id);
  };

  const handleAddSubBlockClick = () => {
    onAddSubBlock(block.id);
  };

  return (
    <div className="block">
      <div className="block-header">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          <div
            className={`block-name ${
              block.subBlocks.length > 0 ? "has-sub-blocks" : ""
            }`}
          >
            {block.name}
          </div>
        )}

        <div className="block-buttons">
          <button onClick={handleAddSubBlockClick}>
            <FaPlus /> {/* Кнопка для додавання підблоку */}
          </button>
          {isEditing ? (
            <button onClick={handleSaveClick}>
              <FaCheck /> {/* Кнопка для збереження */}
            </button>
          ) : (
            <button onClick={handleEditClick}>
              <FaPen /> {/* Кнопка для редагування */}
            </button>
          )}
          <button onClick={handleDeleteClick}>
            <FaTrash /> {/* Кнопка для видалення */}
          </button>
        </div>
      </div>
      {block.subBlocks.length > 1 && (
        <div
          className="horizontal-line"
          style={{
            width: `calc(100% - ${100 / block.subBlocks.length}%)`,
          }}
        ></div>
      )}
      {block.subBlocks.length > 0 && (
        <div className="sub-blocks">
          {block.subBlocks.map((subBlock) => (
            <Block
              key={subBlock.id}
              block={subBlock}
              onAddSubBlock={onAddSubBlock}
              onConfirmName={onConfirmName}
              onDeleteBlock={onDeleteBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Block;
