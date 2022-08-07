const displayModule = (function() {
    let _displayState = 'start';

    function _createStart() {
        const gameBlock = document.querySelector('.gameBlock');

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = 'Welcome'
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
        gameAction.textContent = 'START';
        gameBlock.appendChild(gameAction);

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('inputContainer');

        const player1 = document.createElement('input');
        player1.setAttribute('type', 'text');
        player1.classList.add(`playerInput1`);
        player1.setAttribute('placeholder', 'Player 1');
        inputContainer.appendChild(player1);

        const selector = document.createElement('div');
        selector.classList.add('iconSelector');
        selector.textContent = 'X/O';
        inputContainer.appendChild(selector);

        const player2 = document.createElement('input');
        player2.setAttribute('type', 'text');
        player2.classList.add(`playerInput2`);
        player2.setAttribute('placeholder', 'Player 2');
        inputContainer.appendChild(player2);
        gameBlock.appendChild(inputContainer);
    }

    const _startEvent = () => {
        const start = document.querySelector('.gameAction');
        start.addEventListener('click', function(){gameModule.setPlayerName()});
    }

    const _toggleEvent = () => {
        const toggle = document.querySelector('.iconSelector');
        toggle.addEventListener('click', function(){gameModule.toggleChoice()});
    }

    const eventListener = () => {
        _startEvent();
        _toggleEvent();
    }

    return{
        _createStart:_createStart,
        eventListener:eventListener
    }
})();

const Player = (name, icon) => {
    return {name, icon};
};

const gameModule = (function() {
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let status = 'prep';

    const setPlayerName = () => {
        player1.name = document.querySelector('.playerInput1').value;
        player2.name = document.querySelector('.playerInput2').value;
        status = 'started';
    }
    const toggleChoice = () => {
        if (status === 'started') {return};
        if (player1.icon === 'X') {
            player1.icon = 'O';
            player2.icon = 'X';
            document.querySelector('.iconSelector').textContent = 'O/X';
        } else {
            player1.icon = 'X';
            player2.icon = 'O';
            document.querySelector('.iconSelector').textContent = 'X/O';
        }
    }
    return {
        player1,
        player2,
        setPlayerName:setPlayerName,
        toggleChoice:toggleChoice,
    }
})();

displayModule._createStart();
displayModule.eventListener();