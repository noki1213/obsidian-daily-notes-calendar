const { Plugin, Modal, Setting, PluginSettingTab, Notice, TFile } = require('obsidian');

const DEFAULT_SETTINGS = {
	dateFormat: 'YYYY-MM-DD(ddd)',
	dailyNoteFolder: '00_DailyNote',
	templatePath: ''
};

class CalendarModal extends Modal {
	constructor(app, settings) {
		super(app);
		this.settings = settings;
		this.selectedDate = window.moment();
		this.displayDate = window.moment(this.selectedDate).startOf('month');
	}

	onOpen() {
		this.modalEl.addClass('calendar-modal');
		this.render();
		
		this.keyHandler = (evt) => {
			if (evt.key === 'ArrowLeft') {
				this.selectedDate.subtract(1, 'day');
				this.updateView();
			} else if (evt.key === 'ArrowRight') {
				this.selectedDate.add(1, 'day');
				this.updateView();
			} else if (evt.key === 'ArrowUp') {
				this.selectedDate.subtract(7, 'day');
				this.updateView();
			} else if (evt.key === 'ArrowDown') {
				this.selectedDate.add(7, 'day');
				this.updateView();
			} else if (evt.key === 'Enter') {
				this.openDailyNote();
				this.close();
			} else if (evt.key === 'c' || (evt.key === 'c' && (evt.ctrlKey || evt.metaKey))) {
				this.copyLink();
			}
		};
		window.addEventListener('keydown', this.keyHandler);
	}

	onClose() {
		window.removeEventListener('keydown', this.keyHandler);
		this.contentEl.empty();
	}

	updateView() {
		if (!this.selectedDate.isSame(this.displayDate, 'month')) {
			this.displayDate = window.moment(this.selectedDate).startOf('month');
		}
		this.render();
	}

	render() {
		const { contentEl } = this;
		contentEl.empty();

		const wrapper = contentEl.createDiv({ cls: 'calendar-wrapper' });
		const header = wrapper.createDiv({ cls: 'calendar-header' });
		header.setText(this.selectedDate.format('YYYY年 M月'));

		const grid = wrapper.createDiv({ cls: 'calendar-grid' });

		['日', '月', '火', '水', '木', '金', '土'].forEach(day => {
			grid.createDiv({ cls: 'calendar-weekday', text: day });
		});

		const monthStart = window.moment(this.selectedDate).startOf('month');
		const monthEnd = window.moment(this.selectedDate).endOf('month');
		const startPadding = monthStart.day();

		for (let i = 0; i < startPadding; i++) {
			grid.createDiv({ cls: 'calendar-day is-empty' });
		}

		for (let d = 1; d <= monthEnd.date(); d++) {
			const date = window.moment(monthStart).date(d);
			const isSelected = date.isSame(this.selectedDate, 'day');
			const isToday = date.isSame(window.moment(), 'day');

			const dayEl = grid.createDiv({ 
				cls: `calendar-day ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`,
				text: d.toString()
			});

			dayEl.onclick = () => {
				this.selectedDate = date;
				this.openDailyNote();
				this.close();
			};
		}
	}

	async openDailyNote() {
		const fileName = this.selectedDate.format(this.settings.dateFormat);
		const folderPath = this.settings.dailyNoteFolder.replace(/\/$/, '');
		const fullPath = folderPath ? `${folderPath}/${fileName}.md` : `${fileName}.md`;

		let file = this.app.vault.getAbstractFileByPath(fullPath);
		
		if (!file) {
			let content = '';
			
			// テンプレートの読み込み
			if (this.settings.templatePath) {
				const templateFile = this.app.vault.getAbstractFileByPath(this.settings.templatePath);
				if (templateFile instanceof TFile) {
					content = await this.app.vault.read(templateFile);
					// 日付変数の置換
					content = content.replace(/{{date}}/g, this.selectedDate.format(this.settings.dateFormat));
					content = content.replace(/{{time}}/g, window.moment().format('HH:mm'));
					content = content.replace(/{{title}}/g, fileName);
				}
			}

			if (folderPath && !this.app.vault.getAbstractFileByPath(folderPath)) {
				try {
					await this.app.vault.createFolder(folderPath);
				} catch (e) {}
			}
			file = await this.app.vault.create(fullPath, content);
		}

		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);
	}

	copyLink() {
		const linkText = `[[${this.selectedDate.format(this.settings.dateFormat)}]]`;
		navigator.clipboard.writeText(linkText).then(() => {
			new Notice(`Copied: ${linkText}`);
		});
	}
}

class DailyNoteCalendarSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Daily Note Date Format')
			.setDesc('例: YYYY-MM-DD(ddd)')
			.addText(text => text
				.setValue(this.plugin.settings.dateFormat)
				.onChange(async (value) => {
					this.plugin.settings.dateFormat = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Daily Note Folder')
			.setDesc('例: 00_DailyNote')
			.addText(text => text
				.setValue(this.plugin.settings.dailyNoteFolder)
				.onChange(async (value) => {
					this.plugin.settings.dailyNoteFolder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Template File Path')
			.setDesc('例: 91_Templates/DailyNoteTemplate.md')
			.addText(text => text
				.setValue(this.plugin.settings.templatePath)
				.onChange(async (value) => {
					this.plugin.settings.templatePath = value;
					await this.plugin.saveSettings();
				}));
	}
}

module.exports = class DailyNoteCalendarNavigator extends Plugin {
	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'open-calendar-navigator',
			name: 'Open Daily Note Calendar',
			callback: () => {
				new CalendarModal(this.app, this.settings).open();
			}
		});

		this.addSettingTab(new DailyNoteCalendarSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
};