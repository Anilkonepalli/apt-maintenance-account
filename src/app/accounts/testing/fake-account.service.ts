// re-export for tester convenience
export { Account } from '../model';
export { AccountService }   from '../service';

import { Account }    from '../model';
import { AccountService } from '../service';

export var ACCOUNTS: Account[] = [
    {
        id: 1,
        item: '',
        flat_number: '',
        for_month: 0,
        for_year: 0,
        name: 'test1',
        crdr: '',
        amount: 0.0,
        balance: 0.0,
        category: '',
        recorded_at: '',
        remarks: '',
        owner_id: 0
    }
    //{ id: 2, name: 'test2' },
    //{ id: 3, name: 'test3' }
];
export class FakeAccountService implements AccountService {
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
        return this.lastPromise = Promise.resolve<Hero[]>(this.accounts);
    }

    update(account: Account): Promise<Hero> {
        return this.lastPromise = this.get(account.id).then(acct => {
            return acct ?
                Object.assign(acct, account) :
                Promise.reject(`Account ${account.id} not found`) as any as Promise<Account>;
        });
    }
}
