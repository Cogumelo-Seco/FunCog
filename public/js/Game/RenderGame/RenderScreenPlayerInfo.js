export default async (ctx, canvas, game, Listener, functions) => {
    let screenElements = document.getElementById('screenElements')
    try {
        let screenPlayerInfoElement = screenElements.getElementsByClassName('screenPlayerInfoElement')[0] || document.createElement('div')
        screenPlayerInfoElement.className = 'screenPlayerInfoElement'

        let headerInfo = document.getElementById('headerInfo') || document.createElement('div')
        headerInfo.id = 'headerInfo'
        headerInfo.style = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background-color: rgba(0,0,0,0.8);
        `

        let avatarImage = document.getElementById('avatarImage') || document.createElement('img')
        avatarImage.src = game.state.myConfig.author.avatar || '/imgs/sticker-sla.png'
        avatarImage.id = 'avatarImage'
        avatarImage.style = `
            position: absolute;
            top: 5px;
            left: 60px;
            width: 40px;
            height: 40px;
            background-color: rgba(0,0,0,0.7);
            border-radius: 100%;
        `

        let playerName = document.getElementById('playerName') || document.createElement('span')
        playerName.innerText = game.state.myConfig.author.name+' '+(game.state.myConfig.emoji || '')
        playerName.id = 'playerName'
        playerName.style = `
            position: absolute;
            top: 10px;
            left: 110px;
            color: #fff;
        `
        let levelContent = document.getElementById('levelContent') || document.createElement('div')
        levelContent.id = 'levelContent'
        levelContent.style = `
            position: absolute;
            display: flex;
            align-items: center;
            top: 30px;
            left: 110px;
            color: #fff;
            width: auto;
            height: 15px;
        `

        let xpText = document.getElementById('xpText') || document.createElement('span')
        xpText.innerText = `${Number.parseInt(game.state.myConfig.xp)}/${game.state.smallFunctions.requiredXPCalc(game.state.myConfig.level)}`
        xpText.id = 'xpText'
        xpText.style = `
            display: flex;
            color: #fff;
            font-size: 13px;
        `
        levelContent.appendChild(xpText)

        let levelUpBar = document.getElementById('levelUpBar') || document.createElement('span')
        levelUpBar.id = 'levelUpBar'
        levelUpBar.style = `
            display: flex;
            width: 100px;
            height: 12px;
            margin: 0 5px;
            border: solid rgb(150,150,150) 1px;
            border-radius: 20px;
            background-color: rgb(30,30,30);
            overflow: hidden;
        `

        let lvlUpPercent = Number.parseInt(game.state.myConfig.xp/game.state.smallFunctions.requiredXPCalc(game.state.myConfig.level)*100)
        levelUpBar.title = lvlUpPercent+'%'

        let percentageLevelUpBar = document.getElementById('percentageLevelUpBar') || document.createElement('span')
        percentageLevelUpBar.id = 'percentageLevelUpBar'
        percentageLevelUpBar.style = `
            display: block;
            position: relative;
            left: 0;
            width: ${lvlUpPercent}%;
            height: 100%;
            background-color: #bd4aff;
        `
        levelUpBar.appendChild(percentageLevelUpBar)
        levelContent.appendChild(levelUpBar)

        let lvlText = document.getElementById('lvlText') || document.createElement('span')
        lvlText.innerText = 'LVL'+game.state.myConfig.level
        lvlText.id = 'lvlText'
        lvlText.style = `
            display: flex;
            color: #fff;
            font-size: 13px;
        `
        levelContent.appendChild(lvlText)

        screenPlayerInfoElement.appendChild(headerInfo)
        screenPlayerInfoElement.appendChild(avatarImage)
        screenPlayerInfoElement.appendChild(playerName)
        screenPlayerInfoElement.appendChild(levelContent)
        screenElements.appendChild(screenPlayerInfoElement)
    } catch {}
}