export default class DataStore {
    private map: Map<string, any>;
    private listener: Map<string, any[]>;
    private static instance: DataStore;

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    private constructor() {
        this.map = new Map();
        this.listener = new Map();
    }

    public put(key: string, value: any): DataStore {
        this.map.set(key, value);
        this.checkListener(key, value);
        console.log(this.map);
        return this;
    }

    private checkListener(key: string, e: any) {
        const listenerList = this.listener.get(key);
        if (!listenerList) return;
        for (let listener of listenerList) {
            listener(e);
        }
    }

    public get(key: string): any {
        return this.map.get(key);
    }

    public addListener(key: string, handler: (e?: any) => void): void {
        let listenerList = this.listener.get(key);
        if (!listenerList)
            listenerList = [];
        listenerList.push(handler);
        this.listener.set(key, listenerList);
    }

    // destory() {
    //     for (let value of this.map.values()) {
    //         value = null;
    //     }
    // }
}