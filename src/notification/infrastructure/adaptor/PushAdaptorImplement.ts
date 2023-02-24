// import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

import { Config } from 'src/Config';

import { PushAdaptor } from '../../application/adaptor/PushAdaptor';

export class PushAdaptorImplement implements PushAdaptor {
  // private readonly sesClient = new SESClient({
  //   region: Config.AWS_REGION,
  //   endpoint: Config.AWS_ENDPOINT,
  //   credentials: {
  //     accessKeyId: Config.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  //   },
  // });

  async sendPush(pushId: string, subject: string, text: string): Promise<void> {
    // await this.sesClient.send(
    //   new SendEmailCommand({
    //     Destination: { ToAddresses: [to] },
    //     Source: Config.EMAIL,
    //     Message: {
    //       Subject: { Data: subject, Charset: 'UTF-8' },
    //       Body: { Text: { Data: text, Charset: 'UTF-8' } },
    //     },
    //   }),
    // );
  }
}
