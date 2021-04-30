"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumbers = exports.getRandomNames = exports.getRandomCompanies = void 0;
const axios_1 = __importDefault(require("axios"));
const getRandomCompanies = (amount = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchingPromises = [];
    do {
        fetchingPromises.push(axios_1.default
            .get(`https://random-data-api.com/api/company/random_company?size=${Math.min(amount, 100)}`)
            .then((resp) => resp.data));
        amount = Math.max(amount - 100, 0);
    } while (amount !== 0);
    return yield Promise.all(fetchingPromises).then((data) => data.flat());
});
exports.getRandomCompanies = getRandomCompanies;
const getRandomNames = (amount = 1) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchingPromises = [];
    do {
        fetchingPromises.push(axios_1.default
            .get(`https://random-data-api.com/api/name/random_name?size=${Math.min(amount, 100)}`)
            .then((resp) => resp.data));
        amount = Math.max(amount - 100, 0);
    } while (amount !== 0);
    return yield Promise.all(fetchingPromises).then((data) => data.flat());
});
exports.getRandomNames = getRandomNames;
const getRandomNumbers = (amount = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const fetchingPromises = [];
    do {
        fetchingPromises.push(axios_1.default
            .get(`https://random-data-api.com/api/number/random_number?size=${Math.min(amount, 100)}`)
            .then((resp) => resp.data));
        amount = Math.max(amount - 100, 0);
    } while (amount !== 0);
    return yield Promise.all(fetchingPromises).then((data) => data.flat());
});
exports.getRandomNumbers = getRandomNumbers;
