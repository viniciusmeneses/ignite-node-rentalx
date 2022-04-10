export interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: { [key in string]: unknown },
    path: string
  ): Promise<void>;
}
