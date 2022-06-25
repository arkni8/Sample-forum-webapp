import {
    collection,
    setDoc,
    addDoc,
    serverTimestamp,
    updateDoc,
    getDocs,
    doc,
    increment,
    getDoc,
    orderBy,
    query,
    startAfter,
    // where,
    // documentId,
    limit,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import {db} from '../firebase';

export async function storeUser(id, displayName) {
    const docRef = await setDoc(doc(db, "users", id), {displayName});
    return docRef;
    // console.log("User createed with ID: ", docRef.id);
}

// ===> This stores the post from InquiryForm from homepage into
// "collection" -> posts
async function storage(title, question, userId, username) {
    const timestamp = await serverTimestamp();
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            title,
            question,
            userId,
            createdAt: timestamp,
            createdBy: username,
            likes: "0",
            namesWhoLiked: [],
            commentCount: 0
        });
        // console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) { // console.error("Error adding document: ", e);
        throw new Error(e);
    }
}

export async function storeComment(messageId, comment, user, userId) {
    try {
        const docRef = await addDoc(collection(db, "posts", messageId, "comments"), {comment, user, userId, createdAt: serverTimestamp()});
        const operation = await updateDoc(doc(db, 'posts', messageId), {commentCount: increment(1)});

        const docData = await fetchComment(docRef);
        const changes = await Promise.all([docData, operation]);
        return changes;

    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchComment(docRef) {
    try {
        const docData = await getDoc(docRef);
        return docData;
    } catch (err) {
        console.log(err);
    }
}

export async function countComment(messageId) {
    try {
        const commentsRef = await getDocs(collection(db, `posts/${messageId}/comments`));
        // console.log(commentsRef.size);
        if (commentsRef.size > 0) {
            return commentsRef.size;
        } else {
            return 0;
        }
    } catch (error) {
        throw new Error(error);
    }
}

export async function fetchPost(messageId) {
    try {
        const docRef = await getDoc(doc(db, `posts/${messageId}`));
        return docRef;
    } catch (err) {
        console.log(err);
    }
}

export async function fetchCommentPosts(messageId, startAfterDocRef = "") {
    // console.log(startAfterDocRef);
    let lastestCommentDocRef;
    const commentPostsRef = collection(db, "posts", messageId, "comments");

    startAfterDocRef ? lastestCommentDocRef = await getDoc(doc(db, "posts", messageId, "comments", startAfterDocRef.id))
        : lastestCommentDocRef = "";

    // console.log(lastestCommentDocRef);
    const queryOrderOptions = orderBy('createdAt', 'desc');
    const limitOption = 3;
    const queryRef = query(commentPostsRef, queryOrderOptions, limit(limitOption), startAfter(lastestCommentDocRef));
    // console.log(queryRef);
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot;
}

/* This function can be used to get the username from the database
// export async function getUserName(id) {
//     const docRef = await doc(db, "users", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) { // console.log(docSnap.data().displayName);
//         return docSnap.data().displayName;
//     } else { // doc.data() will be undefined in this case
//         return "no-username";
//     }
// } */

/* Using query To increase the amount of likes and add to array of 'nameWhoLiked'
// export async function increamentDoc(id, currentUserName) {

//     const positive = {
//         [currentUserName]: 1
//     };
//     const negative = {
//         [currentUserName]: -1
//     };

//     const docRef = doc(db, "posts", `${id}`);
//     const colRef = collection(db, "posts");
//     try {
//         const res = await getDocs(query(colRef,
//             where(documentId(), "==", id),
//             where("namesWhoLiked", "array-contains-any", [positive, negative])
//         ));
//         console.log(res.size);
//         console.log(res.docs.at(0)?.data().namesWhoLiked.some(item => item[currentUserName] === 1));
//         if (res.size === 0) {
//             await updateDoc(docRef, {
//                 "likes": increment(1),
//                 namesWhoLiked: arrayUnion(positive)
//             });
//         } else if (res.docs.at(0)?.data().namesWhoLiked.some(item => item[currentUserName] === 1)) {
//             await updateDoc(docRef, {
//                 "likes": increment(-1),
//                 namesWhoLiked: arrayRemove(positive)
//             });
//         } else {
//             await updateDoc(docRef, {
//                 "likes": increment(1),
//                 namesWhoLiked: arrayRemove(negative)
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }*/

/* Using query To decrease the amount of likes and remove from array of 'nameWhoLiked'
// export async function decreamentDoc(id, currentUserName) {

//     const positive = {
//         [currentUserName]: 1
//     };
//     const negative = {
//         [currentUserName]: -1
//     };

//     const docRef = doc(db, "posts", `${id}`);
//     const colRef = collection(db, "posts");
//     try {
//         const res = await getDocs(query(colRef,
//             where(documentId(), "==", id),
//             where("namesWhoLiked", "array-contains-any", [positive, negative])
//         ));
//         console.log(res.size);
//         console.log(res.docs.at(0)?.data().namesWhoLiked.some(item => item[currentUserName] === -1));
//         if (res.size === 0) {
//             await updateDoc(docRef, {
//                 "likes": increment(-1),
//                 namesWhoLiked: arrayUnion(negative)
//             });
//         } else if (res.docs.at(0)?.data().namesWhoLiked.some(item => item[currentUserName] === -1)) {
//             await updateDoc(docRef, {
//                 "likes": increment(+1),
//                 namesWhoLiked: arrayRemove(negative)
//             });
//         } else {
//             await updateDoc(docRef, {
//                 "likes": increment(-1),
//                 namesWhoLiked: arrayRemove(positive)
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }*/

// Universal function to store likes (and dislikes) without using reads of Firestore
export async function likesDislikesStore(operationInfo, docWithInfo, currentUserName) {
    const {id, namesWhoLiked} = docWithInfo;
    const positive = {
        [currentUserName]: 1
    };
    const negative = {
        [currentUserName]: -1
    };

    const docRef = doc(db, "posts", `${id}`);
    try {
        if ((!namesWhoLiked || namesWhoLiked.length === 0) && operationInfo === 1) {
            await updateDoc(docRef, {
                "likes": increment(1),
                namesWhoLiked: arrayUnion(positive)
            });
        } else if ((!namesWhoLiked || namesWhoLiked.length === 0) && operationInfo === -1) {
            await updateDoc(docRef, {
                "likes": increment(-1),
                namesWhoLiked: arrayUnion(negative)
            });
        } else {
            const checkIndex = await namesWhoLiked?.findIndex(item => (item[currentUserName] === 1 || item[currentUserName] === -1));
            // console.log(checkIndex);
            // console.log(namesWhoLiked[checkIndex][currentUserName]);
            if (checkIndex !== -1 && namesWhoLiked.length > 0 && namesWhoLiked[checkIndex][currentUserName] === 1) {
                await updateDoc(docRef, {
                    "likes": increment(-1),
                    namesWhoLiked: arrayRemove(positive)
                });
            } else if (checkIndex !== -1 && namesWhoLiked.length > 0 && namesWhoLiked[checkIndex][currentUserName] === -1) {
                await updateDoc(docRef, {
                    "likes": increment(1),
                    namesWhoLiked: arrayRemove(negative)
                });
            } else {
                await updateDoc(docRef, {
                    "likes": increment(operationInfo),
                    namesWhoLiked: arrayUnion(operationInfo === -1 ? negative : positive)
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default storage;
