import {auth} from '../firebase';
import {updatePassword, updateProfile} from 'firebase/auth';
// import {getAuth} from '../context/authContext';

async function changePassword(newPassword) {
    // const {login} = getAuth();
    const user = auth.currentUser;
    const response = await updatePassword(user, newPassword);
    return response;
}

async function changeDisplayName(displayName) {
    const res = await updateProfile(auth.currentUser, {displayName});
    return res;
}

async function changeDisplayPic(url) {
    updateProfile(auth.currentUser, {photoURL: url}).then(() => { // Profile updated!
        console.log("Profile Updated");
        return;
        // ...
    }).catch((error) => {
        console.log(error);
        // An error occurred
    });
}

export {
    changePassword,
    changeDisplayName,
    changeDisplayPic
};
