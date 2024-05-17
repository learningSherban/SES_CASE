export interface IBaseCrone {
    croneInstance: any;
    // create(): void;

    process(): Promise<boolean>;
}