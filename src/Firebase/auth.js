import { auth, providerGoogle } from "./firebase";

export const signInWithEmailAndPassword = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.user.emailVerified)
        console.log("[Email and Password]", "Signed in");
      else verifyEmail();
    })
    .catch((error) =>
      console.log("[Email and Password] Failed To Sign In", error.message)
    );
};

export const signInWithGoogle = (email, password) => {
  auth
    .signInWithPopup(providerGoogle)
    .then((res) => console.log("[Google]", "Signed in"))
    .catch((err) => console.log("[Google]", "Signed out"));
};

export const signUpWithEmailAndPassword = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      verifyEmail();
    })
    .catch((error) =>
      console.log("[Email and Password] failed To Sign Up", error.message)
    );
};

export const onStateChanged = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      //if Email is not verified
      if (!user.emailVerified) signOut();
      else {
        console.log("[AUTH]", "User is currently logged in");
        callback(user);
      }
    } else {
      console.log("[AUTH]", "User is currently logged out");
      callback(null);
    }
  });
};

function verifyEmail() {
  let currentUser = auth.currentUser;
  // eslint-disable-next-line no-restricted-globals
  if (confirm("Do you want to verify your email?")) {
    currentUser
      .sendEmailVerification()
      .then(() => {
        console.log(
          "[Verify Email], Verfication email sent to",
          currentUser.email
        );
      })
      .catch((error) => console.log("[Verify Email]", error.errorMessage));
  } else signOut();
}

export function signOut() {
  let currentUser = auth.currentUser;
  auth
    .signOut()
    .then(() => {
      console.log("[Sign out]", currentUser.email, "is signed out");
    })
    .catch((error) => console.log(error));
}
