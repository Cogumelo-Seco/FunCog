export default async (type, { noteClickAuthor, note, notes, listenerState, difficulty, events }, state) => {
	state.animations['sonicEXEHitStatic'] = {
		frame: 0,
		startFrame: 0,
		endFrame: 9,
		totalDalay: 1,
		dalay: 0,
	}
	state.animations['sonicEXESimpleStatic'] = {
		frame: 0,
		startFrame: 0,
		endFrame: 5,
		totalDalay: 1,
		dalay: 0,
	}
	state.animations['sonicJumpscare'] = {
		frame: 0,
		startFrame: 0,
		endFrame: 20,
		totalDalay: 15,
		dalay: 0,
	}

    switch (type) {
		case 'noteClick':
			if (noteClickAuthor == 'player' && note?.type == 'sonicEXEphantomNote' && !notes?.find(n => n.errorWhenNotClicking)) {
                note.clicked = true
                state.musicInfo.combo = 0
                state.musicInfo.accuracyMedia.push(1)
                state.musicInfo.misses += 1
                state.musicInfo.score -= 50
                state.musicInfo.health -= 15
            }
			break
		case 'passedNote':
			if (note?.type == 'sonicEXEStaticNote') {
				state.musicInfo.health -= 15
				state.playSong('Sounds/hitStatic1.ogg', { newSong: true })

				state.musicInfo.popups.sonicEXEHitStatic = {
					image: `sonicEXE/sonicEXEHitStatic/hitStatic-{{frame}}.png`,
					x: 0,
					y: 0,
					width: state.canvas.width,
					height: state.canvas.height,
					animation: 'sonicEXEHitStatic',
				}

                state.animations.sonicEXEHitStatic.frame = 0
				setTimeout(() => delete state.musicInfo.popups.sonicEXEHitStatic, 500)
			}
			break
    }
}