/**
 * @module helpers/node-data-manager
 */
/**
 * Class that provides a method to store data based on node/element
 */
export default class NodeDataManager {
    store: any[];
    /**
     * Get data for an element/node
     * @param {Node} node Html Node/Element to get data for
     * @param {String|Boolean} key If key is passed, return that key's data for the element, if falsey return elements complete dataset
     */
    get(node: Node, key?: string | boolean): any;
    /**
     * Bind data to a specific Node/Element
     * @param {Node} node Html Node/Element to get data for
     * @param {String} key Key to save the data under
     * @param {*} value Value to save
     */
    set(node: Node, key: string, value: any): void;
    /**
     * Return an elements store object
     */
    find(node: any): any;
    /**
     * Destroy all references to data and nodes/elements
     */
    destroy(): void;
}
/**
 * Child class that provides a store for one specific node/element
 */
export class NodeDataStore {
    constructor(node: any, data: any);
    node: any;
    data: any;
    set(key: any, value: any): void;
    get(key?: boolean): any;
    remove(key: any): void;
    isNode(node: any): any;
    clearData(): void;
    destroy(): void;
}
//# sourceMappingURL=node-data-manager.d.ts.map