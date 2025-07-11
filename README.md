# Shift
A file manager built on electron

## Todos
- ~Wire Up the UI - 100% done~
- Sidebar
  - Shows places like home, desktop, trash and XDG base dirs.
  - ~Shows directory tree~
  - ~Toggle hidden files~
  - ~Presistant view~

- Content
  - Multiple layout options (grid, list)
  - Add breadcrumbs

- Context Menu
  - on selection
    - open; open in new tab, new window, terminal;
    - open with
    - cut, copy, paste, rename, copy path
    - move to trash
    - properties
  - on blank page
    - create new file, directory
    - select all, invert selection
    - sort files by
      - ascending, descending
      - name, size, modification time, file type
      - show hidden
      - properties

- Header
  - home, foward and backward button
  - location bar; go to the path in location bar; Ctrl + l to focus
  - history

- Footer
  - left side
    - no selection
      - total items count (hidden items count)
    - selection
      - selected file size
  - right side
    - free space (total space)

- ~Themes~
  - ~default, Gruvbox, Dracula, Nord, Solarized, Night owl, One dark~

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
# For windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```

