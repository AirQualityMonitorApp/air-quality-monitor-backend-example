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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const airQualityModel = require('../schema');
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userid;
    console.log("called");
    try {
        const doc = yield airQualityModel.findOne({ uid: userId });
        yield doc.delete();
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(error.status).json({ message: error });
    }
});
exports.deleteUser = deleteUser;
