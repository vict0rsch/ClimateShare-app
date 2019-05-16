import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const uploadCollectionName = 'snack-SJucFknGX';
const feedCollectionName = 'feed';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDuH-MNixjG3zAIKkMHcmINbMcwXM2HrCY',
      authDomain: 'floodreport-d0dfb.firebaseapp.com',
      databaseURL: 'https://floodreport-d0dfb.firebaseio.com',
      projectId: 'floodreport-d0dfb',
      storageBucket: 'floodreport-d0dfb.appspot.com',
      messagingSenderId: '686620906770',
    });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.feedCollection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${uploadCollectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri, location, city }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.uploadCollection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        location,
        city,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get feedCollection() {
    return firebase.firestore().collection(feedCollectionName);
  }

  get uploadCollection() {
    return firebase.firestore().collection(uploadCollectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
