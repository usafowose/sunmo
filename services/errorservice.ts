export enum APIRoute {
  PROFILES = 'PROFILES',
  INVITATIONS = 'INVITATIONS',
  FAMILIES = 'FAMILIES',
  EVENTS = 'EVENTS',
}

type HandlerMethod = ProfileHandlerMethod | InvitationHandlerMethod | EventsHandlerMethod;

//INCONCLUSIVE
export enum ProfileHandlerMethod {
  GETPROFILE = 'GETPROFILE',
  CREATEPROFILE = 'CREATEPROFILE',
}

export enum InvitationHandlerMethod {}

export enum EventsHandlerMethod {}

export class APIError extends Error {
  code: number;
  message: string;
  constructor(code: number, message?: string, ) {
    super();
    this.code = code;
    if (message) {
      this.message = message;
    }
  }
}

export class ErrorService {
  static defaultError = (message?: string): APIError => new APIError(500, this.defaultErrorMessage + (message ? `: ${message}` : ''));
  static defaultErrorMessage =  'Internal Server Error'



  static getError(route?: APIRoute, method?: HandlerMethod, errorCode?: number): APIError {
    if (!errorCode || errorCode === 500) {
      return this.defaultError();
    }

    switch (route) {
      case APIRoute.PROFILES:
        return this._setProfilesRouteError(method as ProfileHandlerMethod, errorCode);
      default:return this.defaultError();
    }
  }
  static getMissingReqParamsError<T>(reqParams: T, paramName: keyof T): APIError {
    return new APIError(400, 'Missing Request Parameter: ' + String(reqParams[paramName]));
  }
  private static _setProfilesRouteError(method: ProfileHandlerMethod, errorCode: number): APIError {
    switch (method) {
      case ProfileHandlerMethod.CREATEPROFILE:
        switch (errorCode) {
          case 400: return new APIError(errorCode, 'Bad Request');
          case 404: return new APIError(errorCode, 'Not Found');
          case 409: return new APIError(errorCode, 'Resource Already Exists');
          default: return this.defaultError();
        }

      case ProfileHandlerMethod.GETPROFILE:
        switch (errorCode) {
          case 400: return new APIError(errorCode, 'Bad Request');
          case 404: return new APIError(errorCode, 'Not Found',);
          default: return this.defaultError();
        }

      default: return this.defaultError();
    }
  }

  private static _setInvitationsRouteError(method: ProfileHandlerMethod, errorCode: number): APIError {
    throw new Error("Method not implemented.");
  }

}