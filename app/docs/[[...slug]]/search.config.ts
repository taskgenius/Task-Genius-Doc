// Search configuration for documentation

export const searchConfig = {
  // Search weights for different content types
  weights: {
    title: 10,
    heading: 5,
    content: 1,
    description: 3,
  },
  
  // Featured search terms with custom results
  featured: {
    "mcp": "/docs/mcp-integration",
    "ai": "/docs/mcp-integration", 
    "claude": "/docs/mcp-integration/clients/claude-desktop",
    "cursor": "/docs/mcp-integration/clients/cursor",
    "vscode": "/docs/mcp-integration/clients/vscode",
    "habit": "/docs/habit",
    "workflow": "/docs/workflows",
    "filter": "/docs/filtering",
    "progress": "/docs/progress-bars",
    "quick capture": "/docs/quick-capture",
    "project": "/docs/project",
    "inbox": "/docs/task-view/inbox-view",
    "forecast": "/docs/task-view/forecast-view",
    "matrix": "/docs/task-view/matrix-view",
    "timeline": "/docs/task-view/timeline-sidebar-view",
    "table": "/docs/task-view/table-view",
  },
  
  // Synonyms for better search
  synonyms: {
    "task": ["todo", "item", "action"],
    "view": ["layout", "display", "screen"],
    "filter": ["search", "query", "find"],
    "date": ["time", "schedule", "calendar"],
    "status": ["state", "stage", "phase"],
    "habit": ["routine", "streak", "daily"],
    "project": ["folder", "category", "group"],
  },
  
  // Exclude from search
  exclude: [
    "/api",
    "*.test.*",
    "*.spec.*",
  ]
};