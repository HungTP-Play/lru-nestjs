import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQCommunicator {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  constructor(private connectionString: string) {}

  async connect() {
    try {
      this.connection = await amqp.connect(this.connectionString);
    } catch (e) {
      console.error(`[[ RabbitMQCommunicator ]] connect error: ${e}`);
      throw new Error('RabbitMQCommunicator connect error');
    }
  }

  async createChannel(): Promise<amqp.Channel> {
    try {
      if (!this.connection) {
        await this.connect();
      }

      if (this.channel) {
        return this.channel;
      }

      this.channel = await this.connection.createChannel();
      return this.channel;
    } catch (e) {
      console.error(`[[ RabbitMQCommunicator ]] createChannel error: ${e}`);
      throw new Error('RabbitMQCommunicator createChannel error');
    }
  }

  async assertQueue(queueName: string, channel?: amqp.Channel) {
    try {
      const useChannel: amqp.Channel = channel
        ? channel
        : await this.createChannel();
      return useChannel.assertQueue(queueName, { durable: false });
    } catch (e) {
      console.error(`[[ RabbitMQCommunicator ]] assertQueue error: ${e}`);
      throw new Error('RabbitMQCommunicator assertQueue error');
    }
  }

  async sendToQueue(
    queueName: string,
    message: string,
    channel?: amqp.Channel,
  ) {
    try {
      const useChannel: amqp.Channel = channel
        ? channel
        : await this.createChannel();
      await this.assertQueue(queueName, useChannel);
      return useChannel.sendToQueue(queueName, Buffer.from(message));
    } catch (e) {
      console.error(`[[ RabbitMQCommunicator ]] sendToQueue error: ${e}`);
      throw new Error('RabbitMQCommunicator sendToQueue error');
    }
  }

  async consume(
    queueName: string,
    callback: (message: amqp.ConsumeMessage | null) => void,
    channel?: amqp.Channel,
  ) {
    try {
      const useChannel: amqp.Channel = channel
        ? channel
        : await this.createChannel();
      await this.assertQueue(queueName);
      return useChannel.consume(queueName, callback, {
        noAck: true,
      });
    } catch (e) {
      console.error(`[[ RabbitMQCommunicator ]] consume error: ${e}`);
      throw new Error('RabbitMQCommunicator consume error');
    }
  }
}
