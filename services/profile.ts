import { ProfileAccessLayer } from "../data/access/profileData";
import { Profile } from "../data/models/orm-entities/profileentity";

// Perform any data transformation or validation specific to the business logic of the profiles
// Mapping Request Data To Appropriate Format
// Validating the Data
// Enriching With Additional Information

// Frontend Business Logic:
  // When user wants to create profile:
  // loading screen until API responds:
    // if 409, conflict error with previously created resource;
    // if 2xx, display green check and move on.
    // handle other possible errors
  // Add profile to family tree & respective table (with verification status indicator)
    // if verified, then indicator full
    // if invited?
    // if first, ..... work out logic withing service and members
    //  necesaary notifications or relationship verification requests sent
  //

//  Backend Busness Logic:
// When user wants to create profile:
  // ensure new profile
  // make neccessary calls to create profile ** include familyID in call;
  // add profile to family tree table with verification status indication
  // Send verification requests via InvitiationService (to only closest members & from within family tree service)

export class ProfileService {
  private _profileAccessLayer: ProfileAccessLayer;

  constructor() {
    this._profileAccessLayer = new ProfileAccessLayer();
  }

  async getProfileById(id: string): Promise<Profile> {
    try {
      //TODO (afowose): remove this from any type and return raw type straight from DAL to be transformed into Profile type
      const rawProfile: Profile = await this._profileAccessLayer.getProfileById(id);
      if (!rawProfile) {
        return null;
      }
      console.log(rawProfile);
      // const cleanedData: Profile = this._cleanRawProfileData(rawProfile);
      // return cleanedData;
      return rawProfile;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllProfiles(): Promise<Profile[]> {
    try {
      //TODO (afowose): remove this from any type and return raw type straight from DAL to be transformed into Profile type
      const allProfiles: Profile[] = await this._profileAccessLayer.getAllProfiles();

      return allProfiles;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteProfile(id: string): Promise<void> {
    try {
      await this._profileAccessLayer.deleteProfile(id);
    } catch (err) {
      console.error(err);
    }
  }

  // async registerUserProfile()

  // async registerNewProfile()

  // private _cleanRawProfileData(rawProfile: Profile): Profile {
  //   return {};
  // }

}
