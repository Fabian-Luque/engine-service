export interface PushAdaptor {
  sendPush: (pushId: string, subject: string, text: string) => Promise<void>;
}
