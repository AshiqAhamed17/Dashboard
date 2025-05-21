import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNotionStore = create(
  persist(
    (set, get) => ({
      pages: [],
      activePageId: null,
      blocks: {},

      // Page actions
      createPage: (title) => {
        const newPage = {
          id: uuidv4(),
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          pages: [...state.pages, newPage],
          activePageId: newPage.id,
          blocks: {
            ...state.blocks,
            [newPage.id]: [],
          },
        }));
      },

      updatePage: (pageId, updates) => {
        set((state) => ({
          pages: state.pages.map((page) =>
            page.id === pageId
              ? { ...page, ...updates, updatedAt: new Date().toISOString() }
              : page
          ),
        }));
      },

      deletePage: (pageId) => {
        set((state) => {
          const { [pageId]: _, ...remainingBlocks } = state.blocks;
          return {
            pages: state.pages.filter((page) => page.id !== pageId),
            activePageId:
              state.activePageId === pageId ? null : state.activePageId,
            blocks: remainingBlocks,
          };
        });
      },

      setActivePage: (pageId) => {
        set({ activePageId: pageId });
      },

      // Block actions
      addBlock: (pageId, type, content = "") => {
        const newBlock = {
          id: uuidv4(),
          type,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          blocks: {
            ...state.blocks,
            [pageId]: [...(state.blocks[pageId] || []), newBlock],
          },
        }));
        return newBlock.id;
      },

      updateBlock: (pageId, blockId, updates) => {
        set((state) => ({
          blocks: {
            ...state.blocks,
            [pageId]: state.blocks[pageId].map((block) =>
              block.id === blockId
                ? { ...block, ...updates, updatedAt: new Date().toISOString() }
                : block
            ),
          },
        }));
      },

      deleteBlock: (pageId, blockId) => {
        set((state) => ({
          blocks: {
            ...state.blocks,
            [pageId]: state.blocks[pageId].filter(
              (block) => block.id !== blockId
            ),
          },
        }));
      },

      // Todo list actions
      toggleTodo: (pageId, blockId, todoIndex) => {
        set((state) => {
          const block = state.blocks[pageId].find((b) => b.id === blockId);
          if (!block || block.type !== "todo") return state;

          const updatedTodos = [...block.content];
          updatedTodos[todoIndex] = {
            ...updatedTodos[todoIndex],
            completed: !updatedTodos[todoIndex].completed,
          };

          return {
            blocks: {
              ...state.blocks,
              [pageId]: state.blocks[pageId].map((b) =>
                b.id === blockId
                  ? {
                      ...b,
                      content: updatedTodos,
                      updatedAt: new Date().toISOString(),
                    }
                  : b
              ),
            },
          };
        });
      },

      // Resource integration
      addResourceToBlock: (pageId, blockId, resource) => {
        set((state) => {
          const block = state.blocks[pageId].find((b) => b.id === blockId);
          if (!block) return state;

          const updatedContent = {
            ...block.content,
            resources: [...(block.content.resources || []), resource],
          };

          return {
            blocks: {
              ...state.blocks,
              [pageId]: state.blocks[pageId].map((b) =>
                b.id === blockId
                  ? {
                      ...b,
                      content: updatedContent,
                      updatedAt: new Date().toISOString(),
                    }
                  : b
              ),
            },
          };
        });
      },
    }),
    {
      name: "notion-storage",
    }
  )
);

export default useNotionStore;
