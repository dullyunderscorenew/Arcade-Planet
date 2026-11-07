# Licenses

Arcade Planet is free software licensed under the **GNU General Public License, version 3 or later**.

Copyright © 2026 dullyunderscorenew. Some components come from other projects or authors and remain under their respective licenses.

| Component | Contents | License |
| --- | --- | --- |
| `theme/` | ES-DE theme port: `capabilities.xml`, `theme.xml`, `es-de/*.xml`, animations (`_art/anim/`) | **CC BY-NC-SA 4.0** — Adaptation of the “Arcade Planet” theme by EvilDindon; see [`LICENSES/CC-BY-NC-SA-4.0.md`](LICENSES/CC-BY-NC-SA-4.0.md) |
| `theme/_art/sounds/ap_*.wav` | Custom-created menu sounds (generator: `tools/theme/gen_sounds.py`) | CC BY-NC-SA 4.0 (same as the theme) |
| `theme/_art/{sprites,sprites2,sprites3,controllers,Colorlogos,wheel,wheelv,extra}/{music,quicksettings,lanlobby}*` | Custom-drawn artwork for “Music”, “Quick Settings”, and “LAN Lobby” (generator: `tools/theme/gen_extra_art.py`; Saira font, OFL) | CC BY-NC-SA 4.0 |
| `esde-resources/graphics/splash.svg` | Splash screen based on theme artwork | CC BY-NC-SA 4.0 |
| `esde-resources/graphics/on.svg`, `checkbox_checked.svg`, `public/res/` | Original or recolored ES-DE graphics | MIT (ES-DE); see [`LICENSES/ES-DE-MIT.txt`](LICENSES/ES-DE-MIT.txt) |
| `data/seed.sqlite` | Base data (systems, launch commands, search rules, translations) derived from ES-DE resources | MIT (ES-DE) |
| `electron/`, `lib/`, `public/js/`, `public/*.html`/`*.css`, `server.js`, `tools/`, `.vscode/` | Original project code | **GPLv3 or later**; see [`LICENSES/GPL-3.0.txt`](LICENSES/GPL-3.0.txt) |
| `native/apds/` | Built-in DS emulator: melonDS core (© melonDS team, GPLv3) with a custom application wrapper | GPLv3 or later |
| `tools/melonds-ap/arcadeplanet-lan.patch` | Modification to melonDS (LAN startup via command line) | GPLv3 or later |
| `README.md`, `docs/` | User documentation and project documentation | CC BY-NC-SA 4.0 |

## Intentionally not included

The following components belong to the original theme or to third parties. Instead of redistributing them in this repository, the app downloads them directly from the original repository on first launch:

- The original theme itself (artwork, backgrounds, system logos, controller graphics, sprites, and background music `ArcadePlanetBGMusic.mp3`). Source: <https://github.com/EvilDindon/ES-THEME-ARCADEPLANET>
- Fonts (Saira, Bank Gothic, and others). The app uses the fonts included in the downloaded theme. Saira is licensed under the SIL Open Font License.

## Attribution

- **“Arcade Planet” theme:** © Mickaël Isman (EvilDindon), CC BY-NC-SA, based on “Carbon”.
- **ES-DE:** © Northwestern Software AB, Leon Styhre, and Alec Lofquist — MIT License.
- **melonDS:** © melonDS team (including Arisotura) — GPLv3. <https://github.com/melonDS-emu/melonDS>
- **App, ES-DE port, animations, and sounds:** © 2026 dullyunderscorenew (this repository).

## Notes on redistribution

- **Program (GPLv3):** Anyone redistributing the app or the DS emulator must also provide the corresponding source code or make it available under the same license. The theme files (CC BY-NC-SA) are separate works distributed alongside the program and remain under their own license.
- **Non-commercial use:** The theme and all adaptations may not be used commercially (for example, they may not be sold or included as part of a paid product).
- **Share alike:** Anyone who modifies and redistributes the theme files must make them available under CC BY-NC-SA as well.
- **Trademarks:** System logos and controller images are trademarks of their respective manufacturers. The animation files in `theme/_art/anim/` contain elements of this artwork from the original theme. The same considerations as for the original theme therefore apply. To be on the safe side, do not publish the `*.json` files in this directory. They can be regenerated from the original theme using `tools/theme/gen_anim.py` (requires Python with Pillow and Playwright).
- The original theme's license information does not specify a version number. If you are unsure or plan a public release, consider contacting EvilDindon for clarification.

This document does not constitute legal advice.
