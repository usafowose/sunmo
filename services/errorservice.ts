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
  constructor(message: string, code: number) {
    super();
    this.code = code;
    this.message = message;
  }
}

export class ErrorService{
  static defaultError: APIError = new APIError('Internal Server Error', 500);

  static getError(route: APIRoute, method: HandlerMethod, errorCode: number): APIError {
    if (errorCode === 500) {
      return this.defaultError;
    }

    switch (route) {
      case APIRoute.PROFILES:
        return this._setProfilesRouteError(method as ProfileHandlerMethod, errorCode);
      default:return this.defaultError;
    }
  }

  private static _setProfilesRouteError(method: ProfileHandlerMethod, errorCode: number): APIError {
    switch (method) {
      case ProfileHandlerMethod.CREATEPROFILE:
        switch (errorCode) {
          case 400: return new APIError('Bad Request', errorCode);
          case 404: return new APIError('Not Found', errorCode);
          case 409: return new APIError('Resource Already Exists', errorCode);
          default: return this.defaultError;
        }

      case ProfileHandlerMethod.GETPROFILE:
        switch (errorCode) {
          case 400: return new APIError('Bad Request', errorCode);
          case 404: return new APIError('Not Found', errorCode);
          default: return this.defaultError;
        }

      default: return this.defaultError;
    }
  }

  private static _setInvitationsRouteError(method: ProfileHandlerMethod, errorCode: number): APIError {
    throw new Error("Method not implemented.");
  }

}