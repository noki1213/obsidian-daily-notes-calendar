> Japanese documentation is available below. (日本語ドキュメントは下部にあります)

# Daily Notes Calendar

An Obsidian plugin that provides a popup calendar for navigating and creating daily notes. Jump to any date, create notes from templates, and copy internal links.

## Features

### Calendar Modal

- Displays a monthly calendar view.
- Header shows the year and month (in YYYY年 M月 format).
- Weekday headers displayed in Japanese (日 月 火 水 木 金 土).
- Today's date is highlighted.
- The currently selected date is highlighted.
- Click any date to open or create the daily note for that day.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Left / Right | Move by 1 day |
| Arrow Up / Down | Move by 1 week |
| Enter | Open the daily note for the selected date |
| c | Copy an Obsidian internal link to the selected date's note |

The calendar automatically scrolls to the next or previous month when navigating past the month boundary.

### Daily Note Creation

- If the daily note for the selected date does not exist, it is created automatically when you open it.
- Supports template files with variable replacement:
  - {{date}}: Replaced with the formatted date.
  - {{time}}: Replaced with the current time in HH:mm format.
  - {{title}}: Replaced with the filename.
- The folder is created automatically if it does not exist.

### Link Copying

- Press c to copy an Obsidian internal link to the selected date's note (e.g., [[2024-01-15(Mon)]]).
- A notification confirms the copied link.

## Commands

- Open Daily Note Calendar: Opens the calendar modal.

This command can be assigned a custom hotkey in Obsidian settings.

## Settings

- Daily Note Date Format: The date format used for filenames, in moment.js format. Default: YYYY-MM-DD(ddd).
- Daily Note Folder: The folder where daily notes are stored. Default: 00_DailyNote.
- Template File Path: Path to a template file used when creating new daily notes (e.g., 91_Templates/DailyNoteTemplate.md).

## Installation

### Via BRAT

1. Install the BRAT plugin.
2. Add `noki1213/obsidian-daily-notes-calendar` as a beta plugin.

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release.
2. Create a folder named `daily-notes-calendar` in your vault's `.obsidian/plugins/` directory.
3. Place the downloaded files in that folder.
4. Enable the plugin in Obsidian settings.

---

# Daily Notes Calendar

ポップアップカレンダーでデイリーノートを操作・作成できる Obsidian プラグインです。任意の日付にジャンプしたり、テンプレートからノートを作成したり、内部リンクをコピーしたりできます。

## 機能

### カレンダーモーダル

- 月間カレンダーを表示します。
- ヘッダーに年月が表示されます（YYYY年 M月 形式）。
- 曜日は日本語で表示されます（日 月 火 水 木 金 土）。
- 今日の日付がハイライトされます。
- 選択中の日付がハイライトされます。
- 任意の日付をクリックして、その日のデイリーノートを開くまたは作成できます。

### キーボード操作

| キー | 動作 |
|------|------|
| 左右キー | 1日ずつ移動 |
| 上下キー | 1週間ずつ移動 |
| Enter | 選択した日付のデイリーノートを開く |
| c | 選択した日付のノートへの内部リンクをコピー |

月の境界を越えると、カレンダーは自動的に前月・翌月に切り替わります。

### デイリーノートの作成

- 選択した日付のデイリーノートが存在しない場合、開いたときに自動的に作成されます。
- テンプレートファイルを使った変数の置換に対応しています。
  - {{date}}: フォーマットされた日付に置換されます。
  - {{time}}: 現在時刻が HH:mm 形式で置換されます。
  - {{title}}: ファイル名に置換されます。
- フォルダが存在しない場合は自動的に作成されます。

### リンクのコピー

- c キーを押すと、選択した日付のノートへの Obsidian 内部リンクがコピーされます（例: [[2024-01-15(Mon)]]）。
- コピーされたリンクは通知で確認できます。

## コマンド

- Open Daily Note Calendar: カレンダーモーダルを開きます。

このコマンドには Obsidian の設定からカスタムホットキーを割り当てられます。

## 設定

- Daily Note Date Format: ファイル名に使う日付フォーマット（moment.js 形式）。デフォルト: YYYY-MM-DD(ddd)。
- Daily Note Folder: デイリーノートを保存するフォルダ。デフォルト: 00_DailyNote。
- Template File Path: 新しいデイリーノートを作成するときに使うテンプレートファイルのパス（例: 91_Templates/DailyNoteTemplate.md）。

## インストール

### BRAT 経由

1. BRAT プラグインをインストールします。
2. `noki1213/obsidian-daily-notes-calendar` をベータプラグインとして追加します。

### 手動インストール

1. 最新リリースから `main.js`、`manifest.json`、`styles.css` をダウンロードします。
2. Vault の `.obsidian/plugins/` に `daily-notes-calendar` フォルダを作成します。
3. ダウンロードしたファイルをそのフォルダに配置します。
4. Obsidian の設定でプラグインを有効にします。
