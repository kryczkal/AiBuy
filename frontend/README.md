# Spotify clone app


#### Install these extensions

- <b>EditorConfig for VS Code VS
  Marketplace</b> https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- <b>ES7+ React/Redux/React-Native
  snippets</b> https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets
- <b>ESLint</b> https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- <b>Prettier - Code
  formatter</b> https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- <b>Pretty TypeScript
  Errors</b> https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors
- <b>Stylelint</b> https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
- <b>Material Icon
  Theme</b> https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme

### VS Code settings configuration

Open VS Code settings `File -> Preferences -> Settings` and type in search bar `Edit in settings`,
next click on blue text `Edit in settings.json` and replace everything with this configuration and
save file after changes:

```{
  "editor.bracketPairColorization.independentColorPoolPerBracketType": true,
  "prettier.jsxSingleQuote": true,
  "prettier.singleQuote": true,
  "prettier.useTabs": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "explorer.confirmDragAndDrop": false,
  "terminal.explorerKind": "external",
  "debug.terminal.clearBeforeReusing": true,
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "workbench.tree.indent": 4,
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "prettier.printWidth": 120,
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.stylelint": true,
    "source.fixAll.eslint": true
  },
  "security.workspace.trust.untrustedFiles": "open",
  "workbench.startupEditor": "none",
  "explorer.confirmDelete": false,
  "stylelint.validate": ["css", "scss"],
  "explorer.copyRelativePathSeparator": "/",
  "editor.formatOnSave": true
}
```

## 💻 Commands

### Install packages

```
npm install
```

### Start application

```
npm start
```

### Build static files

```
npm build
```
