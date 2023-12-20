import { createSlice } from '@reduxjs/toolkit';

const allChat = {
  messages: [
    {
      roomId: 123,
      message: "Hey Charlie, I think you are a good candidate for this task. I am looking forward in working with you on this task.",
      from: 2,
      to: 1,
      sendTime: "4:42 PM",
      msgType: 'text',
    },
    {
      roomId: 123,
      message: "Sure, No problem.",
      from: 1,
      to: 2,
      sendTime: "6:24 PM",
      msgType: 'text',
    },
    {
      roomId: 123,
      message: "You requested a req from Charlie.",
      from: 2,
      to: 1,
      sendTime: "Sept 16,2022 - 9:41 AM",
      msgType: 'status',
    },
    {
      roomId: 123,
      url: "data:image/png;base64,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",
      from: 1,
      to: 2,
      sendTime: "6:53 PM",
      msgType: 'image',
    },
  ]
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: allChat,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
