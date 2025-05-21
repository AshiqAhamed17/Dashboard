import MDEditor from "@uiw/react-md-editor";
import {
  FileText,
  Link,
  ListTodo,
  Plus,
  Search,
  Trash2,
  Type,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { resources } from "../data/resources";
import useNotionStore from "../store/notionStore";

const BlockTypes = {
  TEXT: "text",
  TODO: "todo",
  RESOURCE: "resource",
};

const BlockIcons = {
  [BlockTypes.TEXT]: Type,
  [BlockTypes.TODO]: ListTodo,
  [BlockTypes.RESOURCE]: Link,
};

const Notion = () => {
  const {
    pages,
    activePageId,
    blocks,
    createPage,
    updatePage,
    deletePage,
    setActivePage,
    addBlock,
    updateBlock,
    deleteBlock,
    toggleTodo,
    addResourceToBlock,
  } = useNotionStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  const activePage = pages.find((page) => page.id === activePageId);
  const activeBlocks = activePage ? blocks[activePage.id] || [] : [];

  const handleCreatePage = () => {
    if (newPageTitle.trim()) {
      createPage(newPageTitle.trim());
      setNewPageTitle("");
      setIsCreatingPage(false);
    }
  };

  const handleAddBlock = (type) => {
    if (!activePageId) return;

    let initialContent = "";
    if (type === BlockTypes.TODO) {
      initialContent = [{ text: "New task", completed: false }];
    }

    addBlock(activePageId, type, initialContent);
  };

  const handleUpdateBlock = (blockId, content) => {
    if (!activePageId) return;
    updateBlock(activePageId, blockId, { content });
  };

  const handleToggleTodo = (blockId, todoIndex) => {
    if (!activePageId) return;
    toggleTodo(activePageId, blockId, todoIndex);
  };

  const handleAddResource = (blockId, resource) => {
    if (!activePageId) return;
    addResourceToBlock(activePageId, blockId, resource);
  };

  const handleDeleteBlock = (blockId) => {
    if (!activePageId) return;
    deleteBlock(activePageId, blockId);
  };

  const renderBlockContent = (block) => {
    switch (block.type) {
      case BlockTypes.TEXT:
        return (
          <MDEditor
            value={block.content}
            onChange={(value) => handleUpdateBlock(block.id, value)}
            preview="edit"
            height={200}
            className="w-full"
          />
        );
      case BlockTypes.TODO:
        return (
          <div className="space-y-2">
            {block.content.map((todo, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(block.id, index)}
                />
                <span
                  className={
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }
                >
                  {todo.text}
                </span>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                handleUpdateBlock(block.id, [
                  ...block.content,
                  { text: "New task", completed: false },
                ])
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        );
      case BlockTypes.RESOURCE:
        return (
          <div className="space-y-2">
            <select
              className="w-full p-2 rounded-md border border-input bg-background"
              onChange={(e) => {
                const resource = resources
                  .flatMap((cat) => cat.items)
                  .find((r) => r.name === e.target.value);
                if (resource) handleAddResource(block.id, resource);
              }}
            >
              <option value="">Select a resource...</option>
              {resources.map((category) => (
                <optgroup key={category.title} label={category.title}>
                  {category.items.map((resource) => (
                    <option key={resource.name} value={resource.name}>
                      {resource.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {block.content.resources?.map((resource, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {resource.type}
                    </p>
                  </div>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Open →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderBlock = (block) => {
    const Icon = BlockIcons[block.type];
    return (
      <Card
        key={block.id}
        className="p-6 group relative border-2 hover:border-primary/20 transition-colors"
      >
        <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => handleDeleteBlock(block.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-base font-medium text-foreground">
            {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
          </span>
        </div>
        {renderBlockContent(block)}
      </Card>
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 border-r bg-white p-6 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Pages</h2>
            <Button
              variant="default"
              size="icon"
              onClick={() => setIsCreatingPage(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {isCreatingPage && (
            <div className="flex items-center space-x-2">
              <Input
                placeholder="New page title..."
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreatePage();
                  if (e.key === "Escape") setIsCreatingPage(false);
                }}
                autoFocus
                className="h-10 text-base border-2 focus:border-blue-500"
              />
              <Button
                onClick={handleCreatePage}
                className="bg-blue-600 hover:bg-blue-700 text-white h-10 shadow-md"
              >
                Create
              </Button>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-base border-2 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            {pages
              .filter((page) =>
                page.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((page) => (
                <div
                  key={page.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer group transition-all ${
                    activePageId === page.id
                      ? "bg-blue-100 border-2 border-blue-500 shadow-md"
                      : "hover:bg-gray-100 border-2 border-transparent"
                  }`}
                  onClick={() => setActivePage(page.id)}
                >
                  <div className="flex items-center gap-3">
                    <FileText
                      className={`h-5 w-5 ${
                        activePageId === page.id
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`truncate text-base ${
                        activePageId === page.id
                          ? "text-blue-900 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {page.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePage(page.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {activePage ? (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-900">
                {activePage.title}
              </h1>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleAddBlock(BlockTypes.TEXT)}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 shadow-md"
                >
                  <Type className="h-5 w-5 mr-2" />
                  Add Text
                </Button>
                <Button
                  onClick={() => handleAddBlock(BlockTypes.TODO)}
                  className="bg-green-600 hover:bg-green-700 text-white h-10 px-4 shadow-md"
                >
                  <ListTodo className="h-5 w-5 mr-2" />
                  Add Todo
                </Button>
                <Button
                  onClick={() => handleAddBlock(BlockTypes.RESOURCE)}
                  className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 shadow-md"
                >
                  <Link className="h-5 w-5 mr-2" />
                  Add Resource
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {activeBlocks.map((block) => {
                const BlockIcon = BlockIcons[block.type];
                return (
                  <Card
                    key={block.id}
                    className="p-6 group relative border-2 hover:border-blue-200 transition-colors bg-white shadow-md"
                  >
                    <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                        onClick={() => handleDeleteBlock(block.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <BlockIcon className="h-5 w-5 text-blue-600" />
                      <span className="text-base font-medium text-gray-900">
                        {block.type.charAt(0).toUpperCase() +
                          block.type.slice(1)}{" "}
                        Block
                      </span>
                    </div>
                    {renderBlockContent(block)}
                  </Card>
                );
              })}
            </div>

            {/* Progress bar */}
            {activeBlocks.length > 0 && (
              <div className="mt-12 p-6 bg-white rounded-lg border-2 border-blue-100 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-gray-900">
                    Progress
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-base px-3 py-1 bg-blue-100 text-blue-800"
                  >
                    {Math.round(
                      (activeBlocks
                        .filter((b) => b.type === BlockTypes.TODO)
                        .flatMap((b) => b.content)
                        .filter((t) => t.completed).length /
                        activeBlocks
                          .filter((b) => b.type === BlockTypes.TODO)
                          .flatMap((b) => b.content).length) *
                        100
                    )}
                    %
                  </Badge>
                </div>
                <Progress
                  value={
                    (activeBlocks
                      .filter((b) => b.type === BlockTypes.TODO)
                      .flatMap((b) => b.content)
                      .filter((t) => t.completed).length /
                      activeBlocks
                        .filter((b) => b.type === BlockTypes.TODO)
                        .flatMap((b) => b.content).length) *
                    100
                  }
                  className="h-3 bg-blue-100"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-6">
            <FileText className="h-16 w-16 text-blue-400" />
            <p className="text-xl">Select or create a page to get started</p>
            <Button
              onClick={() => setIsCreatingPage(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 text-base shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notion;
