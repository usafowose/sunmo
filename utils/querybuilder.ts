import { FilterMap, operatorSymbolMap, Operator } from "./operatorsymbolmap";

export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export class StandardQueryBuilder {
  private _query: string | null;

  constructor() { 
    this._query = '';
  }

  public getQuery(
    method: Method.Get,
    tableName: string,
    filters?: FilterMap,
    columnNames?: undefined,
  ): string | null;
  public getQuery(
    method: Method.Put | Method.Patch,
    tableName: string,
    filters?: FilterMap,
    columnNames?: string[],
  ): string | null;
  public getQuery(
    method: Method.Post,
    tableName: string,
    filters?: undefined,
    columnNames?: string[],
  ): string | null;
  public getQuery(
    method: Method.Delete,
    tableName: string,
    filters?: FilterMap,
    columnNames?: undefined,
  ): string | null;

  /** 
   * 
   * @param method 
   * @param tableName 
   * @param filters 
   * @param columnNames 
   * @returns 
   */
  public getQuery(
    method: Method,
    tableName: string,
    filters?: FilterMap,
    columnNames?: string[] | undefined,
  ): string | null {

    switch (method) {
      case Method.Get:
        filters ? this._buildGetQuery(tableName, filters) : this._buildGetQuery(tableName);
        break;
      case Method.Post:
        if (columnNames?.length && filters?.size) {
          this._buildInsertQuery(tableName, columnNames);
        } else {
          this._query = null;
        }
      case Method.Put:
      case Method.Patch:
        if (columnNames?.length) {
          this._buildUpdateQuery(tableName, columnNames);
        } else {
          this._query = null;
        }
        break;
      case Method.Delete:
        if (filters?.size) {
          this._buildDeleteQuery(tableName, filters);
        } else {
         this._query = null
        }
        break;
      default:
        this._query = null;
    }

    return this._query;

  }
  /**
   * This function as well as the other private functions
   * @param tableName 
   */
  // TODO(afowose): build out this method
  private _buildGetQuery(tableName: string): void
  private _buildGetQuery(tableName: string, filter: FilterMap): void

  private _buildGetQuery(tableName: string, filter?: FilterMap): void {
    if (filter) {
      if (Array.isArray(filter)) {
        const condition = filter.join(' AND ');
        this._query = `SELECT * FROM ${tableName} WHERE ${condition}`;
      } else {
        this._query = `SELECT * FROM ${tableName} WHERE ${filter}`;
      }
    } else {
      this._query = `SELECT * FROM ${tableName}`;
    }
  }

  /**
   * A function that dynamically builds an insert query with placeholders for values
   * @param {string} tableName - a string representation of the insertion destination's table name 
   * @param {array} columnNames - an array of column names to be inserted into
   * @returns void
   */
  private _buildInsertQuery(tableName: string, columnNames: string[]): void {
    const columns: string = columnNames.reduce((acc, name, i, arr) => i === arr.length - 1 ? `${acc}${name}` : `${acc}${name},`, '');
    let placeholders: string = columnNames.reduce((acc, name, i, arr) => i === arr.length - 1 ? `${acc}?` : `${acc}?,`, '');

    this._query = `INSERT INTO ${tableName.toLowerCase()} (${columns}) VALUES (${placeholders})`;
  }

  // TODO(afowose): build out this method
  private _buildUpdateQuery(tableName: string, columnNames: string[] , filters?: string | string[]): void {
    const assignments: string = '';
    const filterCondition = filters ? `WHERE ${filters}` : '';
    this._query = `UPDATE ${tableName} SET ${assignments} ${filterCondition}`;
  }

  private _buildDeleteQuery(tableName: string, filters: FilterMap): void {
    if (!filters.size) {
      this._query = null;
    } else {
      try {
        this._query = `DELETE FROM ${tableName} WHERE ${this._getConditionFromFilterMap(filters)}`;
      } catch(err) {
        this._query = null;
      }
    }
  }

  private _getConditionFromFilterMap(filters: FilterMap): string {
      let filterArray: string[] = new Array(filters.size);
      let i = 0;
      for (const [columnName, operator] of filters.entries()) {
        if (!columnName || !!operator) {
          throw new Error('Missing entry in filter');
        }
        filterArray[i] = `${columnName} ${operatorSymbolMap[operator]} ?`
        i++
      }

      return filterArray.join(filterArray.length === 1 ? '' : ' AND ');
  }

}
