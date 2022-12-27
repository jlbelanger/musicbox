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
- last.fm scrobbling (optional)

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
- Name that song and other games
- Spotify integration
- Decent test coverage

## Notes

### last.fm scrobbling

Musicbox currently only supports hard-coded last.fm authentication in the library JSON file; you will need to create a last.fm application and an authentication token manually.

1. Log in to https://www.last.fm/
1. Go to https://www.last.fm/api/account/create/
1. Enter "Musicbox" as the application name. Enter whatever you want for the other fields, but leave the callback URL blank.
1. Make a note of the API key and the shared secret values. In the steps below, replace `API_KEY_FROM_LAST_FM` and `SHARED_SECRET_FROM_LAST_FM` with the values from last.fm.
1. Open your Musicbox JSON file and add the following after the first `{`:
	``` js
	"lastfm": {
		"apiKey": "API_KEY_FROM_LAST_FM",
		"apiSecret": "SHARED_SECRET_FROM_LAST_FM",
		"sk": ""
	},
	```
1. In your browser, open `https://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=API_KEY_FROM_LAST_FM&format=json`
1. Make a note of the token that is included in the response. In the steps below, replace `TOKEN_FROM_LAST_FM` with the value of the token.
1. In your browser, open `https://www.last.fm/api/auth/?api_key=API_KEY_FROM_LAST_FM&token=TOKEN_FROM_LAST_FM`
1. Authorize the app to access your account.
1. Generate an API signature by taking the md5 hash of `api_keyAPI_KEY_FROM_LAST_FMmethodauth.getsessiontokenTOKEN_FROM_LAST_FMSHARED_SECRET_FROM_LAST_FM`. (Note: There are no spaces. If you don't know how to create an md5 hash, you can search online for "md5 hash generator".)
1. In your browser, open `https://ws.audioscrobbler.com/2.0/?api_key=API_KEY_FROM_LAST_FM&method=auth.getsession&token=TOKEN_FROM_LAST_FM&api_sig=API_SIG_FROM_LAST_STEP`
1. Make a note of the key that is included in the response. In the steps below, replace `KEY_FROM_LAST_FM` with the value of the key.
1. Open your Musicbox JSON file and add the key from the response as the `sk` (eg. `"sk": "KEY_FROM_LAST_FM"`)

## Development

### Requirements

- [Git](https://git-scm.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Setup

``` bash
# Clone the repo
git clone https://github.com/jlbelanger/musicbox.git
cd musicbox

# Configure the environment settings
cp .env.example .env

# Install dependencies
yarn install
```

### Run

``` bash
yarn start
```

### Build

``` bash
yarn dist
```

### Lint

``` bash
yarn lint
```

### Test

``` bash
yarn test
yarn test:cypress
```
