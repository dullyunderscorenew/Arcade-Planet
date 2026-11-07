garantee# Arcade Planet

> **Status: Work in progress. This project is not ready for download or general use.**
>
> This is the codebase of my private project Arcade Planet.
> The codebase has not been optimized, and the security mechanisms have not been fully reviewed. The project has so far been developed entirely with Claude, for this public repo i plan on reviewing and optimizing the Code.
> Some parts of this or any other README's may be outdated while its a WIP Project.
> So a simple reminder: Never blindly trust a GitHub project!
> Use at your own risk.

Arcade Planet is a standalone desktop gaming frontend built with Electron for Linux and Windows. It combines an animated system carousel with video support, multiple game-list layouts, settings, music, themes, a screensaver, a startup screen, and online Friends & Lobby features. Games are launched using actual emulators.

## Core concept

Only the app needs to be installed initially. Everything else is installed or downloaded on demand:

- **Games:** Games for all systems are discovered in their respective ROM directories. The default location is `~/ROMs/<system>`.
  
- **Emulators:** When you select an emulator that is not installed yet (for example, when launching a game or opening **ALTERNATIVE EMULATORS**), the app offers to install it as a **Flatpak from Flathub**. Installation is per-user and does not require an administrator password. The emulator is granted access to the ROM directory; some emulators store save files alongside the game. Missing **RetroArch cores** are downloaded from the official libretro server.
  
- **Gamescope:** Gamescope is disabled and not installed by default. When you enable **SETTINGS → EMULATORS → GAMESCOPE FULLSCREEN** (or use the corresponding Quick Settings action), the app offers to install it through the system package manager. This requires an administrator password. The app then restarts itself under Gamescope.

- **Arcade Planet base theme:** Arcade Planet is the foundation of the interface, not a replaceable theme. On first launch, the artwork by EvilDindon is downloaded from GitHub at a pinned version and combined with the ES-DE port in `theme/`. You can select a different theme under **THEME** if you prefer another look.

- **Database:** Application data is stored in a single **SQLite database** rather than separate XML/JSON data files.

## Running from source

Requirements: **Node.js 22.13 or later** and **npm**.

```bash
cd ~/ES-DE/arcadeplanet-es-de
npm install
npm start
```

- Toggle fullscreen with **F11**. To quit, go to **MAIN MENU → QUIT ARCADE PLANET**.

- **Data directory:** `~/.config/arcadeplanet/`. It contains `arcadeplanet.sqlite`, `base-theme/`, `music/`, `images/`, `themes/` (for custom themes), and `logs/`. To reset the app completely, quit it and delete this directory.

- **Logs:** `logs/arcadeplanet.log` inside the data directory. On Windows, the log is located at `%APPDATA%\arcadeplanet\logs\`. The previous session's log is named `arcadeplanet.old.log`. Logs include, among other things, game launches, friend connections, and the melonDS bridge (who is hosting and who is joining).

- **Standalone operation:** Arcade Planet does not require or read an ES-DE installation. Everything is stored in its own data directory (`~/.config/arcadeplanet/`): the database, base theme, music, `media/` (images and videos organized by system, using the structure `<system>/<covers|screenshots|videos …>/<game>.<extension>`), custom themes, and scripts.

- **Custom event scripts:** As with ES-DE, custom event scripts are stored in `<data-directory>/scripts/<event>/`, for example `game-start` and `game-end`.

**Build an AppImage:** Run `npm run dist:linux`. The output is `dist/ArcadePlanet-<version>-x86_64.AppImage`. The CI workflow **Electron (Linux)** builds the AppImage whenever the project changes (except for documentation-only changes), launches it under Xvfb, and stores it as a workflow artifact.

**Run only the server** (for development, testing, or using the interface in a regular browser):

```bash
node server.js [--port 8484] [--data <directory>] [--demo auto|on|off]
```

Then open <http://127.0.0.1:8484/> in your browser.

## Development with VSCodium

Open `~/ES-DE/arcadeplanet-es-de` in VSCodium (**File → Open Folder**). VSCodium should recommend the project's extensions. If it does not, open **Extensions**, filter by `@recommended`, and select **Install All**. All recommended extensions are available from Open VSX.

| Extension | Purpose |
| --- | --- |
| ESLint, Prettier, EditorConfig, Error Lens, Path Intellisense | Lint JavaScript and format it on save according to `eslint.config.js` and `.prettierrc.json`; display errors inline and provide path completion in imports. |
| XML (Red Hat) | Edit theme files in `theme/es-de/*.xml`. |
| SQLite Viewer | Inspect `data/seed.sqlite` and the app database at `~/.config/arcadeplanet/arcadeplanet.sqlite`. |
| Code Spell Checker + German | Check spelling in menu text and documentation. Project-specific terms are already included. |
| markdownlint, Markdown All in One | Work with the README and files in `docs/`. |
| ShellCheck, Ruff, clangd | Work with scripts in `tools/` (Shell, Python, and the C++ test program). |
| GitHub Actions, Git Graph | Inspect workflows and Git history. |

- **Launch and debug:** Use the **Run and Debug** sidebar. Run the `npm install` task once beforehand. Available configurations include **Launch App (Electron)**, **Debug App + UI** (breakpoints in the server and in `public/js`), **Server Only (Browser)** (using the separate data directory `data/dev`), and **Online Test on One Machine**.

- **Tasks:** Open **Terminal → Run Task**. `Ctrl+Shift+B` launches the app. Tasks include syntax checks, ESLint, Prettier, the online test, a network test with simulated internet access (Linux, `sudo`), building an AppImage or Windows installer, rebuilding the seed database, viewing the app log, and starting the Linux ↔ Windows online test in CI (using `gh`).

- **Snippets:** The snippets are defined in `.vscode/arcadeplanet.code-snippets` and use the `ap-` prefix. Examples include `ap-menu`, `ap-entry`, `ap-settings-menu`, `ap-msgbox`, `ap-confirm`, `ap-api-route`, `ap-api-client`, `ap-db-method`, `ap-table`, `ap-platform`, `ap-log`, `ap-net-action`, and `ap-test-wait`. Markdown snippets include `ap-chronik` and `ap-fallstrick`.

- `jsconfig.json` enables Go to Definition and autocomplete across ES modules. `.editorconfig` defines indentation and line endings (`.bat` and `.ps1` files use CRLF).

## Controls

Use an Xbox or PlayStation gamepad, or the keyboard. The controls follow the same general layout as ES-DE:

| Key | Function |
| --- | --- |
| Arrow keys | Navigate |
| Enter | A (select) |
| Backspace | B (back) |
| Delete | X (view media / screensaver) |
| Insert | Y (favorite) |
| F1 | Select/Back (game-list options) |
| Esc | Start (settings) |
| Page Up / Page Down | L / R |
| Home / End | Triggers |
| F2 / F3 | Stick clicks (random game) |

**Settings (START):** Categories are shown on the left and can be switched with LB/RB. Entries appear in the center, with their descriptions on the right. Press A to change a value (the available options appear on the right), X to reset it to its default, Y to search across all settings, and B to go back one page.

**Mouse:** Click to select; click again to open or launch. Right-click goes back, and the mouse wheel scrolls. The buttons in the hint bar at the bottom of the screen are also clickable.

**Settings sections:** **GAMES & FOLDERS**, **EMULATORS** (with a separate page for each system, such as **NINTENDO DS** and **PLAYSTATION 2**, as well as **EMULATOR PER SYSTEM** and game-launch settings), **CONTROLS**, **SCRAPER**, **APPEARANCE**, **GAME LISTS**, **AUDIO**, **FRIENDS & LOBBY**, **ADVANCED**, and **HELP**. Press Y to search across all sections, including their subpages.

### Built-in RetroArch cores

RetroArch cores run directly inside the app window through the standalone `aplr` program; the RetroArch application itself is not required. They appear in each emulator list under **ARCADE PLANET (BUILT-IN)**. A core is downloaded from the libretro server the first time it is launched.

The in-game menu can be opened with **Esc**, **F1**, **GUIDE**, or **BACK+START**. It provides save states, core options, video and shader settings, cheats, disc controls, and achievements. Under **EMULATORS → RETROARCH CORES**, you can view cores, update all cores, manage the BIOS directory, and download cheats and shaders. The menu also provides **RetroAchievements** support (account, Hardcore Mode, and in-game achievement notifications) and an option to prefer Vulkan.

OpenGL and Vulkan cores run with full GPU performance. On Wayland, the app uses XWayland for this functionality; this can be disabled.

In a lobby (**FRIENDS & LOBBY**), players can join one another by launching the same game with the same core. The session runs online in sync, with players 1–4 assigned to the controller ports. The external RetroArch installation remains available under **RETROARCH CORES (EXTERNAL)** (currently Linux only).

### Nintendo DS controls

Go to **EMULATORS → NINTENDO DS → CONFIGURE DS BUTTONS** and press the controller button you want to assign to each DS button, one after another. The built-in emulator uses the mapping immediately.

The optional **APPLY BUTTONS TO MELONDS** setting (disabled by default) also applies the mapping to standalone melonDS every time it starts. The app restores the previous melonDS mappings afterward. This feature is currently Linux-only.

### Built-in Nintendo DS emulator

DS games run directly inside the app using the melonDS core (`native/apds`, GPLv3), with no installation required. The emulator has its own pause menu, accessible with **Esc**, **F1**, **GUIDE**, or right-click. It offers save/load states, screen layout options, restart, and quit. The touchscreen can be controlled with the mouse.

Keyboard controls:

| Key | DS control |
| --- | --- |
| Arrow keys | D-pad |
| X | A |
| Z / Y | B |
| S | X |
| A | Y |
| Q / W | L / R |
| Enter | Start |
| Backspace | Select |
| Tab | Fast-forward |

In a lobby, everyone who launches the same game in the built-in emulator is automatically connected and can play together. DS wireless communication is carried over the direct connection; no LAN is required. Other DS emulators remain selectable under **EMULATORS → NINTENDO DS → EMULATOR** (currently Linux only).

### Nintendo DS games in a lobby (standalone melonDS)

When **AUTO-START LAN PLAY** is enabled under **EMULATORS → NINTENDO DS** (enabled by default), the app launches its own melonDS build for lobby games (`tools/melonds-ap`, GPLv3). The lobby host starts hosting immediately; the other players wait for the host and join automatically. This feature is currently Linux-only.

### First-time setup and help

On first launch, a setup wizard guides you through your player name, ROM directory, controller, volume, and artwork. You can open it again later under **SETTINGS → HELP**. The Help section also contains controls, getting-started information, the app version, and the data directory location.

## Launching games

Game launching follows ES-DE's approach: launch commands and emulator search rules are based on the MIT-licensed ES-DE files and are stored in the database. Custom systems in the database (`origin = 'esde'`) take precedence. The emulator's own settings remain in effect.

- Without Gamescope, the app window minimizes when a game starts and returns when the game exits. Music and videos are paused while the game is running.

- **ALTERNATIVE EMULATORS** shows whether each emulator is installed.

- If an emulator is missing, you can choose **INSTALL** or **SELECT EXECUTABLE MANUALLY**. The latter is for emulators already present somewhere on your system—for example, melonDS downloaded as a ZIP archive from its website (extract it first; do not launch it from inside the ZIP) or as an AppImage. The app remembers the selected location in the `emulator_paths` table.

- Every launch (command, output, and exit code) and every installation is recorded in the database (`launches`, `installs`).

## Scraper (artwork and game metadata)

Go to **SETTINGS → SCRAPER → SCRAPE NOW** (or press START). To scrape an individual game, open the game-list options and select **EDIT METADATA → SCRAPE**. You can hide the progress display while scraping continues in the background. The game list is refreshed when scraping finishes.

- **LIBRETRO (no account required; default):** Games are identified by checksum (CRC32; for ZIP files, the checksum is read from the ZIP directory). If no match is found, the scraper falls back to the filename or title. Metadata includes the game name, year, developer, publisher, genre, and player count. Artwork is downloaded from `thumbnails.libretro.com` (covers, screenshots, title screens, and logos). A GitHub mirror is used if the server is unavailable. Descriptions and videos are not provided.

- **SCREENSCRAPER:** Adds descriptions (with selectable language), videos, back covers, 3D boxes, and manuals. It requires the app's developer credentials (`ARCADEPLANET_SS_DEVID` / `ARCADEPLANET_SS_DEVPASSWORD`) or `data/screenscraper-dev.json`. CI builds this file from the `SCREENSCRAPER_DEVID` / `SCREENSCRAPER_DEVPASSWORD` secrets. Creating your own free account at `screenscraper.fr` under **ACCOUNT SETTINGS** allows more requests. Any information that ScreenScraper cannot find is supplemented by libretro.

- Media is stored in `<data-directory>/media/<system>/<type>/<game>.<extension>`. The libretro databases are stored in `<data-directory>/scraper/libretro/` and are refreshed every 30 days. The scraper does not overwrite fields that you have edited manually (using **EDIT GAME DATA**). When **OVERWRITE FILES AND DATA** is disabled, only missing information is added.

## Friends & Lobby

### Friends and lobby access

- **Friend code:** Each app installation has its own key, which is used to generate a friend code. Find it under **FRIENDS & LOBBY → MY FRIEND CODE** (for example, `K7QF-M2XA-9PZD`). Another player enters it under **ADD FRIEND**; you then accept the request. No account or password is required.

- **Lobby (not tied to a specific game):** Select **CREATE LOBBY** and choose either **ALL FRIENDS** (optionally protected by a password) or **INVITE ONLY**. Friends can see an open lobby in their friend list and join it. The host can also invite friends. Invitations appear immediately for online friends or the next time the recipient starts the app. Everyone in the lobby can see what the others are currently playing.

- **Playing together:** When two lobby members launch the same game, the lobby displays **TOGETHER: …**.

### Nintendo DS multiplayer (melonDS)

One player selects **Multiplayer → Host LAN game** in melonDS; the other selects **Multiplayer → Join LAN game**. The host's game appears in the joiner's list automatically, so no IP address needs to be entered. Then select the regular DS multiplayer mode in the game itself (for example, **Mario Kart DS → Multiplayer**). Support for other systems is planned.

Before launching the game, the app sets your player name in melonDS and adjusts the data reception timeout for the connection. The default value of 25 ms can be too low for internet play. Your previous settings are restored after the game exits. A backup is stored as `melonDS.toml.bak-arcadeplanet`.

### How it works

- **Discovery and coordination:** Public **Nostr relays** (free, independent messaging servers) are used to find friends and coordinate sessions. Messages are end-to-end encrypted; relays can only see that two keys are communicating, not the message contents.

- **Gameplay connection:** Gameplay uses a **direct UDP connection** between the computers, established with STUN-assisted hole punching. Devices on the same home network connect directly through their LAN addresses. Traffic is encrypted with AES-256-GCM.

- **Connection fallback:** If a direct connection cannot be established (for example, because of a very restrictive router or certain mobile networks), the lobby itself still works through the relays, but multiplayer gameplay does not. In that case, a UDP port-forwarding rule for port `47870` on the router or a VPN such as Tailscale may help.

### Settings and implementation

Under **FRIENDS & LOBBY → SETTINGS**, you can enable or disable online features, set your player name, configure custom relays and STUN servers, and check server status. DS multiplayer settings are located under **EMULATORS → NINTENDO DS**.

Implementation:

- `lib/net/service.js` — friends and lobby service
- `lib/net/transport.js` — direct connections
- `lib/net/nds-bridge.js` — melonDS bridge
- `lib/net/nostr.js`, `lib/net/secp256k1.js`, `lib/net/box.js` — Nostr and cryptographic functionality
- `public/js/menus/online.js` — Friends & Lobby menus

### Security notes

The following points are based on a project security review dated **November 1, 2026**. They are project-reported findings, not a claim of an independent security audit.

- No router port forwarding is required for normal operation. Packets arriving on UDP port `47870` without a valid session key are ignored.

- All traffic is end-to-end encrypted with AES-256-GCM. A new key is generated for each connection, and the sender is authenticated using a signature or a shared key. Relays cannot read or forge the encrypted messages.

- Only accepted friends can see when you are online, view your lobby, or join it. Direct connections are restricted to friends and lobby members. The host checks lobby passwords, with one attempt allowed every two seconds.

- Incoming data from other players is limited to data such as names and game titles; it does not contain commands. Only text is displayed.

- The melonDS bridge forwards data only between the two melonDS instances, only when they are running the same game, and only to a melonDS instance that is currently hosting locally.

- The app UI communicates with the local server using a secret token generated at each startup. Requests with an unexpected host name (DNS rebinding) are rejected. The stated goal is to prevent websites or other programs from controlling the app.

- **Limitations:** Other lobby members can see your IP addresses, as with any P2P game. Relays can see your IP address and who exchanges messages with whom and when, but not the message contents. The app's key is stored unencrypted in its database. Other players might be able to exploit bugs in melonDS, so only play with people you trust.

### Windows support

The same features are available on Windows. Emulators can be installed on demand using **winget**. Game launching follows the ES-DE approach on Windows as well: it does not use `cmd.exe`, quotes paths, and supports search rules that include the Windows Registry, winget installations, and Program Files installations.

When prompted by Windows Firewall on first launch, allowing access on **Private networks** is sufficient. Build the per-user installer (no administrator rights required) with:

```bash
npm run dist:win
```

The output is `dist/ArcadePlanet-Setup.exe`. The CI workflow is **Electron (Windows)**. The `app-windows-latest` release is created with the `[app-release]` marker.

## Why a single page and JavaScript? (Efficiency)

The app uses a **single** `index.html`; JavaScript builds the views and menus. This is a common and efficient approach for Electron: there are no page navigations, and the theme, text, and data are loaded once and kept in memory. Long game lists render only the visible rows, and views are cached.

Measured under Xvfb with software rendering at 1280×720:

- Page JavaScript memory: approximately 5 MB
- All Electron processes combined: approximately 500 MB. Most of this is Chromium itself and decoded theme images/videos.

## Project structure

| Path | Description |
| --- | --- |
| `electron/main.js` | Electron app shell: starts the server in-process, creates a fullscreen window, handles Gamescope restarts, and moves the window out of the way when a game launches. |
| `server.js` | Standalone server (without Electron). |
| `lib/app-server.js` | HTTP server and API (launching, installation, settings, theme files, etc.). |
| `lib/schema.js`, `lib/db.js` | Database implementation (see [`docs/DATENBANK.md`](docs/DATENBANK.md)). |
| `lib/scanner.js` | Scans ROM directories (ES-DE-style) and matches media files. |
| `lib/files.js` | Directory/file utilities and media directory layout. |
| `lib/xml.js` | XML reader used by `tools/build-seed.mjs`. |
| `lib/launcher.js` | ES-DE-style game launching (variables, search rules, cores, and event scripts). |
| `lib/installer.js` | On-demand installation (Flatpak, RetroArch cores, Gamescope). |
| `lib/theme-setup.js`, `lib/zip.js` | Set up the Arcade Planet base theme on first launch. |
| `data/seed.sqlite`, `tools/build-seed.mjs` | Seed data derived from ES-DE (MIT). |
| `public/js/theme/` | Theme engine (ES-DE theme XML, variants, color schemes, Lottie, carousel, etc.). |
| `public/js/views/`, `public/js/ui/`, `public/js/menus/` | Views, menu system, and menus. |
| `lib/net/` | Friends & Lobby (keys, Nostr, direct connections, melonDS bridge). |
| `lib/scraper/` | Scraper: `index.js` (workflow), `libretro.js`, `rdb.js` (libretro databases), `screenscraper.js`, `systems.js` (system mapping), and `hash.js`. |
| `public/res/` | ES-DE artwork (MIT). |
| `esde-resources/` | Custom artwork in the ES-DE resource format (startup image, switches); packaged as `es-res/`. |
| `theme/` | ES-DE port of the **Arcade Planet** theme (XML, animations, sounds, extra artwork). It is layered over the original artwork on first launch and packaged as `theme-port/`. |
| `tools/build-seed.mjs` | Rebuilds the seed data. |
| `tools/net-test/` | Network and online tests (simulated internet, single-machine tests, and Linux ↔ Windows tests). |
| `tools/theme/` | Theme asset generators (animations, sounds, extra artwork, game-list and system XML). |
| `tools/ci/push-logs.sh` | Pushes CI logs to the `ci-logs` branch. |
| `docs/` | [`PROJEKTWISSEN.md`](docs/PROJEKTWISSEN.md) (handover/project history) and [`DATENBANK.md`](docs/DATENBANK.md). |
| `.vscode/` | VSCodium settings, tasks, launch configurations, snippets, and recommended extensions. |

## License

Arcade Planet is free software licensed under **GPLv3 or later** ([`LICENSE`](LICENSE)). Theme files, ES-DE components, and melonDS retain their respective licenses. See [`LICENSE.md`](LICENSE.md) for an overview.
