import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      state.posts.unshifth(newPost);
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.post = action.payload.posts;
    },
  },
});
export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const res = await apiService.post("/posts", {
        content,
        image,
      });
      dispatch(slice.actions.createPostSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getPosts =
  ({ userId, page, limit = 2 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };
      const res = await apiService.get(`/posts/user/${userId}`, {
        params,
      });

      dispatch(slice.actions.getPostSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
