import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const Board = new Schema({
  url: String,
  name: String,
  startDate: Date,
  endDate: Date,
  status: String,
  topic: String,
  description: String,
  personalization: Boolean,
  creator: {
    firstName: String,
    lastName: String,
    id: mongoose.Types.ObjectId,
    profileUrl: String,
  },
  pins: [mongoose.Types.ObjectId],
  createdAt: Date,
  collaborators: [mongoose.Types.ObjectId],
  counts: {
    followers: Number,
    joiners: Number,
    pins: Number,
  },
});