// re-export for tester convenience
export { Account } from '../model';
export { AccountService }   from '../service';

import { Account }    from '../model';
import { AccountService } from '../service';

export var ACCOUNTS: Account[] = [
    new Account(
        1,
        '',
        '',
        0,
        0,
        'test1',
        '',
        0.0,
        0.0,
        '',
        '',
        '',
        0
    )
    //{ id: 2, name: 'test2' },
    //{ id: 3, name: 'test3' }
];
export class FakeAccountService extends AccountService {
    accounts = ACCOUNTS.map(h => h.clone());
    lastPromise: Promise<any>; // remember so it can spy on promise calls

    get(id: number | string) {
        if (typeof id === 'string') {
            id = parseInt(id as string, 10);
        }
        let account = this.accounts.find(acct => acct.id === id);
        return this.lastPromise = Promise.resolve(account);
    }

    getList() {
        return this.lastPromise = Promise.resolve<Account[]>(this.accounts);
    }

    update(account: Account): Promise<Account> {
        return this.lastPromise = this.get(account.id).then(acct => {
            return acct ?
                Object.assign(acct, account) :
                Promise.reject(`Account ${account.id} not found`) as any as Promise<Account>;
        });
    }
}
