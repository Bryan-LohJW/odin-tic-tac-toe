const displayModule = (function() {
    let _displayState = 'start';

    function _createStart() {
        const gameBlock = document.querySelector('.gameBlock');

        const title = document.createElement('div');
        title.classList.add('title');
        gameBlock.appendChild(title);

        const playingField = document.createElement('div');
        playingField.classList.add('playingField');

        for(i=0;i<9;i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('id',`${i}`);
            playingField.appendChild(tile);
        }
        gameBlock.appendChild(playingField);

        const gameAction = document.createElement('button');
        gameAction.classList.add('gameAction');
        gameBlock.appendChild(gameAction);

        for(i=1; i<3; i++) {
            const player = document.createElement('input');
            player.setAttribute('type', 'text');
            player.classList.add(`playerInput${i}`);
            gameBlock.appendChild(player);
        }
    }

    return{
        _createStart:_createStart
    }
})();