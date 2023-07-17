export enum PasswordErrors {
    SHORT = 'The password is to short!',
    NO_LOWERCASE = 'The password should have a lowercase',
    NO_UPPERCASE = 'The password should have a uppercase',
    NO_NUMBER = 'At least one number req',
}

export interface CheckPassword {
    valid: boolean;
    reasons: PasswordErrors[];
}

export class PasswordChecker {
    public checkPassword(password: string): CheckPassword {
        const reasons: PasswordErrors[] = [];

        this.checkForLength(password, reasons);
        this.checkForLowerCase(password, reasons);
        this.checkForUpperCase(password, reasons);
        return {
            valid: reasons.length > 0 ? false : true,
            reasons,
        };
    }

    public checkAdminPassword(password: string): CheckPassword {
        const basicCheck = this.checkPassword(password);
        this.checkForNumber(password, basicCheck.reasons);
        return {
            valid: basicCheck.reasons.length > 0 ? false : true,
            reasons: basicCheck.reasons,
        };
    }
    private checkForLength(password: string, reasons: PasswordErrors[]) {
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
    }
    private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
        if (password == password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPERCASE);
        }
    }
    private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
        if (password == password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWERCASE);
        }
    }
    private checkForNumber(password: string, reasons: PasswordErrors[]) {
        const hasNumber = /\d/;
        if (!hasNumber.test(password)) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }
    }
}
