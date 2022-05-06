const clientId = '5ca30d6d81ad41f79ed049c301b3c3ab';
const redirectUri = 'https://lucky-sundae-3aedd0.netlify.app';
let accessToken;

const Spotify = {

    getAccessToken(){
        if (accessToken) {
            return accessToken;
        }

        let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expirationTimeMatch) {
            accessToken = accessTokenMatch[1];
            let exiprationTime = Number(expirationTimeMatch[1]);

            window.setTimeout(() => accessToken = '', exiprationTime * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
    },


    async search(term){

        this.getAccessToken();

        let header = { 
            Authorization: `Bearer ${accessToken}`
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, { headers: header});
            if (response.ok) {

                const jsonResponse = await response.json();

                // console.log(jsonResponse.tracks.items);
                let tracks = jsonResponse.tracks.items.map(track => ({
                    name: track.name,
                    id: track.id,
                    uri: track.uri,
                    artist: track.artists[0].name,
                    album: track.album.name
                }));
                return tracks;
                // console.log(tracks)
            }
        } catch (error) {
            console.log(error);
        }
    },

    async userId (){
        this.getAccessToken();

        const requestHeader = { 
            Authorization: `Bearer ${accessToken}`
        };

        try {
            let response = await fetch('https://api.spotify.com/v1/me', {
                headers: requestHeader
            });
            if (response.ok){
                let jsonResponse = await response.json();
                let userId = jsonResponse.id;
                // console.log(jsonResponse);
                return userId;
            }
        } catch (error) {
            console.log(error);
        }
    },

    async newPlaylistId(name, requestHeader){
        
        let playlistId = '';

        let userId = await this.userId();

        let requestBody = JSON.stringify({
            name: name,
            description: "New playlist from Jammming app",
            public: true
        });
        
        try {
            let response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',    
                headers: requestHeader,
                body: requestBody
            });
            if (response.ok){
                let jsonResponse = await response.json();
                playlistId = jsonResponse.id;
                return playlistId;
            }
        } catch (error) {
            console.log(error)
        }

    },

    async createPlaylist(name, tracks){
        
        this.getAccessToken();

        const requestHeader = { 
            Authorization: `Bearer ${accessToken}`
        };

        let playlistId = await this.newPlaylistId(name, requestHeader);
        
        let trackUris = tracks.map(track=>track.uri);
        
        let requestBody = JSON.stringify({
            uris: trackUris
        });

        try {
            let response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: 'POST',    
                headers: requestHeader,
                body: requestBody
            });
            if (response.ok){
                window.alert(`Playlist "${name}" successfully added.`)
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export default Spotify;