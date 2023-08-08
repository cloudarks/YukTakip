import axios from 'axios';

const baseTokenUrl = 'https://lojistikb2cdev.b2clogin.com/lojistikb2cdev.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_signupsignin1';

const data = {
  grant_type: 'client_credentials',
  client_secret: "FCf8Q~2D5eHiRHekx2NXYvQobtgMJtExJaR1Cc3s",
  client_id: "b200d8b8-80da-49b3-9392-d56b4b25f2bb",
  response_type: "token",
  scope: "https://lojistikb2cdev.onmicrosoft.com/289c11c6-5471-4dc0-bf24-8dd7383f24e4/.default"
};
const headers = { 'content-type': 'application/x-www-form-urlencoded' };

const getAccesToken = async () => {

  try {
    var response = await axios.post(baseTokenUrl, data, { headers: headers });
    return response.data.access_token;

  } catch (error) {
    throw error;

  }

}

const ClientId=9116

const getKonsimentoData = async (KonsimentoNo, token) => {

  try {
    var response = await axios.get(`https://apigw.arkas.com/lojistikweb/takip/api/yuktakip/transporttracking?ContainerNo=&BillOfLadingNo=${KonsimentoNo}&ClientId=${ClientId}&TransportTypeId=0&TaxNumber=`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data

  } catch (error) {
    throw error;

  }

}

const getKonteynerData = async (KonteynerNumber, token) => {

  try {
    var response = await axios.get(`https://apigw.arkas.com/lojistikweb/takip/api/yuktakip/transporttracking?ContainerNo=${KonteynerNumber}&BillOfLadingNo=&ClientId=${ClientId}&TransportTypeId=0&TaxNumber=`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data

  } catch (error) {
    throw error;

  }

}






export { getAccesToken, getKonsimentoData, getKonteynerData };