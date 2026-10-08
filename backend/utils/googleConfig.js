import { GoogleApis } from "googleapis"

const Google_Client_Id = process.env.Google_Client_Id
const Google_Client_Secret=process.env.Google_Client_Secret

exports.oauth2client = new GoogleApis.auth.OAuth2(
  Google_Client_Id,
  Google_Client_Secret,
  "postmessage"
)