import React, { useState } from "react";
import Block from "../block/Block";
import "./Schema.css";

function Schema() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 1,
      name: "Перший блок", // Встановіть потрібне ім'я
      subBlocks: [], // Поки що немає підблоків
    },
  ]);

  const generateUniqueId = (): number => {
    // Генеруємо унікальний ідентифікатор, наприклад, на основі часу
    return new Date().getTime();
  };

  const findBlockById = (blocks: Block[], id: number): Block | undefined => {
    for (const block of blocks) {
      if (block.id === id) {
        return block;
      }

      if (block.subBlocks.length > 0) {
        const foundBlock = findBlockById(block.subBlocks, id);
        if (foundBlock) {
          return foundBlock;
        }
      }
    }

    return undefined;
  };

  const addBlock = (parentId: number | undefined) => {
    const newBlock: Block = {
      id: generateUniqueId(),
      name: "Новий блок",
      subBlocks: [],
    };

    setBlocks((prevBlocks) => {
      if (parentId !== undefined) {
        // Шукайте батьківський блок за parentId в попередньому стані
        const parentBlock = findBlockById(prevBlocks, parentId);

        if (parentBlock) {
          // Створіть копію батьківського блоку
          const updatedParentBlock = { ...parentBlock };

          // Додайте новий блок до підблоків батьківського блоку
          updatedParentBlock.subBlocks.push(newBlock);

          // Знайдіть позицію батьківського блоку в попередньому стані
          const parentBlockIndex = prevBlocks.findIndex(
            (block) => block.id === parentId
          );

          // Створіть копію попереднього стану з оновленим батьківським блоком
          const updatedBlocks = [...prevBlocks];
          updatedBlocks[parentBlockIndex] = updatedParentBlock;

          return updatedBlocks;
        }
      }

      // Якщо parentId === undefined або не знайдено батьківський блок,
      // додаємо новий блок на верхній рівень
      return [...prevBlocks, newBlock];
    });
    console.log(blocks);
  };

  const confirmName = (blockId: number, newName: string) => {
    // Функція для рекурсивного оновлення імені в ієрархії блоків
    const recursivelyUpdateName = (blocks: Block[]): Block[] => {
      return blocks.map((block) => {
        if (block.id === blockId) {
          // Якщо це потрібний блок, оновіть його ім'я
          return {
            ...block,
            name: newName,
          };
        } else if (block.subBlocks.length > 0) {
          // Якщо у блоку є підблоки, рекурсивно оновіть їх імена
          return {
            ...block,
            subBlocks: recursivelyUpdateName(block.subBlocks),
          };
        }
        return block;
      });
    };

    // Оновіть стан блоків з оновленим ім'ям
    const updatedBlocks = recursivelyUpdateName(blocks);
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (blockId: number) => {
    // Функція для рекурсивного видалення блоків та їх підблоків
    const recursivelyDeleteBlock = (blocks: Block[], id: number): Block[] => {
      return blocks.reduce((result, block) => {
        if (block.id === id) {
          // Якщо це потрібний блок, просто не додаємо його до результату
        } else if (block.subBlocks.length > 0) {
          // Якщо у блоку є підблоки, рекурсивно видаляємо їх
          const updatedSubBlocks = recursivelyDeleteBlock(block.subBlocks, id);
          result.push({
            ...block,
            subBlocks: updatedSubBlocks,
          });
        } else {
          // Якщо це блок без підблоків і не потрібний блок, додаємо його до результату
          result.push(block);
        }
        return result;
      }, [] as Block[]);
    };

    // Викликаємо рекурсивну функцію для видалення блоку та його підблоків
    const updatedBlocks = recursivelyDeleteBlock(blocks, blockId);

    // Оновлюємо стан блоків з оновленим списком блоків
    setBlocks(updatedBlocks);
  };

  return (
    <div className="schema">
      <div className="blocks-container">
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            onAddSubBlock={addBlock}
            onConfirmName={confirmName}
            onDeleteBlock={deleteBlock}
          />
        ))}
      </div>
    </div>
  );
}

export default Schema;
