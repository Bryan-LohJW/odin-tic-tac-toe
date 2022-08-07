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

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('inputContainer');
        const player1 = document.createElement('input');
        player1.setAttribute('type', 'text');
        player1.classList.add(`playerInput1`);
        inputContainer.appendChild(player1);
        const selector = document.createElement('div');
        selector.classList.add('iconSelector')
        inputContainer.appendChild(selector);
        const player2 = document.createElement('input');
        player2.setAttribute('type', 'text');
        player2.classList.add(`playerInput2`);
        inputContainer.appendChild(player2);
        gameBlock.appendChild(inputContainer);
    }

    return{
        _createStart:_createStart
    }
})();

displayModule._createStart();