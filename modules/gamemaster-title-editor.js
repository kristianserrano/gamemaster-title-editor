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

            if (name === '') {
                const sourceTitle = game.settings.get(MODULE_ID, "sourceTitle");
                game.i18n.translations.USER.GM = sourceTitle;
            } else {
                game.i18n.translations.USER.GM = name;
            }

            await foundry.applications.instances.get('players')?.render();
            await foundry.applications.instances.get("camera-views").render();
        }
    });

    game.settings.register(MODULE_ID, 'sourceTitle', {
        scope: 'world',
        config: false,
        type: String,
        default: '',
    });

});

Hooks.on('setup', async () => {
    game.settings.set(MODULE_ID, 'sourceTitle', game.i18n.translations.USER.GM);
    const customTitle = game.settings.get(MODULE_ID, "customGamemasterTitle").trim();
    game.i18n.translations.USER.GM = customTitle.length ? customTitle : game.i18n.translations.USER.GM;
});
