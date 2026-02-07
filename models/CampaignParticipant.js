import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: String,
  fathername: String,
  mothername: String,
  phone: String,
  address: String,
  state: String,
  city: String,
  amount: String,
  note: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CampaignParticipant", campaignSchema);
