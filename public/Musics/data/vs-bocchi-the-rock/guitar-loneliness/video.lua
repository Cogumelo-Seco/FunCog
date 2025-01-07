function onEndSong()
if not seenCutscene then
startVideo('VIDEO')
seenCutscene = true
return Function_Stop
end
return Function_Continue
end