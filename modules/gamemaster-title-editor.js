const MODULE_ID = 'gamemaster-title-editor';
const SOURCE = { title: '' };

Hooks.on('init', () => {

    game.settings.register(MODULE_ID, 'customGamemasterTitle', {
        name: game.i18n.localize('GamemasterTitleEditor.CustomGamemasterTitle.Name'),
        hint: game.i18n.localize('GamemasterTitleEditor.CustomGamemasterTitle.Hint'),
        scope: 'world',
        config: true,
        type: String,
        default: '',
        submitOnChange: false,
        requiresReload: false,
        onChange: async value => {
            if (value === '') {
                const sourceTitle = game.settings.get(MODULE_ID, "sourceTitle");
                game.i18n.translations.USER.GM = sourceTitle;
                game.i18n.translations.GM = sourceTitle;
            } else {
                game.i18n.translations.USER.GM = value;
                game.i18n.translations.GM = value;
            }

            const playersList = game.users.apps.find(app => app.id === 'players');
            playersList.render();
            game.webrtc.render();
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
    SOURCE.title = game.i18n.translations.USER.GM;
    const title = game.settings.get(MODULE_ID, "customGamemasterTitle");

    if (title) {
        game.i18n.translations.USER.GM = title;
        game.i18n.translations.GM = title;
    }
});

Hooks.on('ready', async () => {
    await game.settings.set(MODULE_ID, "sourceTitle", SOURCE.title);
});
