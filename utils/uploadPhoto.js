import firebase from 'firebase';
function uploadPhoto(uri, uploadUri) {
  return new Promise(async (res, rej) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref(uploadUri);
    const unsubscribe = ref.put(blob).on(
      'state_changed',
      state => {},
      err => {
        unsubscribe();
        rej(err);
      },
      async () => {
        unsubscribe();
        const url = await ref.getDownloadURL();
        res(url);
      },
    );
  });
  blob.close();
}

export default uploadPhoto;
