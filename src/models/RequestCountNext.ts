import mongoose from 'mongoose';

const RequestCountNext = new mongoose.Schema(
  { createdAt: { type: Date, expires: '1h', default: Date.now }},
  { expireAfterSeconds: 0, timestamps: true }
);

export default RequestCountNext;
