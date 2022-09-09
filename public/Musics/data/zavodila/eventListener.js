export default async (type, { noteClickAuthor }, state) => {
    switch (type) {
        case 'noteClick':
            if (noteClickAuthor == 'bot') {
                let current = 0
                let interval = setInterval(() => {
                    if (current >= 3) {
                        state.screenXMovement = 0
                        state.screenYMovement = 0
                        clearInterval(interval)
                    } else {
                        current += 1
                        state.screenXMovement = Number.parseInt(Math.random()*20)-10
                        state.screenYMovement = Number.parseInt(Math.random()*20)-10
                    }
                }, 1000/50)
            }
            break
    }
}