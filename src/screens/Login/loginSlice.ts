import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";

const initialState = {
  name: "Didem",
  email: "didemevran@gmail.com",
  password: "123456",
  user: {},
};

export const createAndAddUserToDatabaseAsync = createAsyncThunk(
  "login/createAndAddUserToDatabaseAsync",
  // @ts-ignore
  async ({name,email,password}: {name: string;email: string;password: string}) => {
    console.log("create user", name, email, password);
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        addUserToDatabase(user, name, email, password);
      }
    );
    const userRef = collection(db, "users");
    const q = query(userRef);
    return getDocs(q)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            name: doc.data().name,
            money: doc.data().money,
            email: doc.data().email,
          });
        });
        return data;
      })
  }
);

const addUserToDatabase = async (user, name, email, password) => {
   await addDoc(collection(db, "users"), {
    email: email,
    password: password,
    name: name,
    uid: user.uid,
    money: 201.5,
    createdAt: serverTimestamp(),
  }).then(() => {
    console.log("User added to firestore");
  });
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleChangeName: (state, action) => {
      state.name = action.payload;
    },
    handleChangeEmail: (state, action) => {
      state.email = action.payload;
    },
    handleChangePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createAndAddUserToDatabaseAsync.fulfilled, (state, action) => {
      const userArray = action.payload;
      console.log("userArray",JSON.stringify(userArray, null, 2))
      const user = userArray.find(user => user.name === state.name && user.email === state.email)
      state.user = user;
    });
  },
});
export const { handleChangeName, handleChangeEmail, handleChangePassword } =
  loginSlice.actions;

export const selectName = (state) => state.login.name;
export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;
