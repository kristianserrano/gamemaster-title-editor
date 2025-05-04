const MODULE_ID = 'gamemaster-title-editor';

Hooks.on('init', () => {
    game.settings.register(MODULE_ID, 'customGamemasterTitle', {
        name: game.i18n.localize('GameMasterTitleEditor.CustomGamemasterTitle.Name'),
        hint: game.i18n.localize('GameMasterTitleEditor.CustomGamemasterTitle.Hint'),
        scope: 'world',
        config: true,
        type: String,
        default: '',
        submitOnChange: false,
        requiresReload: false,
        onChange: async (value) => {
            const name = value.trim();
            game.i18n.translations.USER.GM = name.length ? name : CONFIG.CustomGMTitle.coreDefault;
            await foundry.applications.instances.get('players')?.render();
            await foundry.applications.instances.get("camera-views")?.render();
        }
    });
});

Hooks.on('setup', async () => {
    CONFIG.CustomGMTitle = {
        coreDefault: game.i18n.translations.USER.GM
    }
    const customTitle = game.settings.get(MODULE_ID, "customGamemasterTitle").trim();
    game.i18n.translations.USER.GM = customTitle.length ? customTitle : CONFIG.CustomGMTitle.coreDefault;
});

Hooks.on('getUserContextOptions', (players, options) => {
    if (game.user.isGM) {
        options.push({
            name: game.i18n.localize('GameMasterTitleEditor.EditGamemasterTitle'),
            icon: '<i class="fas fa-input-text"></i>',
            condition: (li) => {
                return game.users.get(li.dataset.userId)?.isGM;
            },
            callback: async (li) => {
                await new SettingsConfig().render({ force: true }).then((settingsConfig) => settingsConfig.changeTab('gamemaster-title-editor', 'categories'));
            }
        });
    }
})
