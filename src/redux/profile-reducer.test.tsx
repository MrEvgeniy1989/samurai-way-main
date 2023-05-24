import React from "react";
import { ProfileReducerInitialStateType, profileReducer, profileReducerActions } from "./profile-reducer";
import { ProfileType } from "../types/types";

const initialState: ProfileReducerInitialStateType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: {} as ProfileType,
  status: "",
};

it("message of new post should be correct", () => {
  let newState = profileReducer(initialState, profileReducerActions.addPostActionCreator("it-kamasutra.com"));

  expect(newState.posts.length).toBe(3);
});

it("length of posts should be incremented", () => {
  let newState = profileReducer(initialState, profileReducerActions.addPostActionCreator("it-kamasutra.com"));

  expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

it("after deleting length of messages should be decremented", () => {
  let newState = profileReducer(initialState, profileReducerActions.deletePost(1));

  expect(newState.posts.length).toBe(1);
});

it(`after deleting length shouldn't be decremented if id is incorrect`, () => {
  let newState = profileReducer(initialState, profileReducerActions.deletePost(1000));

  expect(newState.posts.length).toBe(2);
});
