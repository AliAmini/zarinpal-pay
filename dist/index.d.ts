interface CreateType {
    amount: number;
    callback_url: string;
    description?: string;
    mobile?: string;
    email?: string;
}
interface VerifyType {
    amount: number;
    authority: string;
}
declare class zarinpal_pay {
    private _merchant;
    private _isToman;
    private _isSandbox;
    private _requestLink;
    private _verifyLink;
    private _unVerifiedLink;
    private _gateway;
    private _currency;
    constructor(_merchant: string, _isToman?: boolean, _isSandbox?: boolean);
    create({ amount, description, callback_url, mobile, email, }: CreateType): Promise<{
        data: any;
        errors: any;
    }>;
    verify({ authority, amount }: VerifyType): Promise<any>;
    unverified(): Promise<any>;
}
export default zarinpal_pay;
