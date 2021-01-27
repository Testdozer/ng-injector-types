export interface InjectionFactory {
    factory(...args: any[]): any;
}

export type TypeofInjectionFactory<T extends InjectionFactory> = ReturnType<T["factory"]>;
