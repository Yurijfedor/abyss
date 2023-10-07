import React, { useState } from "react";
import Block from "../block/Block";

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
    return blocks.find((block) => block.id === id);
  };

  const addBlock = (parentId: number | undefined) => {
    const newBlock: Block = {
      id: generateUniqueId(), // Генеруйте унікальний ідентифікатор
      name: "Новий блок", // Встановіть ім'я за замовчуванням
      subBlocks: [],
    };
    console.log(parentId);
    console.log(blocks);

    if (parentId !== undefined) {
      // Якщо є parentId, то шукайте батьківський блок за його id
      const parentBlock = findBlockById(blocks, parentId);
      console.log(parentBlock);
      if (parentBlock) {
        parentBlock.subBlocks.push(newBlock); // Додайте новий блок до підблоків батьківського блоку
      }
    } else {
      // Якщо parentId відсутній, то додаємо блок на верхній рівень
      blocks.push(newBlock);
    }

    setBlocks([...blocks]);
  };

  const confirmName = (blockId: number, newName: string) => {
    // Спочатку, знайдіть блок за його id
    const updatedBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        // Якщо це потрібний блок, оновіть його ім'я
        return {
          ...block,
          name: newName,
        };
      }
      return block;
    });

    // Оновіть стан блоків з новим ім'ям
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
  );
}

export default Schema;
