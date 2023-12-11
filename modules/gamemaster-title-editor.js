const MODULE_ID = 'gamemaster-title-editor';

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
            game.i18n.translations.GM = value;
            game.i18n.translations.USER.GM = value;
            const playersList = game.users.apps.find(app => app.id === 'players');
            playersList.render();
            game.webrtc.render()
        }
    });
});

Hooks.on('setup', async () => {
    const title = game.settings.get(MODULE_ID, "customGamemasterTitle");

    if (title) {
        game.i18n.translations.GM = title;
        game.i18n.translations.USER.GM = title;
    }

});
