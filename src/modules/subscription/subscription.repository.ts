import { inject, injectable } from "inversify";
import { ISubscriptionAttributes, Subscription } from "./Subscription.model";
import "reflect-metadata";

export interface ISubscriptionRepository {
    create(email: string): Promise<Subscription | null>;
    getAll(): Promise<Subscription[]>;
    getOne({ email }: Partial<ISubscriptionAttributes>): Promise<Subscription | null>
}

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {
    constructor() {}

    async create(email: string): Promise<Subscription | null> {
        try {
            return await Subscription.create({ email });
        } catch (error) {
            console.log(error);
            throw new Error("Error save to db");
        }
    }

    async getAll(): Promise<Subscription[]> {
        try {
            return await Subscription.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("Error getAll from db");
        }
    }

    async getOne({ email }: Partial<ISubscriptionAttributes>): Promise<Subscription | null> {
        try {
            return await Subscription.findOne({ where: { email } });
        } catch (error) {
            console.log(error);
            throw new Error("Error get one from db");
        }
    }
}
