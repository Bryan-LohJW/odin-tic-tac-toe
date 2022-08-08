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
        player1.setAttribute('value', 'Player 1');
        inputContainer.appendChild(player1);

        const selector = document.createElement('div');
        selector.classList.add('iconSelector');
        selector.textContent = 'X/O';
        inputContainer.appendChild(selector);

        const player2 = document.createElement('input');
        player2.setAttribute('type', 'text');
        player2.classList.add(`playerInput2`);
        player2.setAttribute('value', 'Player 2');
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
        eventListener:eventListener,
    }
})();

const Player = (name, icon) => {
    return {name, icon};
};

const gameModule = (function() {
    let _player1 = Player('Player 1', 'X');
    let _player2 = Player('Player 2', 'O');
    let currentPlayer = Player('', '');
    let status = 'prep';

    const _turnChange = () => {
        switch(currentPlayer.name) {
            case _player1.name:
                currentPlayer.name = _player2.name;
                currentPlayer.icon = _player2.icon;
                break;
            case _player2.name:
                currentPlayer.name = _player1.name;
                currentPlayer.icon = _player1.icon;
                break;
        }
    }

    const _gameStart = () => {
        const tiles = document.getElementsByClassName('tile');
        let i = 0;
        for(let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', function(e){gameModule.tileClick(e)});
            tiles[i].classList.add('unclicked');
        }
    }

    const setPlayerName = () => {
        _player1.name = document.querySelector('.playerInput1').value;
        _player2.name = document.querySelector('.playerInput2').value;
        status = 'started';
        currentPlayer.name = _player1.name;
        currentPlayer.icon = _player1.icon;
        _gameStart();
    }

    const toggleChoice = () => {
        if (status === 'started') {return};
        if (_player1.icon === 'X') {
            _player1.icon = 'O';
            _player2.icon = 'X';
            document.querySelector('.iconSelector').textContent = 'O/X';
        } else {
            _player1.icon = 'X';
            _player2.icon = 'O';
            document.querySelector('.iconSelector').textContent = 'X/O';
        }
    }

    const tileClick = (e) => {
        if(e.target.textContent !== '') {
            return;
        }
        e.target.textContent = currentPlayer.icon;
        e.target.classList.remove('unclicked');
        _turnChange();
    }

    return {
        currentPlayer,
        setPlayerName:setPlayerName,
        toggleChoice:toggleChoice,
        tileClick:tileClick,
    }
})();

displayModule._createStart();
displayModule.eventListener();