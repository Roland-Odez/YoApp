import { PubSub } from '@google-cloud/pubsub';
import { PubSubEngine } from 'graphql-subscriptions';
export default class GooglePubSub implements PubSubEngine {
    constructor(config?: any, topic2SubName?: Topic2SubName, commonMessageHandler?: CommonMessageHandler, pubSubClient?: PubSub);
    publish(topicName: string, data: any, attributes?: object): any;
    private getSubscription;
    subscribe(topicName: any, onMessage: any, options?: any): Promise<number>;
    private getMessageHandler;
    unsubscribe(subId: any): void;
    asyncIterator<T>(topics: string | string[], options?: any): AsyncIterator<T>;
    private commonMessageHandler;
    private topic2SubName;
    pubSubClient: any;
    private clientId2GoogleSubNameAndClientCallback;
    private googleSubName2GoogleSubAndClientIds;
    private currentClientId;
}
export declare type Topic = string;
export declare type Topic2SubName = (topic: Topic, subscriptionOptions?: Object) => string;
export declare type CommonMessageHandler = (message: any) => any;
