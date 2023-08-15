import { Response } from "express";

interface ISunmoResponse<T> {
  status: 'ok' | 'error' | 'other';
  message?: string;
  data?: T;
}

export interface SunmoResponseMetadata {
  cached: boolean;
  cacheAge: Date;
}

export class SunmoResponse<T> implements ISunmoResponse<T> {
  private _res: Response;
  status: 'ok' | 'error'| 'other';
  hasData: boolean;
  message?: string;
  data?: T;
  responseMetadata?: SunmoResponseMetadata;

  constructor(code: number, message?: string, data?: T, metadata?: SunmoResponseMetadata) {
    if (data) {
      this.hasData = true;
      this.data = data;
    }

    this.status = this.getStatus(code);
    this.message = message ?? null;
    this.responseMetadata = metadata ?? null;
  }

  getStatus(code: number): 'ok' | 'other' | 'error' {
    let statusCode: 'ok' | 'other' | 'error' = 'other';
    const statusRange = +(String(code)[0]);
    if (statusRange === 2) {
      statusCode = 'ok';
    }

    if (statusRange === 4 || statusRange === 5) {
      statusCode = 'error';
    }

    return statusCode;
  }
}
