import mongoose, { Schema, Types } from "mongoose";

export interface IClick {
  linkId: Types.ObjectId;
  timestamp: Date;
  device: string;
  referrer: string;
}

const clickSchema = new Schema<IClick>({
  linkId: {
    type: Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },

  device: {
    type: String,
    default: "unknown",
  },

  referrer: {
    type: String,
    default: "direct",
  },
});

clickSchema.index({ linkId: 1 });
clickSchema.index({ linkId: 1, timestamp: 1 });

const Click = mongoose.model<IClick>("Click", clickSchema);

export default Click;