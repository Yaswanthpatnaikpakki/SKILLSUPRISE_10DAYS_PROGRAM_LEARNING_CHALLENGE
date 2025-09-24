const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyACyIGy5VnbDmDlzhCN_zzGmkzRxsZH1iM",
  authDomain: "projectmanagement-d18f3.firebaseapp.com",
  databaseURL: "https://projectmanagement-d18f3-default-rtdb.firebaseio.com",
  projectId: "projectmanagement-d18f3",
  storageBucket: "projectmanagement-d18f3.appspot.com",
  messagingSenderId: "579213964712",
  appId: "1:579213964712:web:5502b9a035cc4abbc4199d",
  measurementId: "G-BDH8FED737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to your commands node
const commandsRef = ref(db, 'commands'); // Assuming your Firebase node is "commands"

// Listen for changes
onValue(commandsRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const { command, location } = data;

  console.log('Firebase Data Changed:', data);

  if (command === 'delete' && location) {
    console.log(`Deleting all files in: ${location}`);
    deleteFiles(location);
  }
});

// Function to delete all files in a folder
function deleteFiles(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.log('Folder does not exist:', folderPath);
      return;
    }

    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log('Deleted file:', filePath);
      }
    });

    console.log('✅ All files deleted successfully.');
  } catch (err) {
    console.error('❌ Error deleting files:', err);
  }
}
