const client_id = "01ba6c23a87843a783bf5b9a65cf8721";
const client_secret = "a5819ccfad1e45318ae9a4ef6656f5b9";
const redirect_uri = "http://localhost:3000";

export default {
  logInWithSpotify: () => {
    let scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-modify',
      'user-follow-modify',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-top-read',
      'streaming'
    ].join(' ');

    let scopes_encoded = scopes.replace(' ', '%20');

    window.location = [
      'https://accounts.spotify.com/authorize',
      `?client_id=${client_id}`,
      `&client_secret=${client_secret}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes_encoded}`,
      '&response_type=token',
      '&show_dialog=true'
    ].join('');
  },

  getToken: () => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    window.location.hash = '';
    return hashParams.access_token;
  }
};
