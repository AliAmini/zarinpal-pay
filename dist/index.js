"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class zarinpal_pay {
    constructor(_merchant, _isToman = false, _isSandbox = false) {
        this._merchant = _merchant;
        this._isToman = _isToman;
        this._isSandbox = _isSandbox;
        this._requestLink = "https://api.zarinpal.com/pg/v4/payment/request.json";
        this._verifyLink = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        this._unVerifiedLink = "https://api.zarinpal.com/pg/v4/payment/unVerified.json";
        this._gateway = "https://www.zarinpal.com/pg/StartPay";
        this._currency = "IRR";
        if (!_merchant || _merchant.length > 36 || _merchant.length < 36) {
            throw Error("Merchant ID is invalid!");
        }
        if (this._isSandbox) {
            this._requestLink =
                "https://sandbox.zarinpal.com/pg/v4/payment/request.json";
            this._verifyLink =
                "https://sandbox.zarinpal.com/pg/v4/payment/verify.json";
            this._gateway = "https://sandbox.zarinpal.com/pg/StartPay";
        }
        if (_isToman) {
            this._currency = "IRT";
        }
    }
    async create({ amount, description, callback_url, mobile, email, }) {
        if (!amount) {
            throw Error("The value *Amount* is invalid!");
        }
        if (!description) {
            throw Error("The value *Description* is invalid!");
        }
        if (!callback_url) {
            throw Error("The value *Callback URL* is invalid!");
        }
        try {
            const { data } = await axios_1.default.post(this._requestLink, {
                merchant_id: this._merchant,
                amount,
                currency: this._currency,
                description,
                callback_url,
                metadata: [mobile, email],
            });
            if (data.errors?.length) {
                throw new Error(`Payment error: ${JSON.stringify(data.errors)}`);
            }
            return {
                data: {
                    ...data.data,
                    link: `${this._gateway}/${data.data.authority}`,
                },
                errors: data.errors,
            };
        }
        catch (err) {
            console.log(err);
            console.log("============= Error =============");
            throw err;
        }
    }
    async verify({ authority, amount }) {
        if (!amount) {
            throw Error("The value *Amount* is invalid!");
        }
        if (!authority) {
            throw Error("The value *Authority* is invalid!");
        }
        try {
            const { data } = await axios_1.default.post(this._verifyLink, {
                merchant_id: this._merchant,
                amount,
                authority,
            });
            if (data.errors?.length) {
                throw new Error(`Payment error: ${JSON.stringify(data.errors)}`);
            }
            return data;
        }
        catch (err) {
            console.log(err);
            console.log("============= Error =============");
            throw err;
        }
    }
    async unverified() {
        try {
            const { data } = await axios_1.default.post(this._unVerifiedLink, {
                merchant_id: this._merchant,
            });
            if (data.errors?.length) {
                throw new Error(`Payment error: ${JSON.stringify(data.errors)}`);
            }
            return data;
        }
        catch (err) {
            console.log(err);
            console.log("============= Error =============");
            throw err;
        }
    }
}
exports.default = zarinpal_pay;
