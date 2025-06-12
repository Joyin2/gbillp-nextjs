interface FirebaseHostingConfig {
  hosting: {
    public: string;
    ignore: string[];
    rewrites: {
      source: string;
      destination: string;
    }[];
  }
}

const firebaseConfig: FirebaseHostingConfig = {
  hosting: {
    public: "out",
    ignore: [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    rewrites: [
      {
        source: "**",
        destination: "/index.html"
      }
    ]
  }
}

export default firebaseConfig 