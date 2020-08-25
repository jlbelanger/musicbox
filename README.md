# Musicbox

Musicbox is a music player and music library organizer.

I was sick of my keyboard's media keys not working in my old music player whenever wifi was down (seriously, what even is that?), and all the other free music players I looked at were either ugly or didn't have the features I wanted, so I decided the easiest thing to do would be to just make my own music player.

## Features

- Play/pause/next/previous
- Shuffle
- Seek
- Volume control
- Customize column size, reorder columns, hide columns
- Sort
- Track song plays/skips
- Set custom start/end time per song
- Uncheck songs (to keep them in the library but remove from the queue pool)
- Recieve notifications when the current song changes
- Add to and remove from queue
- Open song file location
- Import from iTunes
- Control using keyboard (including media keys)

## Coming someday

- Better design
- Screenshots
- Show columns
- Add and remove songs
- Edit ID3 metadata
- Filter/search
- Lyrics search
- Playlists
- Smart playlists
- Listening stats/graphs
- Smart shuffle
- Themes
- Decent test coverage

## Development

Musicbox uses Electron, React, Redux, Tabulator, music-metadata, and a billion other packages in node_modules.

Run:

``` bash
yarn start
```

Build:

``` bash
yarn dist
```

Lint:

``` bash
yarn lint
```

Test:

``` bash
yarn test
yarn test:cypress
```
