import { InferSchemaType } from "mongoose";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: String,
  orderId: String,
  message: String,
  date: Date,
  status: String,
});

export type NotificationType = InferSchemaType<typeof notificationSchema>;

const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
