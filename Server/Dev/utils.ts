import axios from "axios";

type randomCompany = {
  id: number;
  uid: string;
  business_name: string;
  suffix: string;
  industry: string;
  catch_phrase: string;
  buzzword: string;
  bs_company_statement: string;
  employee_identification_number: string;
  duns_number: string;
  logo: string;
  type: string;
  phone_number: string;
  full_address: string;
  latitude: number;
  longitude: number;
};

export const getRandomCompanies = async (amount = 1) => {
  const fetchingPromises = [];
  do {
    fetchingPromises.push(
      axios
        .get<randomCompany>(
          `https://random-data-api.com/api/company/random_company?size=${Math.min(
            amount,
            100
          )}`
        )
        .then((resp) => resp.data)
    );
    amount = Math.max(amount - 100, 0);
  } while (amount !== 0);
  return await Promise.all<randomCompany>(fetchingPromises).then((data) =>
    data.flat()
  );
};

type randomName = {
  id: number;
  uid: string;
  name: string;
  two_word_name: string;
  four_word_name: string;
  name_with_initials: string;
  name_with_middle: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  male_first_name: string;
  female_first_name: string;
  prefix: string;
  initials: string;
};

export const getRandomNames = async (amount = 1) => {
  const fetchingPromises = [];
  do {
    fetchingPromises.push(
      axios
        .get<randomName>(
          `https://random-data-api.com/api/name/random_name?size=${Math.min(
            amount,
            100
          )}`
        )
        .then((resp) => resp.data)
    );
    amount = Math.max(amount - 100, 0);
  } while (amount !== 0);
  return await Promise.all<randomName>(fetchingPromises).then((data) =>
    data.flat()
  );
};

type randomNumber = {
  id: number;
  uid: string;
  number: number;
  leading_zero_number: string;
  decimal: number;
  normal: number;
  hexadecimal: string;
  positive: number;
  negative: number;
  non_zero_number: number;
  digit: number;
};

export const getRandomNumbers = async (amount = 0) => {
  const fetchingPromises = [];
  do {
    fetchingPromises.push(
      axios
        .get<randomNumber>(
          `https://random-data-api.com/api/number/random_number?size=${Math.min(
            amount,
            100
          )}`
        )
        .then((resp) => resp.data)
    );
    amount = Math.max(amount - 100, 0);
  } while (amount !== 0);
  return await Promise.all<randomNumber>(fetchingPromises).then((data) =>
    data.flat()
  );
};
