const displayModule = (function() {
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
        if(gameModule.status === 'finish') {
            return;
        }
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
        const title = document.querySelector('.title');
        title.textContent = `${currentPlayer.name}'s turn`;
    }
    
    const _resetState = () => {
        _player1.name = 'Player 1';
        _player1.icon = 'X';
        _player2.name = 'Player 2';
        _player2.icon = 'O';
        gameModule.status = 'prep';
    }

    const _gameStart = () => {
        gameModule.status = 'started';
        const tiles = document.getElementsByClassName('tile');
        let i = 0;
        for(let i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', function(e){_tileClick(e)});
            tiles[i].classList.add('unclicked');
        }
        const title = document.querySelector('.title');
        title.textContent = `${currentPlayer.name}'s turn`;
    }

    const _tileClick = (e) => {
        if(e.target.textContent !== '' || gameModule.status !== 'started') {
            return;
        }
        e.target.textContent = currentPlayer.icon;
        e.target.classList.remove('unclicked');
        _checkWin();
        _turnChange();
    }

    const _checkWin = () => {
        const tiles = document.getElementsByClassName('tile');
        const tile0 = tiles[0].textContent;
        const tile1 = tiles[1].textContent;
        const tile2 = tiles[2].textContent;
        const tile3 = tiles[3].textContent;
        const tile4 = tiles[4].textContent;
        const tile5 = tiles[5].textContent;
        const tile6 = tiles[6].textContent;
        const tile7 = tiles[7].textContent;
        const tile8 = tiles[8].textContent;
        //first horizontal
        (function(){
            if(tile0 === tile1 & tile1 === tile2 & tile0 !== '') {
                _finishEvent();
            }
        })();
        //second horizontal
        (function(){
            if(tile3 === tile4 & tile4 === tile5 & tile3 !== '') {
                _finishEvent();
            }
        })();
        //third horizontal
        (function(){
            if(tile6 === tile7 & tile7 === tile8 & tile6 !== '') {
                _finishEvent();
            }
        })();
        //first vertical
        (function(){
            if(tile0 === tile3 & tile3 === tile6 & tile0 !== '') {
                _finishEvent();
            }
        })();
        //second vertical
        (function(){
            if(tile1 === tile4 & tile4 === tile7 & tile1 !== '') {
                _finishEvent();
            }
        })();        
        //third vertical
        (function(){
            if(tile2 === tile5 & tile5 === tile8 & tile2 !== '') {
                _finishEvent();
            }
        })();      
        //backward diagonal
        (function(){
            if(tile0 === tile4 & tile4 === tile8 & tile0 !== '') {
                _finishEvent();
            }
        })();
        //forward diagonal
        (function(){
            if(tile3 === tile4 & tile4 === tile6 & tile3 !== '') {
                _finishEvent();
            }
        })();
        //tie
        (function(){
            if(gameModule.status === 'finish') {
                return;
            }
            let j = 0;
            for (let i = 0; i<9; i++) {
                if(tiles[i].textContent === '') {
                    j++;
                }
            }
            console.log(j);
            if(j===0) {
                currentPlayer.name = 'Nobody';
                _finishEvent();
            }
        })();
    }

    const _finishEvent = () => {
        gameModule.status = 'finish';
        const tiles = document.getElementsByClassName('tile');
        let i = 0;
        for(let i = 0; i < tiles.length; i++) {
            tiles[i].classList.remove('unclicked');
        }
        const actionButton = document.querySelector('.gameAction');
        actionButton.textContent = 'RESET';
        actionButton.addEventListener('click', function(){_resetGame()});
        const title = document.querySelector('.title');
        title.textContent = `${currentPlayer.name} won`;
    }

    const _resetGame = () => {
        const block = document.querySelector('.gameBlock');
        while(block.hasChildNodes()) {
            block.removeChild(block.firstChild);
        }
        displayModule._createStart();
        _resetState();
        displayModule.eventListener();
    }

    const setPlayerName = () => {
        _player1.name = document.querySelector('.playerInput1').value;
        _player2.name = document.querySelector('.playerInput2').value;
        currentPlayer.name = _player1.name;
        currentPlayer.icon = _player1.icon;
        _gameStart();
    }

    const toggleChoice = () => {
        if (gameModule.status !== 'prep') {return};
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


    return {
        currentPlayer,
        status,
        setPlayerName:setPlayerName,
        toggleChoice:toggleChoice,
    }
})();

displayModule._createStart();
displayModule.eventListener();